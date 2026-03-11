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
  const [formData, setFormData] = useState({
    userId: '',
    userName: '',
    points: '',
    reason: '',
    campaign: '',
    department: '',
  });

  const handleRewardUser = () => {
    if (!formData.userId && !formData.userName) {
      toast.error('Vui lòng chọn hoặc nhập ID/tên người dùng');
      return;
    }
    if (!formData.points) {
      toast.error('Vui lòng nhập số điểm');
      return;
    }
    toast.success('Phần thưởng đã được gửi thành công!');
    setShowRewardModal(false);
    setFormData({
      userId: '',
      userName: '',
      points: '',
      reason: '',
      campaign: '',
      department: '',
    });
  };

  const handleBatchUpload = () => {
    toast.success('Đang xử lý tệp tải lên...');
  };

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý điểm thưởng</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý và phân phối phần thưởng cho khách hàng
          </p>
        </div>
        <Button
          onClick={() => setShowRewardModal(true)}
          className="mt-4 md:mt-0 flex items-center gap-2 bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Tặng phần thưởng
        </Button>
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
        <Card className="mb-8 border border-border bg-card">
          <CardHeader>
            <CardTitle>Tặng phần thưởng cho người dùng</CardTitle>
            <CardDescription>Tìm kiếm người dùng và tặng điểm cho họ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-foreground">ID Người dùng</Label>
                  <Input
                    placeholder="e.g. USR12345"
                    className="mt-1.5 border-border bg-background text-foreground"
                  />
                </div>
                <div>
                  <Label className="text-foreground">Tên người dùng</Label>
                  <Input
                    placeholder="Nhập tên người dùng"
                    className="mt-1.5 border-border bg-background text-foreground"
                  />
                </div>
              </div>
              <div>
                <Label className="text-foreground">Số điểm</Label>
                <Input
                  type="number"
                  placeholder="10000"
                  className="mt-1.5 border-border bg-background text-foreground"
                />
              </div>
              <div>
                <Label className="text-foreground">Lý do tặng</Label>
                <Textarea
                  placeholder="Nhập lý do tặng phần thưởng"
                  className="mt-1.5 border-border bg-background text-foreground resize-none"
                  rows={3}
                />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Gửi phần thưởng
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'batch' && (
        <Card className="mb-8 border border-border bg-card">
          <CardHeader>
            <CardTitle>Tặng phần thưởng theo lô</CardTitle>
            <CardDescription>Tải lên tệp CSV để tặng phần thưởng cho nhiều người dùng cùng lúc</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                <input type="file" className="hidden" accept=".csv,.xlsx" />
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
              <Button onClick={handleBatchUpload} className="w-full bg-primary hover:bg-primary/90">
                Tải lên và xử lý
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'campaign' && (
        <Card className="mb-8 border border-border bg-card">
          <CardHeader>
            <CardTitle>Tặng phần thưởng theo chiến dịch</CardTitle>
            <CardDescription>Gửi phần thưởng tự động cho người dùng tham gia chiến dịch</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label className="text-foreground">Chọn chiến dịch *</Label>
                <Select>
                  <option value="">Chọn chiến dịch</option>
                  <option>Summer Sale Campaign</option>
                  <option>Birthday Month Campaign</option>
                  <option>Referral Program</option>
                </Select>
              </div>
              <div>
                <Label className="text-foreground">Số điểm cho mỗi người tham gia *</Label>
                <Input
                  type="number"
                  placeholder="50000"
                  className="mt-1.5 border-border bg-background text-foreground"
                />
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Sẽ tặng phần thưởng cho ~500 người dùng từ chiến dịch này
                </p>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Gửi phần thưởng
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'department' && (
        <Card className="mb-8 border border-border bg-card">
          <CardHeader>
            <CardTitle>Tặng phần thưởng theo phòng ban</CardTitle>
            <CardDescription>Gửi phần thưởng cho nhân viên của một phòng ban</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label className="text-foreground">Chọn phòng ban *</Label>
                <Select>
                  <option value="">Chọn phòng ban</option>
                  <option>Bộ phận Bán hàng</option>
                  <option>Bộ phận Tiếp thị</option>
                  <option>Bộ phận IT</option>
                  <option>Bộ phận Tài chính</option>
                </Select>
              </div>
              <div>
                <Label className="text-foreground">Số điểm cho mỗi nhân viên *</Label>
                <Input
                  type="number"
                  placeholder="100000"
                  className="mt-1.5 border-border bg-background text-foreground"
                />
              </div>
              <div>
                <Label className="text-foreground">Lý do tặng (cùng cho tất cả)</Label>
                <Textarea
                  placeholder="e.g. Thưởng hiệu suất quý 1"
                  className="mt-1.5 border-border bg-background text-foreground resize-none"
                  rows={3}
                />
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Sẽ tặng phần thưởng cho ~25 nhân viên trong phòng ban này
                </p>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Gửi phần thưởng
              </Button>
            </div>
          </CardContent>
        </Card>
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
