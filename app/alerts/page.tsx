'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Trash2, Settings, Bell, TrendingDown, Calendar, Zap } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'budget',
      title: 'Ngân sách đang cạn kiệt',
      description: 'Chiến dịch "Khuyến mãi hè" sử dụng 87% ngân sách',
      severity: 'warning',
      timestamp: '2 giờ trước',
      read: false,
    },
    {
      id: 2,
      type: 'expiry',
      title: 'Điểm sắp hết hạn',
      description: '50,000 điểm sẽ hết hạn trong 7 ngày',
      severity: 'warning',
      timestamp: '4 giờ trước',
      read: false,
    },
    {
      id: 3,
      type: 'stock',
      title: 'Phiếu mua hàng hết hàng',
      description: 'Phiếu "Giảm 20%" chỉ còn 5 cái',
      severity: 'critical',
      timestamp: '1 ngày trước',
      read: false,
    },
    {
      id: 4,
      type: 'campaign',
      title: 'Chiến dịch sắp kết thúc',
      description: 'Chiến dịch "Thưởng sinh nhật" sẽ kết thúc trong 3 ngày',
      severity: 'info',
      timestamp: '2 ngày trước',
      read: true,
    },
    {
      id: 5,
      type: 'budget',
      title: 'Ngân sách được phê duyệt',
      description: 'Yêu cầu ngân sách mới 500,000 điểm đã được phê duyệt',
      severity: 'success',
      timestamp: '3 ngày trước',
      read: true,
    },
  ]);

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [alertSettings, setAlertSettings] = useState({
    budgetThreshold: 80,
    expiryWarning: 30,
    stockAlert: 10,
    emailNotifications: true,
    pushNotifications: true,
  });

  const unreadCount = alerts.filter(a => !a.read).length;

  const handleMarkAsRead = (id: number) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const handleDelete = (id: number) => {
    setAlerts(alerts.filter(a => a.id !== id));
    toast.success('Thông báo đã được xóa');
  };

  const handleClearAll = () => {
    setAlerts(alerts.map(a => ({ ...a, read: true })));
    toast.success('Tất cả thông báo đã được đánh dấu là đã đọc');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-destructive/20 text-destructive border-destructive/50';
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/50';
      case 'info':
        return 'bg-primary/20 text-primary border-primary/50';
      case 'success':
        return 'bg-accent/20 text-accent border-accent/50';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'budget':
        return <Zap className="h-5 w-5" />;
      case 'expiry':
        return <Calendar className="h-5 w-5" />;
      case 'stock':
        return <TrendingDown className="h-5 w-5" />;
      case 'campaign':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cảnh báo & Thông báo</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý cảnh báo ngân sách, hết hạn, hàng tồn kho và chiến dịch
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={handleClearAll}>
              Đánh dấu tất cả đã đọc
            </Button>
          )}
          <Button
            onClick={() => setShowSettingsModal(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Settings className="h-4 w-4 mr-2" />
            Cài đặt
          </Button>
        </div>
      </div>

      {/* Alerts Summary */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          { label: 'Thông báo chưa đọc', value: unreadCount, color: 'text-primary' },
          { label: 'Cảnh báo ngân sách', value: '3', color: 'text-yellow-600' },
          { label: 'Hàng tồn kho thấp', value: '2', color: 'text-destructive' },
          { label: 'Hết hạn sắp tới', value: '1', color: 'text-orange-600' },
        ].map((stat, i) => (
          <Card key={i} className="border border-border bg-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts List */}
      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle>Lịch sử cảnh báo</CardTitle>
          <CardDescription>Tất cả cảnh báo và thông báo của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {alerts.length === 0 ? (
              <div className="py-8 text-center">
                <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Không có cảnh báo nào</p>
              </div>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border transition-all ${
                    alert.read
                      ? 'border-border bg-background/50'
                      : `border ${getSeverityColor(alert.severity)} bg-white`
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${alert.severity === 'critical' ? 'bg-destructive/20' : alert.severity === 'warning' ? 'bg-yellow-500/20' : alert.severity === 'success' ? 'bg-accent/20' : 'bg-primary/20'}`}>
                      {getTypeIcon(alert.type)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{alert.title}</h3>
                        {!alert.read && (
                          <div className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {alert.description}
                      </p>
                      <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      {!alert.read && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkAsRead(alert.id)}
                          className="text-xs"
                        >
                          Đánh dấu đã đọc
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(alert.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Settings Modal */}
      <Dialog open={showSettingsModal} onOpenChange={setShowSettingsModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Cài đặt cảnh báo</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Budget Alert */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Cảnh báo ngân sách (%)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={alertSettings.budgetThreshold}
                  onChange={(e) => setAlertSettings({ ...alertSettings, budgetThreshold: parseInt(e.target.value) })}
                  className="flex-1"
                />
                <span className="text-sm font-medium text-foreground w-12">{alertSettings.budgetThreshold}%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Cảnh báo khi ngân sách sử dụng đạt {alertSettings.budgetThreshold}%</p>
            </div>

            {/* Expiry Warning */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Cảnh báo hết hạn (ngày)
              </label>
              <input
                type="number"
                value={alertSettings.expiryWarning}
                onChange={(e) => setAlertSettings({ ...alertSettings, expiryWarning: parseInt(e.target.value) })}
                min="1"
                max="180"
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground mt-1">Cảnh báo {alertSettings.expiryWarning} ngày trước khi hết hạn</p>
            </div>

            {/* Stock Alert */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Cảnh báo hàng tồn kho thấp
              </label>
              <input
                type="number"
                value={alertSettings.stockAlert}
                onChange={(e) => setAlertSettings({ ...alertSettings, stockAlert: parseInt(e.target.value) })}
                min="1"
                max="100"
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground mt-1">Cảnh báo khi hàng tồn kho dưới {alertSettings.stockAlert}</p>
            </div>

            {/* Notification Methods */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Phương thức thông báo</p>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={alertSettings.emailNotifications}
                  onChange={(e) => setAlertSettings({ ...alertSettings, emailNotifications: e.target.checked })}
                  className="rounded border-border"
                />
                <label className="text-sm text-foreground">Thông báo qua email</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={alertSettings.pushNotifications}
                  onChange={(e) => setAlertSettings({ ...alertSettings, pushNotifications: e.target.checked })}
                  className="rounded border-border"
                />
                <label className="text-sm text-foreground">Thông báo đẩy</label>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowSettingsModal(false)}>
                Hủy
              </Button>
              <Button
                onClick={() => {
                  setShowSettingsModal(false);
                  toast.success('Cài đặt cảnh báo đã được lưu');
                }}
                className="bg-primary hover:bg-primary/90"
              >
                Lưu cài đặt
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
