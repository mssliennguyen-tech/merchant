'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { TermsOfServiceModal } from '@/components/terms-of-service-modal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Gift, Plus } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

const campaignTemplates = [
  {
    id: 'purchase-reward',
    name: 'Phần thưởng mua hàng',
    description: 'Khách hàng nhận điểm cho mỗi giao dịch mua hàng.',
    icon: '🛍️',
  },
  {
    id: 'double-points',
    name: 'Khuyến mãi điểm kép',
    description: 'Khách hàng nhận gấp đôi điểm trong thời gian quảng cáo.',
    icon: '⚡',
  },
  {
    id: 'seasonal',
    name: 'Chiến dịch theo mùa',
    description: 'Chạy chiến dịch khách hàng thân thiết vào các dịp lễ tết.',
    icon: '🎉',
  },
  {
    id: 'new-customer',
    name: 'Phần thưởng khách hàng mới',
    description: 'Tặng điểm cho người dùng lần đầu tiên đăng ký.',
    icon: '👤',
  },
  {
    id: 'employee-recognition',
    name: 'Công nhân viên nhân',
    description: 'Tặng điểm cho nhân viên để nhận dạng.',
    icon: '👥',
  },
];

export default function DashboardPage() {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [hasNoCampaigns] = useState(true); // In real app, check if merchant has campaigns

  useEffect(() => {
    // Check if user has accepted terms on first login
    const hasAcceptedTerms = localStorage.getItem('termsAccepted');
    if (!hasAcceptedTerms) {
      setShowTermsModal(true);
    }
  }, []);

  const handleAcceptTerms = () => {
    localStorage.setItem('termsAccepted', 'true');
    setShowTermsModal(false);
    toast.success('Cảm ơn bạn đã đồng ý với các điều khoản!');
  };

  const handleUseTemplate = (templateId: string) => {
    toast.success(`Đang tạo chiến dịch từ mẫu...`);
    // Navigate to campaign creation with template pre-filled
    // router.push(`/campaigns/new?template=${templateId}`);
  };

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bảng điều khiển</h1>
          <p className="text-muted-foreground mt-1">
            Chào mừng quay lại! Đây là tổng quan chương trình khách hàng thân thiết của bạn.
          </p>
        </div>
        <Button asChild className="mt-4 md:mt-0 bg-primary hover:bg-primary/90">
          <Link href="/campaigns/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Chiến dịch mới
          </Link>
        </Button>
      </div>

      {/* Campaign Template Library - Show if no campaigns */}
      {hasNoCampaigns && (
        <Card className="mb-8 border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-xl">Thư viện mẫu chiến dịch</CardTitle>
            <CardDescription>
              Chọn một mẫu để bắt đầu chiến dịch khách hàng thân thiết đầu tiên của bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
              {campaignTemplates.map((template) => (
                <Card key={template.id} className="flex flex-col border border-border bg-background hover:border-primary hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="pt-6 flex flex-col flex-1">
                    <div className="text-4xl mb-3">{template.icon}</div>
                    <h3 className="font-semibold text-foreground mb-2">{template.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-1">{template.description}</p>
                    <Button
                      onClick={() => handleUseTemplate(template.id)}
                      variant="outline"
                      size="sm"
                      className="w-full border-primary text-primary hover:bg-primary/5"
                    >
                      Sử dụng mẫu
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats grid */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: 'Tổng điểm được phát hành',
            value: '2.5M',
            change: '+12.5%',
            icon: BarChart3,
          },
          {
            title: 'Khách hàng hoạt động',
            value: '12,847',
            change: '+8.2%',
            icon: Users,
          },
          {
            title: 'Chiến dịch hoạt động',
            value: '8',
            change: '+2',
            icon: TrendingUp,
          },
          {
            title: 'Phần thưởng được sử dụng',
            value: '3,421',
            change: '+24.1%',
            icon: Gift,
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="border border-border bg-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <p className="text-xs text-accent mt-1">{stat.change} tháng này</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts and tables section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main chart area */}
        <Card className="lg:col-span-2 border border-border bg-card">
          <CardHeader>
            <CardTitle>Phân bổ điểm</CardTitle>
            <CardDescription>Điểm được phát hành và sử dụng hàng tháng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg text-muted-foreground">
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <p>Biểu đồ placeholder</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
            <CardDescription>Cập nhật mới nhất</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'New campaign', time: '2h ago' },
              { label: 'Rewards claimed', time: '4h ago' },
              { label: 'Customer signup', time: '1d ago' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-foreground">{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Bottom section */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg">Top Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Summer Sale', points: '450K', status: 'Active' },
                { name: 'Birthday Bonus', points: '320K', status: 'Active' },
                { name: 'Referral Program', points: '210K', status: 'Pending' },
              ].map((campaign, i) => (
                <div key={i} className="flex items-center justify-between pb-2 border-b border-border last:border-0">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{campaign.name}</p>
                    <p className="text-xs text-muted-foreground">{campaign.points}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    campaign.status === 'Active'
                      ? 'bg-accent/20 text-accent'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {campaign.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg">System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: 'API', status: 'Operational', color: 'bg-accent' },
              { name: 'Database', status: 'Operational', color: 'bg-accent' },
              { name: 'Integration', status: 'Operational', color: 'bg-accent' },
            ].map((system, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-foreground">{system.name}</span>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${system.color}`} />
                  <span className="text-xs text-muted-foreground">{system.status}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Terms Modal */}
      <TermsOfServiceModal
        isOpen={showTermsModal}
        onAccept={handleAcceptTerms}
      />
    </DashboardLayout>
  );
}
