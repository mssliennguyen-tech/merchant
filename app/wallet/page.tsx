'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Download, Plus, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const walletSummary = {
  totalPurchased: 5000000,
  available: 2450000,
  issued: 1800000,
  redeemed: 750000,
};

const transactions = [
  {
    id: 'TXN001',
    date: '2024-03-08',
    type: 'Phần thưởng chiến dịch',
    pointsChange: 50000,
    reference: 'Campaign: Summer Sale',
    status: 'Hoàn thành',
  },
  {
    id: 'TXN002',
    date: '2024-03-07',
    type: 'Phần thưởng theo lô',
    pointsChange: 100000,
    reference: 'Batch Upload #5',
    status: 'Hoàn thành',
  },
  {
    id: 'TXN003',
    date: '2024-03-06',
    type: 'Hoàn lại phiếu mua',
    pointsChange: -30000,
    reference: 'Voucher: SUMMER50',
    status: 'Hoàn thành',
  },
  {
    id: 'TXN004',
    date: '2024-03-05',
    type: 'Điều chỉnh thủ công',
    pointsChange: 20000,
    reference: 'Manual Adjustment',
    status: 'Hoàn thành',
  },
  {
    id: 'TXN005',
    date: '2024-03-04',
    type: 'Phần thưởng chiến dịch',
    pointsChange: 75000,
    reference: 'Campaign: Birthday Month',
    status: 'Hoàn thành',
  },
];

export default function WalletPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<typeof transactions[0] | null>(null);
  const [showBuyModal, setShowBuyModal] = useState(false);

  const usagePercentage = (walletSummary.issued / walletSummary.totalPurchased) * 100;

  const handleBuyPoints = () => {
    toast.success('Chuyển hướng đến trang mua điểm...');
    setShowBuyModal(false);
  };

  const handleExportHistory = () => {
    toast.success('Đang tải xuống lịch sử ví...');
  };

  const handleTransfer = () => {
    toast.info('Chức năng chuyển điểm sẽ sớm có sẵn');
  };

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Quản lý ví điểm</h1>
        <p className="text-muted-foreground mt-1">
          Theo dõi và quản lý số dư điểm của bạn
        </p>
      </div>

      {/* Wallet Summary Cards */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tổng điểm đã mua
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {walletSummary.totalPurchased.toLocaleString('vi-VN')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Tổng cộng</p>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Điểm còn lại
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {walletSummary.available.toLocaleString('vi-VN')}
            </div>
            <p className="text-xs text-accent mt-1">Sẵn sàng sử dụng</p>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Điểm đã phát hành
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {walletSummary.issued.toLocaleString('vi-VN')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Cho khách hàng</p>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Điểm đã hoàn lại
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {walletSummary.redeemed.toLocaleString('vi-VN')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Bởi khách hàng</p>
          </CardContent>
        </Card>
      </div>

      {/* Wallet Balance Progress */}
      <Card className="mb-8 border border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Tiến trình sử dụng ví</CardTitle>
              <CardDescription>
                {usagePercentage.toFixed(1)}% của tổng điểm đã được phát hành
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">
                {walletSummary.issued.toLocaleString('vi-VN')} / {walletSummary.totalPurchased.toLocaleString('vi-VN')}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={usagePercentage} className="h-2" />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:gap-3">
        <Button
          onClick={() => setShowBuyModal(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Mua thêm điểm
        </Button>
        <Button
          onClick={handleTransfer}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowRight className="h-4 w-4" />
          Chuyển điểm
        </Button>
        <Button
          onClick={handleExportHistory}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Xuất lịch sử
        </Button>
      </div>

      {/* Wallet Ledger Table */}
      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle>Sổ cái ví</CardTitle>
          <CardDescription>Lịch sử giao dịch điểm của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border">
                  <TableHead className="text-foreground">Ngày</TableHead>
                  <TableHead className="text-foreground">Loại giao dịch</TableHead>
                  <TableHead className="text-right text-foreground">Thay đổi điểm</TableHead>
                  <TableHead className="text-foreground">Tham chiếu</TableHead>
                  <TableHead className="text-foreground">Trạng thái</TableHead>
                  <TableHead className="text-right text-foreground">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id} className="border-b border-border hover:bg-muted/30">
                    <TableCell className="text-foreground text-sm">{tx.date}</TableCell>
                    <TableCell className="text-foreground text-sm">{tx.type}</TableCell>
                    <TableCell className="text-right font-medium">
                      <span className={tx.pointsChange >= 0 ? 'text-accent' : 'text-destructive'}>
                        {tx.pointsChange >= 0 ? '+' : ''}{tx.pointsChange.toLocaleString('vi-VN')}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{tx.reference}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                        {tx.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        onClick={() => setSelectedTransaction(tx)}
                        variant="ghost"
                        size="sm"
                        className="text-xs text-primary hover:bg-primary/10"
                      >
                        Chi tiết
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Details Modal */}
      <Dialog open={!!selectedTransaction} onOpenChange={(open) => !open && setSelectedTransaction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chi tiết giao dịch</DialogTitle>
            <DialogDescription>
              Thông tin chi tiết về giao dịch điểm
            </DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">ID giao dịch</label>
                  <p className="text-foreground font-mono text-sm mt-1">{selectedTransaction.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Ngày giao dịch</label>
                  <p className="text-foreground text-sm mt-1">{selectedTransaction.date}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Loại giao dịch</label>
                <p className="text-foreground text-sm mt-1">{selectedTransaction.type}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Thay đổi điểm</label>
                <p className={`text-lg font-bold mt-1 ${selectedTransaction.pointsChange >= 0 ? 'text-accent' : 'text-destructive'}`}>
                  {selectedTransaction.pointsChange >= 0 ? '+' : ''}{selectedTransaction.pointsChange.toLocaleString('vi-VN')}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Tham chiếu</label>
                <p className="text-foreground text-sm mt-1">{selectedTransaction.reference}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Trạng thái</label>
                <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30 mt-2">
                  {selectedTransaction.status}
                </Badge>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90">
                Đóng
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Buy Points Modal */}
      <Dialog open={showBuyModal} onOpenChange={setShowBuyModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mua thêm điểm</DialogTitle>
            <DialogDescription>
              Chọn gói điểm để mua
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {[
              { points: 100000, price: 1000000, bonus: 0 },
              { points: 500000, price: 4500000, bonus: 50000 },
              { points: 1000000, price: 8500000, bonus: 200000 },
              { points: 5000000, price: 40000000, bonus: 1000000 },
            ].map((package_) => (
              <Card key={package_.points} className="border border-border bg-background cursor-pointer hover:border-primary hover:shadow-md transition-all">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-foreground">
                        {package_.points.toLocaleString('vi-VN')} điểm
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {package_.price.toLocaleString('vi-VN')} VND
                      </p>
                    </div>
                    {package_.bonus > 0 && (
                      <Badge className="bg-accent text-accent-foreground">
                        +{(package_.bonus).toLocaleString('vi-VN')} Bonus
                      </Badge>
                    )}
                  </div>
                  <Button
                    onClick={handleBuyPoints}
                    className="w-full bg-primary hover:bg-primary/90 text-sm"
                  >
                    Chọn
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
