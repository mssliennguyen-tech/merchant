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
    type: 'reward',
  },
  {
    id: 'double-points',
    name: 'Khuyến mãi điểm kép',
    description: 'Khách hàng nhận gấp đôi điểm trong thời gian quảng cáo.',
    icon: '⚡',
    type: 'reward',
  },
  {
    id: 'seasonal',
    name: 'Chiến dịch theo mùa',
    description: 'Chạy chiến dịch khách hàng thân thiết vào các dịp lễ tết.',
    icon: '🎉',
    type: 'reward',
  },
  {
    id: 'new-customer',
    name: 'Phần thưởng khách hàng mới',
    description: 'Tặng điểm cho người dùng lần đầu tiên đăng ký.',
    icon: '👤',
    type: 'reward',
  },
  {
    id: 'employee-recognition',
    name: 'Công nhân viên nhân',
    description: 'Tặng điểm cho nhân viên để nhận dạng.',
    icon: '👥',
    type: 'reward',
  },
  {
    id: 'spin-wheel',
    name: 'Vòng quay may mắn',
    description: 'Khách hàng chơi vòng quay để nhận điểm và phần thưởng.',
    icon: '🎡',
    type: 'game',
  },
  {
    id: 'scratch-card',
    name: 'Thẻ cào trúng thưởng',
    description: 'Người dùng cào để phát hiện các phần thưởng ẩn.',
    icon: '🎟️',
    type: 'game',
  },
  {
    id: 'lucky-draw',
    name: 'Xổ số may mắn',
    description: 'Chạy xổ số với các giải thưởng hấp dẫn.',
    icon: '🎲',
    type: 'game',
  },
];

export default function DashboardPage() {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [hasNoCampaigns] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [campaignConfig, setCampaignConfig] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    customerGroup: '',
    pointsPerAction: 0,
    dailyLimit: 0,
    maxPerUser: 0,
    gameSettings: {
      wheelSegments: 6,
      prizes: ['100 điểm', '200 điểm', '500 điểm'],
      winRate: 50,
    },
  });

  useEffect(() => {
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

  const handleSelectTemplate = (template: any) => {
    setSelectedTemplate(template);
    setCampaignConfig({
      ...campaignConfig,
      name: template.name,
      description: template.description,
    });
    setShowConfigModal(true);
  };

  const handleCreateCampaign = () => {
    if (!campaignConfig.name || !campaignConfig.startDate || !campaignConfig.endDate) {
      toast.error('Vui lòng điền tất cả thông tin bắt buộc');
      return;
    }
    toast.success(`Chiến dịch "${campaignConfig.name}" đã được tạo`);
    setShowConfigModal(false);
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {campaignTemplates.map((template) => (
                <Card 
                  key={template.id} 
                  className="flex flex-col border border-border bg-background hover:border-primary hover:shadow-md transition-all cursor-pointer"
                  onClick={() => handleSelectTemplate(template)}
                >
                  <CardContent className="pt-6 flex flex-col flex-1">
                    <div className="text-4xl mb-3">{template.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">{template.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                      <span className="inline-block text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {template.type === 'game' ? 'Trò chơi' : 'Phần thưởng'}
                      </span>
                    </div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectTemplate(template);
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full border-primary text-primary hover:bg-primary/5 mt-4"
                    >
                      Cấu hình
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

      {/* Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border bg-card">
            <CardHeader className="border-b border-border sticky top-0 bg-card">
              <CardTitle>Cấu hình chiến dịch</CardTitle>
              <CardDescription>
                Mẫu: {selectedTemplate?.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Thông tin cơ bản</h3>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Tên chiến dịch *</label>
                  <input
                    type="text"
                    value={campaignConfig.name}
                    onChange={(e) => setCampaignConfig({ ...campaignConfig, name: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Nhập tên chiến dịch"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Mô tả</label>
                  <textarea
                    value={campaignConfig.description}
                    onChange={(e) => setCampaignConfig({ ...campaignConfig, description: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Mô tả chi tiết về chiến dịch"
                    rows={3}
                  />
                </div>
              </div>

              {/* Date Settings */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Thời gian chiến dịch</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Ngày bắt đầu *</label>
                    <input
                      type="date"
                      value={campaignConfig.startDate}
                      onChange={(e) => setCampaignConfig({ ...campaignConfig, startDate: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Ngày kết thúc *</label>
                    <input
                      type="date"
                      value={campaignConfig.endDate}
                      onChange={(e) => setCampaignConfig({ ...campaignConfig, endDate: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Target Audience */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Đối tượng chiến dịch</h3>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Nhóm khách hàng</label>
                  <select
                    value={campaignConfig.customerGroup}
                    onChange={(e) => setCampaignConfig({ ...campaignConfig, customerGroup: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Tất cả khách hàng</option>
                    <option value="vip">Khách hàng VIP</option>
                    <option value="new">Khách hàng mới</option>
                    <option value="inactive">Khách hàng không hoạt động</option>
                  </select>
                </div>
              </div>

              {/* Campaign Settings */}
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground">Cài đặt chiến dịch</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Điểm mỗi lần</label>
                    <input
                      type="number"
                      value={campaignConfig.pointsPerAction}
                      onChange={(e) => setCampaignConfig({ ...campaignConfig, pointsPerAction: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Giới hạn hàng ngày</label>
                    <input
                      type="number"
                      value={campaignConfig.dailyLimit}
                      onChange={(e) => setCampaignConfig({ ...campaignConfig, dailyLimit: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Max/Người dùng</label>
                    <input
                      type="number"
                      value={campaignConfig.maxPerUser}
                      onChange={(e) => setCampaignConfig({ ...campaignConfig, maxPerUser: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Game Settings - Only show for game templates */}
              {selectedTemplate?.type === 'game' && (
                <div className="space-y-4 border-t border-border pt-4">
                  <h3 className="font-semibold text-foreground">Cài đặt trò chơi</h3>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Số phần trong vòng quay</label>
                    <input
                      type="number"
                      value={campaignConfig.gameSettings.wheelSegments}
                      onChange={(e) => setCampaignConfig({
                        ...campaignConfig,
                        gameSettings: { ...campaignConfig.gameSettings, wheelSegments: parseInt(e.target.value) || 6 }
                      })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      min="3"
                      max="12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Tỷ lệ thắng (%)</label>
                    <input
                      type="number"
                      value={campaignConfig.gameSettings.winRate}
                      onChange={(e) => setCampaignConfig({
                        ...campaignConfig,
                        gameSettings: { ...campaignConfig.gameSettings, winRate: parseInt(e.target.value) || 50 }
                      })}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t border-border">
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-foreground font-medium"
                >
                  Hủy
                </button>
                <Button
                  onClick={handleCreateCampaign}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Tạo chiến dịch
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Terms Modal */}
      <TermsOfServiceModal
        isOpen={showTermsModal}
        onAccept={handleAcceptTerms}
      />
    </DashboardLayout>
  );
}
