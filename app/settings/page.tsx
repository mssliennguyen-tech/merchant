'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { DashboardLayout } from '@/components/dashboard-layout';
import { TermsOfServiceModal } from '@/components/terms-of-service-modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Copy, Key, Bell, Lock, User, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');
  const [showTermsModal, setShowTermsModal] = useState(false);

  const tabs = [
    { id: 'general', label: 'Chung', icon: User },
    { id: 'api', label: 'Khóa API', icon: Key },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'security', label: 'Bảo mật', icon: Lock },
    { id: 'logout', label: 'Đăng xuất', icon: LogOut },
  ];

  const handleLogoutClick = () => {
    setShowTermsModal(true);
  };

  const handleLogoutConfirm = () => {
    setShowTermsModal(false);
    toast.success('Đã đăng xuất thành công');
    setTimeout(() => {
      router.push('/login');
    }, 500);
  };

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Cài đặt</h1>
        <p className="text-muted-foreground mt-1">
          Quản lý tài khoản và sở thích của bạn
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* General Settings */}
          {activeTab === 'general' && (
            <Card className="border border-border bg-card">
              <CardHeader>
                <CardTitle>Cài đặt chung</CardTitle>
                <CardDescription>
                  Quản lý chi tiết tài khoản nhà bán lẻ của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Tên
                    </label>
                    <Input
                      defaultValue="Nguyễn"
                      className="h-10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Họ
                    </label>
                    <Input
                      defaultValue="Văn A"
                      className="h-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email công ty
                  </label>
                  <Input
                    type="email"
                    defaultValue="abc@company.com"
                    className="h-10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tên công ty
                  </label>
                  <Input
                    defaultValue="My Awesome Store"
                    className="h-10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Business Category
                  </label>
                  <select className="w-full h-10 rounded-lg border border-border bg-background px-3 py-2 text-sm">
                    <option>Retail</option>
                    <option>Food & Beverage</option>
                    <option>Services</option>
                    <option>E-commerce</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button className="gap-2 bg-primary hover:bg-primary/90">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* API Keys */}
          {activeTab === 'api' && (
            <Card className="border border-border bg-card">
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>
                  Manage your API credentials for integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-4">
                  <p className="text-sm text-foreground">
                    Keep your API keys secret and never share them publicly.
                  </p>
                </div>

                {[
                  { label: 'Public Key', value: 'pk_live_4eC39HqLyjWDarht', type: 'public' },
                  { label: 'Secret Key', value: 'sk_live_51XXXXXXXXXXXXXXXXX', type: 'secret' },
                ].map((key, i) => (
                  <div key={i}>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {key.label}
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="password"
                        value={key.value}
                        readOnly
                        className="h-10 font-mono text-xs"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-3"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t border-border">
                  <Button className="gap-2 bg-primary hover:bg-primary/90">
                    Regenerate Keys
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <Card className="border border-border bg-card">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Control how you receive alerts and updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Campaign launches', checked: true },
                  { label: 'Reward redemptions', checked: true },
                  { label: 'Customer joins', checked: false },
                  { label: 'System updates', checked: true },
                  { label: 'Weekly reports', checked: true },
                  { label: 'Monthly summaries', checked: false },
                ].map((notif, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={notif.checked}
                      className="h-4 w-4 rounded border-border bg-background"
                    />
                    <span className="text-sm font-medium text-foreground">
                      {notif.label}
                    </span>
                  </label>
                ))}

                <div className="pt-4 border-t border-border">
                  <Button className="gap-2 bg-primary hover:bg-primary/90">
                    <Save className="h-4 w-4" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security */}
          {activeTab === 'security' && (
            <Card className="border border-border bg-card">
              <CardHeader>
                <CardTitle>Bảo mật</CardTitle>
                <CardDescription>
                  Quản lý cài đặt bảo mật cho tài khoản của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">
                    Mật khẩu
                  </h3>
                  <Button className="gap-2 bg-primary hover:bg-primary/90">
                    Đổi mật khẩu
                  </Button>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-foreground mb-3">
                    Xác thực hai lớp
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Thêm một lớp bảo mật bổ sung cho tài khoản của bạn
                  </p>
                  <Button variant="outline">
                    Bật xác thực hai lớp
                  </Button>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-semibold text-foreground mb-3">
                    Phiên hoạt động
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Phiên hiện tại
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Hoạt động cuối cùng: Vừa xong
                        </p>
                      </div>
                      <span className="text-xs font-medium text-accent">
                        Hoạt động
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    className="mt-4"
                  >
                    Đăng xuất tất cả phiên khác
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Logout */}
          {activeTab === 'logout' && (
            <Card className="border border-border bg-card">
              <CardHeader>
                <CardTitle>Đăng xuất</CardTitle>
                <CardDescription>
                  Đăng xuất khỏi hệ thống MyPoint
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-destructive/10 p-4 border border-destructive/20">
                  <h3 className="font-semibold text-destructive mb-2">
                    Cảnh báo
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Khi bạn đăng xuất, bạn sẽ cần đăng nhập lại để tiếp tục sử dụng các tính năng quản lý.
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <Button
                    variant="destructive"
                    onClick={handleLogoutClick}
                    className="gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Đăng xuất tài khoản
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Terms Modal */}
      <TermsOfServiceModal
        isOpen={showTermsModal}
        onAccept={handleLogoutConfirm}
        onDecline={() => setShowTermsModal(false)}
      />
    </DashboardLayout>
  );
}
