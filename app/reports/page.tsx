'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, TrendingUp, Users, Gift, Zap, BarChart3, FileText } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: '2024-01-01',
    endDate: '2024-12-31',
  });

  const reports = [
    {
      id: 'dashboard-summary',
      name: 'Tổng quan Dashboard',
      icon: BarChart3,
      description: 'Tóm tắt hoạt động, xu hướng chính và KPI',
      metrics: ['Điểm phát hành', 'Khách hàng hoạt động', 'Tỷ lệ tham gia', 'Chiến dịch hoạt động'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'bank-transactions',
      name: 'Báo cáo giao dịch ngân hàng',
      icon: Zap,
      description: 'Chi tiết tất cả giao dịch điểm',
      metrics: ['Tổng giao dịch', 'Điểm mua', 'Điểm phát hành', 'Giá trị trung bình'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'points-analysis',
      name: 'Phân tích điểm',
      icon: Zap,
      description: 'Điểm phát hành, sử dụng và hết hạn',
      metrics: ['Điểm phát hành', 'Điểm sử dụng', 'Điểm hết hạn', 'Tồn kho'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'rewards-redemption',
      name: 'Báo cáo phần thưởng',
      icon: Gift,
      description: 'Phần thưởng được yêu cầu, được phê duyệt, bị từ chối',
      metrics: ['Phần thưởng được yêu cầu', 'Được phê duyệt', 'Bị từ chối', 'Tỷ lệ thành công'],
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'voucher-usage',
      name: 'Báo cáo phiếu mua hàng',
      icon: Gift,
      description: 'Sử dụng phiếu mua, hoàn trả và giảm giá',
      metrics: ['Phiếu phát hành', 'Phiếu được sử dụng', 'Tỷ lệ sử dụng', 'Tổng giảm giá'],
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 'game-performance',
      name: 'Báo cáo hiệu suất trò chơi',
      icon: BarChart3,
      description: 'Tỷ lệ chuyển đổi trò chơi và tham gia',
      metrics: ['Lượt chơi', 'Tỷ lệ chuyển đổi', 'Phần thưởng trung bình', 'Giá trị trung bình'],
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 'branch-performance',
      name: 'Báo cáo chi nhánh',
      icon: Users,
      description: 'Hiệu suất từng chi nhánh',
      metrics: ['Chi nhánh', 'Khách hàng', 'Điểm phát hành', 'Tỷ lệ tham gia'],
      color: 'from-indigo-500 to-blue-500',
    },
    {
      id: 'employee-team',
      name: 'Báo cáo nhân viên / Đội ngũ',
      icon: Users,
      description: 'Hiệu suất nhân viên và phòng ban',
      metrics: ['Nhân viên', 'Phòng ban', 'Phần thưởng được cấp', 'Tỷ lệ tham gia'],
      color: 'from-cyan-500 to-blue-500',
    },
  ];

  const handleGenerateReport = (reportId: string) => {
    toast.success('Báo cáo đang được tạo...');
    setTimeout(() => {
      toast.success('Báo cáo đã sẵn sàng để tải xuống');
    }, 1500);
  };

  const handleExport = (format: 'csv' | 'excel') => {
    toast.success(`Báo cáo đã được xuất thành ${format.toUpperCase()}`);
    setShowReportModal(false);
  };

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Báo cáo & Phân tích</h1>
        <p className="text-muted-foreground mt-1">
          Tạo và tải xuống báo cáo chi tiết về các hoạt động kinh doanh
        </p>
      </div>

      {/* Summary Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: 'Tổng điểm phát hành',
            value: '2.5M',
            change: '+12.5%',
            icon: Zap,
          },
          {
            label: 'Khách hàng hoạt động',
            value: '12,847',
            change: '+8.2%',
            icon: Users,
          },
          {
            label: 'Phần thưởng sử dụng',
            value: '3,421',
            change: '+24.1%',
            icon: Gift,
          },
          {
            label: 'Tỷ lệ tham gia',
            value: '67.3%',
            change: '+5.2%',
            icon: TrendingUp,
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="border border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-accent mt-1">{stat.change} tháng này</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <Card key={report.id} className="border border-border bg-card hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${report.color}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{report.name}</CardTitle>
                      <CardDescription className="text-xs">{report.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Metrics Preview */}
                <div className="grid grid-cols-2 gap-2">
                  {report.metrics.map((metric, idx) => (
                    <div key={idx} className="p-2 rounded bg-muted/50">
                      <p className="text-xs text-muted-foreground">{metric}</p>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setSelectedReport(report.id);
                      setShowReportModal(true);
                    }}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Xem
                  </Button>
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90"
                    onClick={() => handleGenerateReport(report.id)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Tải xuống
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Report View Modal */}
      <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {reports.find(r => r.id === selectedReport)?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Date Range Filter */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Từ ngày</label>
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
                  className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Đến ngày</label>
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
                  className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Sample Report Content */}
            <div className="space-y-4">
              <Card className="border border-border bg-background">
                <CardHeader>
                  <CardTitle className="text-base">Tóm tắt báo cáo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { label: 'Tổng giao dịch', value: '1,245' },
                      { label: 'Tổng điểm', value: '2,500,000' },
                      { label: 'Giá trị trung bình', value: '2,008' },
                      { label: 'Khách hàng duy nhất', value: '5,234' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded bg-muted/50">
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                        <span className="text-lg font-bold text-foreground">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Export Options */}
              <Card className="border border-border bg-background">
                <CardHeader>
                  <CardTitle className="text-base">Xuất báo cáo</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleExport('csv')}
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Xuất CSV
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleExport('excel')}
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Xuất Excel
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
