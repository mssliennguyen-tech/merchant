'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Copy, Check } from 'lucide-react';

interface GiftRewardsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rewardName: string;
  rewardId: number;
}

const SMS_COSTS = {
  sms: 500, // VND per SMS
  zalo: 200, // VND per Zalo message
};

export function GiftRewardsModal({
  open,
  onOpenChange,
  rewardName,
  rewardId,
}: GiftRewardsModalProps) {
  const [step, setStep] = useState<'select' | 'configure'>('select');
  const [selectedUsers, setSelectedUsers] = useState<Array<{ id: string; name: string; phone: string }>>([]);
  const [currentUser, setCurrentUser] = useState({ name: '', phone: '' });
  const [messageMethod, setMessageMethod] = useState<'sms' | 'zalo'>('sms');
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'bank'>('qr');
  const [copied, setCopied] = useState(false);

  // Sample user data - in real app this would come from API
  const availableUsers = [
    { id: '1', name: 'Nguyễn Văn A', phone: '0912345678' },
    { id: '2', name: 'Trần Thị B', phone: '0987654321' },
    { id: '3', name: 'Phạm Văn C', phone: '0901234567' },
    { id: '4', name: 'Hoàng Thị D', phone: '0923456789' },
  ];

  const addUser = () => {
    if (currentUser.name && currentUser.phone) {
      setSelectedUsers([...selectedUsers, { id: Date.now().toString(), ...currentUser }]);
      setCurrentUser({ name: '', phone: '' });
    }
  };

  const removeUser = (id: string) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== id));
  };

  const smsContent = `Bạn đã nhận được ${rewardName} từ Highland coffee. Hãy truy cập trang web http://rewards.highland.vn để nhận điểm.`;
  const estimatedCost = selectedUsers.length * (messageMethod === 'sms' ? SMS_COSTS.sms : SMS_COSTS.zalo);

  const handleSendRewards = () => {
    console.log('Sending rewards:', {
      rewardId,
      users: selectedUsers,
      messageMethod,
      paymentMethod,
      totalCost: estimatedCost,
    });
    onOpenChange(false);
    setStep('select');
    setSelectedUsers([]);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(smsContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Tặng {rewardName}</DialogTitle>
          <DialogDescription>
            {step === 'select'
              ? 'Chọn người dùng để tặng phần thưởng'
              : 'Cấu hình phương thức gửi và thanh toán'}
          </DialogDescription>
        </DialogHeader>

        {step === 'select' ? (
          <div className="space-y-6">
            {/* Block 1: Select Users */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Chọn người dùng</h3>
              
              {/* Quick select from list */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Người dùng nhanh chóng</label>
                <div className="grid grid-cols-2 gap-2">
                  {availableUsers.map((user) => (
                    <button
                      key={user.id}
                      onClick={() =>
                        setSelectedUsers([
                          ...selectedUsers,
                          user,
                        ])
                      }
                      className="p-3 rounded-lg border border-border hover:bg-muted text-left transition-colors"
                    >
                      <p className="font-medium text-sm text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.phone}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add custom user */}
              <div className="space-y-3 pt-4 border-t border-border">
                <label className="block text-sm font-medium text-foreground">Hoặc thêm người dùng bổ sung</label>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="user-name" className="text-sm font-medium mb-2">
                      Tên người dùng
                    </Label>
                    <Input
                      id="user-name"
                      value={currentUser.name}
                      onChange={(e) =>
                        setCurrentUser({ ...currentUser, name: e.target.value })
                      }
                      placeholder="Nhập tên người dùng"
                      className="h-10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="user-phone" className="text-sm font-medium mb-2">
                      Số điện thoại
                    </Label>
                    <Input
                      id="user-phone"
                      value={currentUser.phone}
                      onChange={(e) =>
                        setCurrentUser({ ...currentUser, phone: e.target.value })
                      }
                      placeholder="Nhập số điện thoại"
                      className="h-10"
                    />
                  </div>
                  <Button
                    onClick={addUser}
                    variant="outline"
                    className="w-full"
                  >
                    Thêm người dùng
                  </Button>
                </div>
              </div>
            </div>

            {/* Selected Users */}
            {selectedUsers.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-border">
                <h3 className="font-semibold text-foreground">
                  Người dùng được chọn ({selectedUsers.length})
                </h3>
                <div className="space-y-2">
                  {selectedUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted"
                    >
                      <div>
                        <p className="font-medium text-sm text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.phone}</p>
                      </div>
                      <Button
                        onClick={() => removeUser(user.id)}
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        Xóa
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Hủy
              </Button>
              <Button
                onClick={() => setStep('configure')}
                disabled={selectedUsers.length === 0}
                className="bg-primary hover:bg-primary/90"
              >
                Tiếp tục
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Block 2: Message Method */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Phương thức thanh toán tin nhắn</h3>
              <RadioGroup value={messageMethod} onValueChange={(value) => setMessageMethod(value as 'sms' | 'zalo')}>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted cursor-pointer">
                  <RadioGroupItem value="zalo" id="zalo" />
                  <Label htmlFor="zalo" className="flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium text-foreground">Gửi qua Zalo</p>
                      <p className="text-xs text-muted-foreground">
                        {SMS_COSTS.zalo.toLocaleString()} VND/tin nhắn
                      </p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted cursor-pointer">
                  <RadioGroupItem value="sms" id="sms" />
                  <Label htmlFor="sms" className="flex-1 cursor-pointer">
                    <div>
                      <p className="font-medium text-foreground">Gửi qua SMS</p>
                      <p className="text-xs text-muted-foreground">
                        {SMS_COSTS.sms.toLocaleString()} VND/tin nhắn
                      </p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* SMS Content Preview */}
            <div className="space-y-3 p-4 rounded-lg bg-muted">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm text-foreground">Nội dung tin nhắn {messageMethod === 'sms' ? 'SMS' : 'Zalo'}</h4>
                <Button
                  onClick={copyToClipboard}
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Đã sao chép
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Sao chép
                    </>
                  )}
                </Button>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{smsContent}</p>
            </div>

            {/* Block 3: Cost Summary */}
            <Card className="border border-border bg-card">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-foreground mb-4">Chi phí ước tính</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Chi phí {messageMethod === 'sms' ? 'SMS' : 'Zalo'}
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {(messageMethod === 'sms' ? SMS_COSTS.sms : SMS_COSTS.zalo).toLocaleString()} VND/tin
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Số người nhận</p>
                    <p className="text-sm font-medium text-foreground">{selectedUsers.length}</p>
                  </div>
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-foreground">Tổng chi phí</p>
                      <p className="text-lg font-bold text-foreground">
                        {estimatedCost.toLocaleString()} VND
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Block 4: Payment Method */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Phương thức thanh toán</h3>
              <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as 'qr' | 'bank')}>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted cursor-pointer">
                  <RadioGroupItem value="qr" id="qr" />
                  <Label htmlFor="qr" className="flex-1 cursor-pointer">
                    <p className="font-medium text-foreground">Thanh toán bằng QR Code</p>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted cursor-pointer">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank" className="flex-1 cursor-pointer">
                    <p className="font-medium text-foreground">Chuyển khoản ngân hàng</p>
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === 'qr' && (
                <div className="p-4 rounded-lg bg-muted text-center">
                  <p className="text-sm text-muted-foreground mb-3">QR Code thanh toán</p>
                  <div className="inline-block w-48 h-48 bg-background rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground text-xs">QR Code sẽ hiển thị ở đây</p>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setStep('select')}
              >
                Quay lại
              </Button>
              <Button
                onClick={handleSendRewards}
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
                Gửi phần thưởng
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
