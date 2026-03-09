'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, TrendingUp, BarChart3 } from 'lucide-react';

export default function ReportsPage() {
  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Báo cáo</h1>
          <p className="text-muted-foreground mt-1">
            Phân tích hiệu suất chương trình khách hàng thân thiết của bạn
          </p>
        </div>
        <Button variant="outline" asChild className="mt-4 md:mt-0 gap-2">
          <a href="#">
            <Download className="h-4 w-4" />
            Tải xuống tất cả
          </a>
        </Button>
      </div>

      {/* Key metrics */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Sức khỏe chương trình', value: '94%', change: '+5%', icon: TrendingUp },
          { label: 'Tỷ lệ tham gia', value: '67.4%', change: '+8.2%', icon: BarChart3 },
          { label: 'Điểm trung bình/Khách hàng', value: '245', change: '+12%', icon: TrendingUp },
          { label: 'Tỷ lệ sử dụng', value: '42.3%', change: '+3.1%', icon: BarChart3 },
        ].map((metric, i) => {
          const Icon = metric.icon;
          return (
            <Card key={i} className="border border-border bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {metric.value}
                </div>
                <p className="text-xs text-accent mt-1">{metric.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Reports grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {[
          {
            title: 'Báo cáo tham gia khách hàng',
            description: 'Phân tích chi tiết các chỉ số tham gia khách hàng',
            icon: BarChart3,
          },
          {
            title: 'Báo cáo phân bổ điểm',
            description: 'Phân tích các điểm được phát hành và sử dụng',
            icon: TrendingUp,
          },
          {
            title: 'Hiệu suất chiến dịch',
            description: 'Các chỉ số chiến dịch riêng lẻ và ROI',
            icon: FileText,
          },
          {
            title: 'Báo cáo sử dụng phần thưởng',
            description: 'Theo dõi tình trạng sử dụng phần thưởng và xu hướng',
            icon: FileText,
          },
          {
            title: 'Giá trị suất đời khách hàng',
            description: 'Phân tích CLV và phân đoạn khách hàng',
            icon: BarChart3,
          },
          {
            title: 'Tóm tắt tài chính',
            description: 'Tổng quan tài chính hàng tháng và dự phóng',
            icon: TrendingUp,
          },
        ].map((report, i) => {
          const Icon = report.icon;
          return (
            <Card
              key={i}
              className="border border-border bg-card hover:border-primary/50 transition-colors cursor-pointer"
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      {report.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {report.description}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        Xem
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Icon className="h-8 w-8 text-primary/30 ml-4 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analytics section */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle>Luồng điểm</CardTitle>
            <CardDescription>Xu hướng điểm hàng tháng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg text-muted-foreground">
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <p>Biểu đồ trực quan tại đây</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle>Chiến dịch hàng đầu</CardTitle>
            <CardDescription>Tổng quan hiệu suất</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Khuyến mãi hè', engagement: 78, points: '450K' },
                { name: 'Thưởng sinh nhật', engagement: 65, points: '320K' },
                { name: 'Chương trình giới thiệu', engagement: 42, points: '210K' },
              ].map((campaign, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">
                      {campaign.name}
                    </p>
                    <div className="h-2 w-full bg-muted rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${campaign.engagement}%` }}
                      />
                    </div>
                  </div>
                  <span className="ml-4 text-sm font-semibold text-foreground">
                    {campaign.points}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
