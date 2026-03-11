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
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Plus, Edit2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const vouchers = [
  {
    id: 1,
    name: 'Giảm giá 50K',
    pointsRequired: 1000,
    totalStock: 500,
    remainingStock: 325,
    expiryDate: '2024-06-30',
    status: 'active',
    value: '50,000 VND',
  },
  {
    id: 2,
    name: 'Voucher mua 1 tặng 1',
    pointsRequired: 2000,
    totalStock: 200,
    remainingStock: 150,
    expiryDate: '2024-05-15',
    status: 'active',
    value: 'Buy 1 Get 1',
  },
  {
    id: 3,
    name: 'Voucher miễn phí vận chuyển',
    pointsRequired: 500,
    totalStock: 1000,
    remainingStock: 600,
    expiryDate: '2024-07-31',
    status: 'active',
    value: 'Miễn phí vận chuyển',
  },
  {
    id: 4,
    name: 'Voucher cũ',
    pointsRequired: 1500,
    totalStock: 300,
    remainingStock: 0,
    expiryDate: '2024-03-01',
    status: 'expired',
    value: '100,000 VND',
  },
];

export default function VouchersPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<typeof vouchers[0] | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pointsRequired: '',
    voucherValue: '',
    quantity: '',
    expiryDate: '',
    distributionMethod: 'public',
  });

  const handleCreateVoucher = () => {
    if (!formData.name || !formData.pointsRequired || !formData.quantity) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }
    toast.success('Voucher đã được tạo thành công!');
    setFormData({
      name: '',
      description: '',
      pointsRequired: '',
      voucherValue: '',
      quantity: '',
      expiryDate: '',
      distributionMethod: 'public',
    });
    setIsCreateModalOpen(false);
  };

  const handleDisableVoucher = (voucherId: number) => {
    toast.success('Voucher đã được vô hiệu hóa');
  };

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý Voucher</h1>
          <p className="text-muted-foreground mt-1">
            Tạo và quản lý các voucher cho chương trình khách hàng thân thiết của bạn
          </p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="mt-4 md:mt-0 flex items-center gap-2 bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Tạo voucher mới
        </Button>
      </div>

      {/* Vouchers Table */}
      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle>Danh sách Phiếu mua hàng</CardTitle>
          <CardDescription>Quản lý tất cả các voucher của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border">
                  <TableHead className="text-foreground">Tên voucher</TableHead>
                  <TableHead className="text-right text-foreground">Điểm cần</TableHead>
                  <TableHead className="text-right text-foreground">Tổng kho</TableHead>
                  <TableHead className="text-right text-foreground">Còn lại</TableHead>
                  <TableHead className="text-foreground">Hạn sử dụng</TableHead>
                  <TableHead className="text-foreground">Trạng thái</TableHead>
                  <TableHead className="text-center text-foreground">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vouchers.map((voucher) => (
                  <TableRow key={voucher.id} className="border-b border-border hover:bg-muted/30">
                    <TableCell className="text-foreground font-medium">{voucher.name}</TableCell>
                    <TableCell className="text-right text-foreground">
                      {voucher.pointsRequired.toLocaleString('vi-VN')}
                    </TableCell>
                    <TableCell className="text-right text-foreground">
                      {voucher.totalStock.toLocaleString('vi-VN')}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className={voucher.remainingStock > 0 ? 'text-accent' : 'text-destructive'}>
                        {voucher.remainingStock.toLocaleString('vi-VN')}
                      </span>
                    </TableCell>
                    <TableCell className="text-foreground text-sm">{voucher.expiryDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant={voucher.status === 'active' ? 'outline' : 'secondary'}
                        className={voucher.status === 'active'
                          ? 'bg-accent/10 text-accent border-accent/30'
                          : 'bg-muted text-muted-foreground'
                        }
                      >
                        {voucher.status === 'active' ? 'Hoạt động' : 'Hết hạn'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          onClick={() => {
                            setSelectedVoucher(voucher);
                            setShowPreview(true);
                          }}
                          variant="ghost"
                          size="sm"
                          className="text-xs text-primary hover:bg-primary/10"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs text-primary hover:bg-primary/10"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Create Voucher Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tạo Voucher mới</DialogTitle>
            <DialogDescription>
              Tạo một voucher mới để khách hàng có thể hoàn lại
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Voucher Info */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Thông tin voucher</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-foreground">Tên voucher *</Label>
                  <Input
                    placeholder="e.g. Giảm giá 50K"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1.5 border-border bg-background text-foreground"
                  />
                </div>

                <div>
                  <Label className="text-foreground">Mô tả</Label>
                  <Textarea
                    placeholder="Mô tả chi tiết về voucher"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-1.5 border-border bg-background text-foreground resize-none"
                    rows={3}
                  />
                </div>

                <div>
                  <Label className="text-foreground">Logo thương hiệu</Label>
                  <div className="mt-1.5 border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                    <input type="file" className="hidden" accept="image/*" />
                    <div className="text-sm text-muted-foreground">
                      Nhấp để tải lên logo hoặc kéo thả
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Point & Value */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Giá trị voucher</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-foreground">Điểm cần để hoàn lại *</Label>
                  <Input
                    type="number"
                    placeholder="1000"
                    value={formData.pointsRequired}
                    onChange={(e) => setFormData({ ...formData, pointsRequired: e.target.value })}
                    className="mt-1.5 border-border bg-background text-foreground"
                  />
                </div>

                <div>
                  <Label className="text-foreground">Giá trị voucher *</Label>
                  <Input
                    placeholder="e.g. 50,000 VND"
                    value={formData.voucherValue}
                    onChange={(e) => setFormData({ ...formData, voucherValue: e.target.value })}
                    className="mt-1.5 border-border bg-background text-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Stock & Expiry */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Kho và hạn sử dụng</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-foreground">Số lượng tổng cộng *</Label>
                  <Input
                    type="number"
                    placeholder="500"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="mt-1.5 border-border bg-background text-foreground"
                  />
                </div>

                <div>
                  <Label className="text-foreground">Hạn sử dụng</Label>
                  <Input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="mt-1.5 border-border bg-background text-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Distribution Method */}
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Phương pháp phân phối</h3>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="distribution"
                    value="public"
                    checked={formData.distributionMethod === 'public'}
                    onChange={(e) => setFormData({ ...formData, distributionMethod: e.target.value })}
                    className="mr-2"
                  />
                  <span className="text-foreground text-sm">Công cộng - Hiển thị cho tất cả khách hàng</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="distribution"
                    value="private"
                    checked={formData.distributionMethod === 'private'}
                    onChange={(e) => setFormData({ ...formData, distributionMethod: e.target.value })}
                    className="mr-2"
                  />
                  <span className="text-foreground text-sm">Riêng tư - Chỉ dùng cho chiến dịch cụ thể</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => setShowPreview(true)}
                variant="outline"
                className="flex-1"
              >
                Xem trước
              </Button>
              <Button
                onClick={handleCreateVoucher}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Tạo Voucher
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Voucher Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Xem trước Voucher</DialogTitle>
            <DialogDescription>
              Đây là cách voucher sẽ hiển thị cho khách hàng
            </DialogDescription>
          </DialogHeader>

          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-6 border border-primary/20">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-lg mx-auto flex items-center justify-center">
                <span className="text-2xl">🎁</span>
              </div>
              <div>
                <h3 className="font-bold text-lg text-foreground">
                  {formData.name || selectedVoucher?.name || 'Tên Voucher'}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {formData.voucherValue || selectedVoucher?.value || 'Giá trị voucher'}
                </p>
              </div>
              <div className="border-t border-primary/20 pt-4">
                <p className="text-xs text-muted-foreground mb-2">Cần {formData.pointsRequired || selectedVoucher?.pointsRequired || '0'} điểm để hoàn lại</p>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Hoàn lại
                </Button>
              </div>
            </div>
          </div>

          <Button
            onClick={() => setShowPreview(false)}
            variant="outline"
            className="w-full"
          >
            Đóng
          </Button>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
