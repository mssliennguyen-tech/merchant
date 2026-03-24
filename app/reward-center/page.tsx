'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Upload } from 'lucide-react';
import { toast } from 'sonner';

// Fixed SMS message template for all reward distribution methods
const SMS_MESSAGE_TEMPLATE = (points: string = '___') => {
  return `Bạn đã nhận được ${points} Points từ Highland coffee. Hãy truy cập trang web https://example.com để nhận điểm.`;
};

const rewardHistory = [
  {
    id: 'RWD001',
    date: '2024-03-08',
    user: 'Nguyễn Văn A',
    rewardType: 'Chiến dịch',
    points: 50000,
    campaign: 'Summer Sale',
    status: 'Đã gửi',
  },
  {
    id: 'RWD002',
    date: '2024-03-07',
    user: 'Trần Thị B',
    rewardType: 'Phần thưởng theo lô',
    points: 100000,
    campaign: 'Batch Upload',
    status: 'Đã gửi',
  },
  {
    id: 'RWD003',
    date: '2024-03-06',
    user: 'Lê Văn C',
    rewardType: 'Tay',
    points: 25000,
    campaign: '-',
    status: 'Đã gửi',
  },
  {
    id: 'RWD004',
    date: '2024-03-05',
    user: 'Phạm Văn D',
    rewardType: 'Phòng ban',
    points: 200000,
    campaign: 'HR Recognition',
    status: 'Đang chờ',
  },
  {
    id: 'RWD005',
    date: '2024-03-04',
    user: 'Hoàng Thị E',
    rewardType: 'Chiến dịch',
    points: 75000,
    campaign: 'Birthday Month',
    status: 'Đã gửi',
  },
];

export default function RewardCenterPage() {
  const [activeTab, setActiveTab] = useState<'user' | 'batch' | 'campaign' | 'department'>('user');
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [rewardType, setRewardType] = useState('user');
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    userName: '',
    points: '',
    reason: '',
  });
  const [messageMethod, setMessageMethod] = useState<'zalo' | 'sms'>('sms');
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'bank'>('qr');
  const [recipients, setRecipients] = useState<Array<{ phoneNumber: string; userName: string }>>([]);
  const [batchRecipientCount, setBatchRecipientCount] = useState(0);

  // SMS/Zalo messaging costs
  const messagingCosts = {
    sms: 500, // VND per message
    zalo: 300, // VND per message
  };

  const campaigns = [
    { id: 'summer', name: 'Khuyến mãi hè' },
    { id: 'birthday', name: 'Thưởng sinh nhật' },
    { id: 'referral', name: 'Chương trình giới thiệu' },
    { id: 'vip', name: 'VIP Độc quyền' },
  ];

  const departments = [
    { id: 'sales', name: 'Phòng Bán hàng' },
    { id: 'marketing', name: 'Phòng Marketing' },
    { id: 'customer', name: 'Phòng Chăm sóc khách hàng' },
    { id: 'it', name: 'Phòng IT' },
  ];

  const addRecipient = () => {
    if (!formData.phoneNumber) {
      toast.error('Vui lòng nhập số điện thoại');
      return;
    }
    if (!formData.userName) {
      toast.error('Vui lòng nhập tên người dùng');
      return;
    }
    if (!formData.points) {
      toast.error('Vui lòng nhập số điểm');
      return;
    }
    
    setRecipients([
      ...recipients,
      {
        phoneNumber: formData.phoneNumber,
        userName: formData.userName,
      },
    ]);
    
    setFormData({
      phoneNumber: '',
      userName: '',
      points: '',
      reason: '',
    });
    
    toast.success('Người nhận đã được thêm');
  };

  const removeRecipient = (index: number) => {
    setRecipients(recipients.filter((_, i) => i !== index));
  };

  const calculateTotalCost = () => {
    const cost = messageMethod === 'sms' ? messagingCosts.sms : messagingCosts.zalo;
    return recipients.length * cost;
  };

  const handleRewardUser = () => {
    if (recipients.length === 0) {
      toast.error('Vui lòng thêm ít nhất một người nhận');
      return;
    }
    
    const totalCost = calculateTotalCost();
    toast.success(`Phần thưởng đã được gửi cho ${recipients.length} người dùng! Tổng chi phí: ${totalCost.toLocaleString('vi-VN')} VND`);
    setRecipients([]);
    setFormData({
      phoneNumber: '',
      userName: '',
      points: '',
      reason: '',
    });
  };

  const handleToggleCampaign = (campaignId: string) => {
    setSelectedCampaigns(prev => 
      prev.includes(campaignId) 
        ? prev.filter(id => id !== campaignId)
        : [...prev, campaignId]
    );
  };

  const handleToggleDepartment = (departmentId: string) => {
    setSelectedDepartments(prev => 
      prev.includes(departmentId) 
        ? prev.filter(id => id !== departmentId)
        : [...prev, departmentId]
    );
  };

  const handleRewardByCampaign = () => {
    if (selectedCampaigns.length === 0) {
      toast.error('Vui lòng chọn ít nhất 1 chiến dịch');
      return;
    }
    if (!formData.points) {
      toast.error('Vui lòng nhập số điểm');
      return;
    }
    toast.success(`Phần thưởng đã được gửi cho ${selectedCampaigns.length} chiến dịch!`);
    setSelectedCampaigns([]);
    setFormData({ phoneNumber: '', points: '', reason: '' });
  };

  const handleRewardByDepartment = () => {
    if (selectedDepartments.length === 0) {
      toast.error('Vui lòng chọn ít nhất 1 phòng ban');
      return;
    }
    if (!formData.points) {
      toast.error('Vui lòng nhập số điểm');
      return;
    }
    toast.success(`Phần thưởng đã được gửi cho ${selectedDepartments.length} phòng ban!`);
    setSelectedDepartments([]);
    setFormData({ phoneNumber: '', points: '', reason: '' });
  };

  const handleBatchUpload = () => {
    toast.success('Đang xử lý tệp tải lên...');
  };

  const calculateBatchCost = (selectedCount: number) => {
    const cost = messageMethod === 'sms' ? messagingCosts.sms : messagingCosts.zalo;
    return selectedCount * cost;
  };

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Quản lý điểm thưởng</h1>
        <p className="text-muted-foreground mt-1">
          Quản lý và phân phối phần thưởng cho khách hàng
        </p>
      </div>

      {/* Reward Tabs */}
      <div className="mb-8 flex gap-2 border-b border-border">
        {[
          { id: 'user', label: 'Tặng người dùng', icon: '👤' },
          { id: 'batch', label: 'Tặng theo lô', icon: '📦' },
          { id: 'campaign', label: 'Tặng theo chiến dịch', icon: '🎯' },
          { id: 'department', label: 'Tặng theo phòng ban', icon: '🏢' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 px-4 border-b-2 font-medium transition-colors text-sm ${
              activeTab === tab.id
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'user' && (
        <div className="space-y-6">
          {/* Block 1: User Selection */}
          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle>Tặng phần thưởng cho người dùng</CardTitle>
              <CardDescription>Tìm kiếm người dùng theo số điện thoại và tặng điểm cho họ</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-foreground">Tên người dùng *</Label>
                    <Input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      value={formData.userName}
                      onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                      className="mt-1.5 border-border bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <Label className="text-foreground">Số điện thoại *</Label>
                    <Input
                      type="tel"
                      placeholder="0901234567"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="mt-1.5 border-border bg-background text-foreground"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-foreground">Số điểm *</Label>
                  <Input
                    type="number"
                    placeholder="10000"
                    value={formData.points}
                    onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                    className="mt-1.5 border-border bg-background text-foreground"
                  />
                </div>
                <div>
                  <Label className="text-foreground">Lý do tặng</Label>
                  <Textarea
                    placeholder="Nhập lý do tặng phần thưởng"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="mt-1.5 border-border bg-background text-foreground resize-none"
                    rows={3}
                  />
                </div>
                <Button onClick={addRecipient} className="w-full bg-accent hover:bg-accent/90">
                  Thêm người nhận
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Display Recipients List */}
          {recipients.length > 0 && (
            <Card className="border border-border bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg">Danh sách người nhận ({recipients.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {recipients.map((recipient, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{recipient.userName}</p>
                        <p className="text-sm text-muted-foreground">{recipient.phoneNumber}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRecipient(index)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        Xóa
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Block 2: Message Method */}
          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle>Phương thức gửi tin nhắn</CardTitle>
              <CardDescription>Chọn cách gửi thông báo tới người nhận</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" style={{ borderColor: messageMethod === 'zalo' ? 'var(--color-primary)' : undefined }}>
                    <input
                      type="radio"
                      name="messageMethod"
                      value="zalo"
                      checked={messageMethod === 'zalo'}
                      onChange={() => setMessageMethod('zalo')}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">Gửi qua Zalo</p>
                      <p className="text-sm text-muted-foreground">Chi phí: {messagingCosts.zalo.toLocaleString('vi-VN')} VND/tin nhắn</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" style={{ borderColor: messageMethod === 'sms' ? 'var(--color-primary)' : undefined }}>
                    <input
                      type="radio"
                      name="messageMethod"
                      value="sms"
                      checked={messageMethod === 'sms'}
                      onChange={() => setMessageMethod('sms')}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">Gửi qua SMS</p>
                      <p className="text-sm text-muted-foreground">Chi phí: {messagingCosts.sms.toLocaleString('vi-VN')} VND/tin nhắn</p>
                    </div>
                  </label>
                </div>

                    {/* SMS Message Preview */}
                    <div className="bg-muted/50 p-4 rounded-lg border border-border">
                      <p className="text-sm font-medium text-foreground mb-3">Nội dung tin nhắn {messageMethod === 'sms' ? 'SMS' : 'Zalo'}:</p>
                      <div className="bg-background p-4 rounded border border-border text-sm text-foreground leading-relaxed">
                        {SMS_MESSAGE_TEMPLATE(formData.points || '___')}
                      </div>
                    </div>
              </div>
            </CardContent>
          </Card>

          {/* Block 3: Cost Summary */}
          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle>Chi phí dự kiến</CardTitle>
              <CardDescription>Tổng chi phí theo phương thức gửi tin nhắn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted/50 p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Chi phí mỗi tin</p>
                  <p className="text-2xl font-bold text-foreground">
                    {(messageMethod === 'sms' ? messagingCosts.sms : messagingCosts.zalo).toLocaleString('vi-VN')} VND
                  </p>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg border border-border">
                  <p className="text-sm text-muted-foreground mb-1">Số lượng người nhận</p>
                  <p className="text-2xl font-bold text-foreground">
                    {recipients.length}
                  </p>
                </div>

                <div className="bg-accent/10 p-4 rounded-lg border border-accent/30">
                  <p className="text-sm text-muted-foreground mb-1">Tổng chi phí</p>
                  <p className="text-2xl font-bold text-accent">
                    {calculateTotalCost().toLocaleString('vi-VN')} VND
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Block 4: Payment Method */}
          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle>Phương thức thanh toán</CardTitle>
              <CardDescription>Chọn cách thanh toán cho chi phí gửi tin nhắn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" style={{ borderColor: paymentMethod === 'qr' ? 'var(--color-primary)' : undefined }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="qr"
                    checked={paymentMethod === 'qr'}
                    onChange={() => setPaymentMethod('qr')}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Thanh toán qua QR Code</p>
                    <p className="text-sm text-muted-foreground">Quét mã QR để thanh toán ngay</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" style={{ borderColor: paymentMethod === 'bank' ? 'var(--color-primary)' : undefined }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={() => setPaymentMethod('bank')}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Chuyển khoản ngân hàng</p>
                    <p className="text-sm text-muted-foreground">Chuyển khoản trực tiếp vào tài khoản ngân hàng</p>
                  </div>
                </label>

                {paymentMethod === 'qr' && (
                  <div className="bg-muted/50 p-6 rounded-lg border border-border flex flex-col items-center">
                    <div className="w-40 h-40 bg-background rounded border-2 border-border flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">QR Code</p>
                        <p className="text-2xl font-bold text-muted-foreground mt-2">⬜</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4 text-center">Quét mã QR phía trên để thanh toán</p>
                  </div>
                )}

                {paymentMethod === 'bank' && (
                  <div className="bg-muted/50 p-4 rounded-lg border border-border">
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Số tài khoản</p>
                        <p className="font-medium text-foreground">1234567890</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Chủ tài khoản</p>
                        <p className="font-medium text-foreground">Highland Coffee Inc.</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Ngân hàng</p>
                        <p className="font-medium text-foreground">Vietcombank</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Nội dung chuyển</p>
                        <p className="font-medium text-foreground text-sm">Thanh toán chi phí tin nhắn phần thưởng</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Send Action */}
          <Button 
            onClick={handleRewardUser} 
            disabled={recipients.length === 0}
            className="w-full bg-primary hover:bg-primary/90 h-12 text-base font-medium"
          >
            Gửi phần thưởng
          </Button>
        </div>
      )}

      {activeTab === 'batch' && (
        <div className="space-y-6">
          {/* Block 1: Batch Upload */}
          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle>Tặng phần thưởng theo lô</CardTitle>
              <CardDescription>Tải lên tệp CSV để tặng phần thưởng cho nhiều người dùng cùng lúc</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".csv,.xlsx"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setBatchRecipientCount(Math.floor(Math.random() * 50) + 10);
                        toast.success('Tệp đã được tải lên thành công');
                      }
                    }}
                  />
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium">Nhấp để tải lên hoặc kéo thả</p>
                    <p className="text-xs mt-1">Hỗ trợ CSV, XLSX</p>
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-foreground mb-2">Định dạng tệp:</p>
                  <pre className="text-xs text-muted-foreground overflow-x-auto">
{`user_id,points,reason
USR001,10000,Birthday bonus
USR002,50000,Loyalty reward
USR003,25000,Referral bonus`}
                  </pre>
                </div>
                {batchRecipientCount > 0 && (
                  <div className="bg-accent/10 p-4 rounded-lg border border-accent/30">
                    <p className="text-sm text-foreground font-medium">Số lượng người nhận: <span className="text-accent">{batchRecipientCount}</span></p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {batchRecipientCount > 0 && (
            <>
              {/* Block 2: Message Method */}
              <Card className="border border-border bg-card">
                <CardHeader>
                  <CardTitle>Phương thức gửi tin nhắn</CardTitle>
                  <CardDescription>Chọn cách gửi thông báo tới người nhận</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" style={{ borderColor: messageMethod === 'zalo' ? 'var(--color-primary)' : undefined }}>
                        <input
                          type="radio"
                          name="batchMessageMethod"
                          value="zalo"
                          checked={messageMethod === 'zalo'}
                          onChange={() => setMessageMethod('zalo')}
                          className="w-4 h-4"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">Gửi qua Zalo</p>
                          <p className="text-sm text-muted-foreground">Chi phí: {messagingCosts.zalo.toLocaleString('vi-VN')} VND/tin nhắn</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" style={{ borderColor: messageMethod === 'sms' ? 'var(--color-primary)' : undefined }}>
                        <input
                          type="radio"
                          name="batchMessageMethod"
                          value="sms"
                          checked={messageMethod === 'sms'}
                          onChange={() => setMessageMethod('sms')}
                          className="w-4 h-4"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">Gửi qua SMS</p>
                          <p className="text-sm text-muted-foreground">Chi phí: {messagingCosts.sms.toLocaleString('vi-VN')} VND/tin nhắn</p>
                        </div>
                      </label>
                    </div>

                    {/* SMS Message Preview */}
                    <div className="bg-muted/50 p-4 rounded-lg border border-border">
                      <p className="text-sm font-medium text-foreground mb-3">Nội dung tin nhắn {messageMethod === 'sms' ? 'SMS' : 'Zalo'}:</p>
                      <div className="bg-background p-4 rounded border border-border text-sm text-foreground leading-relaxed">
                        {SMS_MESSAGE_TEMPLATE('___')}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Block 3: Cost Summary */}
              <Card className="border border-border bg-card">
                <CardHeader>
                  <CardTitle>Chi phí dự kiến</CardTitle>
                  <CardDescription>Tổng chi phí theo phương thức gửi tin nhắn</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground mb-1">Chi phí mỗi tin</p>
                      <p className="text-2xl font-bold text-foreground">
                        {(messageMethod === 'sms' ? messagingCosts.sms : messagingCosts.zalo).toLocaleString('vi-VN')} VND
                      </p>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground mb-1">Số lượng người nhận</p>
                      <p className="text-2xl font-bold text-foreground">
                        {batchRecipientCount}
                      </p>
                    </div>

                    <div className="bg-accent/10 p-4 rounded-lg border border-accent/30">
                      <p className="text-sm text-muted-foreground mb-1">Tổng chi phí</p>
                      <p className="text-2xl font-bold text-accent">
                        {calculateBatchCost(batchRecipientCount).toLocaleString('vi-VN')} VND
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Block 4: Payment Method */}
              <Card className="border border-border bg-card">
                <CardHeader>
                  <CardTitle>Phương thức thanh toán</CardTitle>
                  <CardDescription>Chọn cách thanh toán cho chi phí gửi tin nhắn</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" style={{ borderColor: paymentMethod === 'qr' ? 'var(--color-primary)' : undefined }}>
                      <input
                        type="radio"
                        name="batchPaymentMethod"
                        value="qr"
                        checked={paymentMethod === 'qr'}
                        onChange={() => setPaymentMethod('qr')}
                        className="w-4 h-4"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">Thanh toán qua QR Code</p>
                        <p className="text-sm text-muted-foreground">Quét mã QR để thanh toán ngay</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" style={{ borderColor: paymentMethod === 'bank' ? 'var(--color-primary)' : undefined }}>
                      <input
                        type="radio"
                        name="batchPaymentMethod"
                        value="bank"
                        checked={paymentMethod === 'bank'}
                        onChange={() => setPaymentMethod('bank')}
                        className="w-4 h-4"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">Chuyển khoản ngân hàng</p>
                        <p className="text-sm text-muted-foreground">Chuyển khoản trực tiếp vào tài khoản ngân hàng</p>
                      </div>
                    </label>

                    {paymentMethod === 'qr' && (
                      <div className="bg-muted/50 p-6 rounded-lg border border-border flex flex-col items-center">
                        <div className="w-40 h-40 bg-background rounded border-2 border-border flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">QR Code</p>
                            <p className="text-2xl font-bold text-muted-foreground mt-2">⬜</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-4 text-center">Quét mã QR phía trên để thanh toán</p>
                      </div>
                    )}

                    {paymentMethod === 'bank' && (
                      <div className="bg-muted/50 p-4 rounded-lg border border-border">
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Số tài khoản</p>
                            <p className="font-medium text-foreground">1234567890</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Chủ tài khoản</p>
                            <p className="font-medium text-foreground">Highland Coffee Inc.</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Ngân hàng</p>
                            <p className="font-medium text-foreground">Vietcombank</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Nội dung chuyển</p>
                            <p className="font-medium text-foreground text-sm">Thanh toán chi phí tin nhắn phần thưởng theo lô</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Send Action */}
              <Button 
                onClick={handleBatchUpload}
                className="w-full bg-primary hover:bg-primary/90 h-12 text-base font-medium"
              >
                Tải lên và xử lý
              </Button>
            </>
          )}
        </div>
      )}

      {activeTab === 'campaign' && (
        <div className="space-y-6">
          {/* Block 1: Campaign Selection */}
          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle>Tặng phần thưởng theo chiến dịch</CardTitle>
              <CardDescription>Chọn 1 hoặc nhiều chiến dịch để gửi phần thưởng tự động cho người dùng tham gia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-foreground mb-3 block">Chọn chiến dịch *</Label>
                  <div className="space-y-2 p-4 border border-border rounded-lg">
                    {campaigns.map(campaign => (
                      <label key={campaign.id} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCampaigns.includes(campaign.id)}
                          onChange={() => handleToggleCampaign(campaign.id)}
                          className="w-4 h-4 rounded border-border"
                        />
                        <span className="text-sm text-foreground">{campaign.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-foreground">Số điểm cho mỗi người tham gia *</Label>
                  <Input
                    type="number"
                    placeholder="50000"
                    value={formData.points}
                    onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                    className="mt-1.5 border-border bg-background text-foreground"
                  />
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Sẽ tặng phần thưởng cho người dùng từ {selectedCampaigns.length > 0 ? selectedCampaigns.length : 'các'} chiến dịch được chọn
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {selectedCampaigns.length > 0 && (
            <>
              {/* Block 2: Message Method */}
              <Card className="border border-border bg-card">
                <CardHeader>
                  <CardTitle>Phương thức gửi tin nhắn</CardTitle>
                  <CardDescription>Chọn cách gửi thông báo tới người nhận</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" style={{ borderColor: messageMethod === 'zalo' ? 'var(--color-primary)' : undefined }}>
                        <input
                          type="radio"
                          name="campaignMessageMethod"
                          value="zalo"
                          checked={messageMethod === 'zalo'}
                          onChange={() => setMessageMethod('zalo')}
                          className="w-4 h-4"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">Gửi qua Zalo</p>
                          <p className="text-sm text-muted-foreground">Chi phí: {messagingCosts.zalo.toLocaleString('vi-VN')} VND/tin nhắn</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" style={{ borderColor: messageMethod === 'sms' ? 'var(--color-primary)' : undefined }}>
                        <input
                          type="radio"
                          name="campaignMessageMethod"
                          value="sms"
                          checked={messageMethod === 'sms'}
                          onChange={() => setMessageMethod('sms')}
                          className="w-4 h-4"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">Gửi qua SMS</p>
                          <p className="text-sm text-muted-foreground">Chi phí: {messagingCosts.sms.toLocaleString('vi-VN')} VND/tin nhắn</p>
                        </div>
                      </label>
                    </div>

                    {/* SMS Message Preview */}
                    <div className="bg-muted/50 p-4 rounded-lg border border-border">
                      <p className="text-sm font-medium text-foreground mb-3">Nội dung tin nhắn {messageMethod === 'sms' ? 'SMS' : 'Zalo'}:</p>
                      <div className="bg-background p-4 rounded border border-border text-sm text-foreground leading-relaxed">
                        {SMS_MESSAGE_TEMPLATE(formData.points || '___')}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Block 3: Cost Summary */}
              <Card className="border border-border bg-card">
                <CardHeader>
                  <CardTitle>Chi phí dự kiến</CardTitle>
                  <CardDescription>Tổng chi phí theo phương thức gửi tin nhắn</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground mb-1">Chi phí mỗi tin</p>
                      <p className="text-2xl font-bold text-foreground">
                        {(messageMethod === 'sms' ? messagingCosts.sms : messagingCosts.zalo).toLocaleString('vi-VN')} VND
                      </p>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground mb-1">Chiến dịch được chọn</p>
                      <p className="text-2xl font-bold text-foreground">
                        {selectedCampaigns.length}
                      </p>
                    </div>

                    <div className="bg-accent/10 p-4 rounded-lg border border-accent/30">
                      <p className="text-sm text-muted-foreground mb-1">Tổng chi phí dự kiến</p>
                      <p className="text-2xl font-bold text-accent">
                        {calculateBatchCost(selectedCampaigns.length).toLocaleString('vi-VN')} VND
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Block 4: Payment Method */}
              <Card className="border border-border bg-card">
                <CardHeader>
                  <CardTitle>Phương thức thanh toán</CardTitle>
                  <CardDescription>Chọn cách thanh toán cho chi phí gửi tin nhắn</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" style={{ borderColor: paymentMethod === 'qr' ? 'var(--color-primary)' : undefined }}>
                      <input
                        type="radio"
                        name="campaignPaymentMethod"
                        value="qr"
                        checked={paymentMethod === 'qr'}
                        onChange={() => setPaymentMethod('qr')}
                        className="w-4 h-4"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">Thanh toán qua QR Code</p>
                        <p className="text-sm text-muted-foreground">Quét mã QR để thanh toán ngay</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" style={{ borderColor: paymentMethod === 'bank' ? 'var(--color-primary)' : undefined }}>
                      <input
                        type="radio"
                        name="campaignPaymentMethod"
                        value="bank"
                        checked={paymentMethod === 'bank'}
                        onChange={() => setPaymentMethod('bank')}
                        className="w-4 h-4"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">Chuyển khoản ngân hàng</p>
                        <p className="text-sm text-muted-foreground">Chuyển khoản trực tiếp vào tài khoản ngân hàng</p>
                      </div>
                    </label>

                    {paymentMethod === 'qr' && (
                      <div className="bg-muted/50 p-6 rounded-lg border border-border flex flex-col items-center">
                        <div className="w-40 h-40 bg-background rounded border-2 border-border flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">QR Code</p>
                            <p className="text-2xl font-bold text-muted-foreground mt-2">⬜</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-4 text-center">Quét mã QR phía trên để thanh toán</p>
                      </div>
                    )}

                    {paymentMethod === 'bank' && (
                      <div className="bg-muted/50 p-4 rounded-lg border border-border">
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Số tài khoản</p>
                            <p className="font-medium text-foreground">1234567890</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Chủ tài khoản</p>
                            <p className="font-medium text-foreground">Highland Coffee Inc.</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Ngân hàng</p>
                            <p className="font-medium text-foreground">Vietcombank</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Nội dung chuyển</p>
                            <p className="font-medium text-foreground text-sm">Thanh toán chi phí tin nhắn phần thưởng chiến dịch</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Send Action */}
              <Button 
                onClick={handleRewardByCampaign}
                className="w-full bg-primary hover:bg-primary/90 h-12 text-base font-medium"
              >
                Gửi phần thưởng
              </Button>
            </>
          )}
        </div>
      )}

      {activeTab === 'department' && (
        <div className="space-y-6">
          {/* Block 1: Department Selection */}
          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle>Tặng phần thưởng theo phòng ban</CardTitle>
              <CardDescription>Chọn 1 hoặc nhiều phòng ban để gửi phần thưởng cho nhân viên</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label className="text-foreground mb-3 block">Chọn phòng ban *</Label>
                  <div className="space-y-2 p-4 border border-border rounded-lg">
                    {departments.map(department => (
                      <label key={department.id} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedDepartments.includes(department.id)}
                          onChange={() => handleToggleDepartment(department.id)}
                          className="w-4 h-4 rounded border-border"
                        />
                        <span className="text-sm text-foreground">{department.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-foreground">Số điểm cho mỗi nhân viên *</Label>
                  <Input
                    type="number"
                    placeholder="100000"
                    value={formData.points}
                    onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                    className="mt-1.5 border-border bg-background text-foreground"
                  />
                </div>
                <div>
                  <Label className="text-foreground">Lý do tặng (cùng cho tất cả)</Label>
                  <Textarea
                    placeholder="e.g. Thưởng hiệu suất quý 1"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="mt-1.5 border-border bg-background text-foreground resize-none"
                    rows={3}
                  />
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Sẽ tặng phần thưởng cho nhân viên từ {selectedDepartments.length > 0 ? selectedDepartments.length : 'các'} phòng ban được chọn
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {selectedDepartments.length > 0 && (
            <>
              {/* Block 2: Message Method */}
              <Card className="border border-border bg-card">
                <CardHeader>
                  <CardTitle>Phương thức gửi tin nhắn</CardTitle>
                  <CardDescription>Chọn cách gửi thông báo tới người nhận</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" style={{ borderColor: messageMethod === 'zalo' ? 'var(--color-primary)' : undefined }}>
                        <input
                          type="radio"
                          name="departmentMessageMethod"
                          value="zalo"
                          checked={messageMethod === 'zalo'}
                          onChange={() => setMessageMethod('zalo')}
                          className="w-4 h-4"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">Gửi qua Zalo</p>
                          <p className="text-sm text-muted-foreground">Chi phí: {messagingCosts.zalo.toLocaleString('vi-VN')} VND/tin nhắn</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" style={{ borderColor: messageMethod === 'sms' ? 'var(--color-primary)' : undefined }}>
                        <input
                          type="radio"
                          name="departmentMessageMethod"
                          value="sms"
                          checked={messageMethod === 'sms'}
                          onChange={() => setMessageMethod('sms')}
                          className="w-4 h-4"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">Gửi qua SMS</p>
                          <p className="text-sm text-muted-foreground">Chi phí: {messagingCosts.sms.toLocaleString('vi-VN')} VND/tin nhắn</p>
                        </div>
                      </label>
                    </div>

                    {/* SMS Message Preview */}
                    <div className="bg-muted/50 p-4 rounded-lg border border-border">
                      <p className="text-sm font-medium text-foreground mb-3">Nội dung tin nhắn {messageMethod === 'sms' ? 'SMS' : 'Zalo'}:</p>
                      <div className="bg-background p-4 rounded border border-border text-sm text-foreground leading-relaxed">
                        {SMS_MESSAGE_TEMPLATE(formData.points || '___')}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Block 3: Cost Summary */}
              <Card className="border border-border bg-card">
                <CardHeader>
                  <CardTitle>Chi phí dự kiến</CardTitle>
                  <CardDescription>Tổng chi phí theo phương thức gửi tin nhắn</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground mb-1">Chi phí mỗi tin</p>
                      <p className="text-2xl font-bold text-foreground">
                        {(messageMethod === 'sms' ? messagingCosts.sms : messagingCosts.zalo).toLocaleString('vi-VN')} VND
                      </p>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground mb-1">Phòng ban được chọn</p>
                      <p className="text-2xl font-bold text-foreground">
                        {selectedDepartments.length}
                      </p>
                    </div>

                    <div className="bg-accent/10 p-4 rounded-lg border border-accent/30">
                      <p className="text-sm text-muted-foreground mb-1">Tổng chi phí dự kiến</p>
                      <p className="text-2xl font-bold text-accent">
                        {calculateBatchCost(selectedDepartments.length).toLocaleString('vi-VN')} VND
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Block 4: Payment Method */}
              <Card className="border border-border bg-card">
                <CardHeader>
                  <CardTitle>Phương thức thanh toán</CardTitle>
                  <CardDescription>Chọn cách thanh toán cho chi phí gửi tin nhắn</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" style={{ borderColor: paymentMethod === 'qr' ? 'var(--color-primary)' : undefined }}>
                      <input
                        type="radio"
                        name="departmentPaymentMethod"
                        value="qr"
                        checked={paymentMethod === 'qr'}
                        onChange={() => setPaymentMethod('qr')}
                        className="w-4 h-4"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">Thanh toán qua QR Code</p>
                        <p className="text-sm text-muted-foreground">Quét mã QR để thanh toán ngay</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors" style={{ borderColor: paymentMethod === 'bank' ? 'var(--color-primary)' : undefined }}>
                      <input
                        type="radio"
                        name="departmentPaymentMethod"
                        value="bank"
                        checked={paymentMethod === 'bank'}
                        onChange={() => setPaymentMethod('bank')}
                        className="w-4 h-4"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">Chuyển khoản ngân hàng</p>
                        <p className="text-sm text-muted-foreground">Chuyển khoản trực tiếp vào tài khoản ngân hàng</p>
                      </div>
                    </label>

                    {paymentMethod === 'qr' && (
                      <div className="bg-muted/50 p-6 rounded-lg border border-border flex flex-col items-center">
                        <div className="w-40 h-40 bg-background rounded border-2 border-border flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">QR Code</p>
                            <p className="text-2xl font-bold text-muted-foreground mt-2">⬜</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-4 text-center">Quét mã QR phía trên để thanh toán</p>
                      </div>
                    )}

                    {paymentMethod === 'bank' && (
                      <div className="bg-muted/50 p-4 rounded-lg border border-border">
                        <div className="space-y-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Số tài khoản</p>
                            <p className="font-medium text-foreground">1234567890</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Chủ tài khoản</p>
                            <p className="font-medium text-foreground">Highland Coffee Inc.</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Ngân hàng</p>
                            <p className="font-medium text-foreground">Vietcombank</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Nội dung chuyển</p>
                            <p className="font-medium text-foreground text-sm">Thanh toán chi phí tin nhắn phần thưởng phòng ban</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Send Action */}
              <Button 
                onClick={handleRewardByDepartment}
                className="w-full bg-primary hover:bg-primary/90 h-12 text-base font-medium"
              >
                Gửi phần thưởng
              </Button>
            </>
          )}
        </div>
      )}

      {/* Reward History Table */}
      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle>Lịch sử tặng phần thưởng</CardTitle>
          <CardDescription>Tất cả các phần thưởng đã gửi</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border">
                  <TableHead className="text-foreground">Ngày</TableHead>
                  <TableHead className="text-foreground">Người dùng</TableHead>
                  <TableHead className="text-foreground">Loại phần thưởng</TableHead>
                  <TableHead className="text-right text-foreground">Điểm</TableHead>
                  <TableHead className="text-foreground">Chiến dịch / Tài liệu</TableHead>
                  <TableHead className="text-foreground">Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rewardHistory.map((reward) => (
                  <TableRow key={reward.id} className="border-b border-border hover:bg-muted/30">
                    <TableCell className="text-foreground text-sm">{reward.date}</TableCell>
                    <TableCell className="text-foreground font-medium">{reward.user}</TableCell>
                    <TableCell className="text-foreground text-sm">{reward.rewardType}</TableCell>
                    <TableCell className="text-right font-bold text-accent">
                      +{reward.points.toLocaleString('vi-VN')}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{reward.campaign}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={reward.status === 'Đã gửi'
                          ? 'bg-accent/10 text-accent border-accent/30'
                          : 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                        }
                      >
                        {reward.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Reward Modal */}
      <Dialog open={showRewardModal} onOpenChange={setShowRewardModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tặng phần thưởng</DialogTitle>
            <DialogDescription>
              Chọn phương pháp tặng phần thưởng
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {[
              { id: 'user', label: 'Tặng người dùng', icon: '👤' },
              { id: 'batch', label: 'Tặng theo lô', icon: '📦' },
              { id: 'campaign', label: 'Tặng theo chiến dịch', icon: '🎯' },
              { id: 'department', label: 'Tặng theo phòng ban', icon: '🏢' },
            ].map((option) => (
              <Card
                key={option.id}
                onClick={() => {
                  setRewardType(option.id);
                  setActiveTab(option.id as any);
                  setShowRewardModal(false);
                }}
                className="border border-border bg-background cursor-pointer hover:border-primary hover:shadow-md transition-all"
              >
                <CardContent className="pt-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.icon}</span>
                    <div>
                      <p className="font-medium text-foreground">{option.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
