'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Eye, EyeOff, Plus, Trash2, Settings, Check, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState('api-keys');
  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: 'Production API Key',
      key: 'pk_live_c0d3s0m3th1ng',
      status: 'active',
      lastUsed: '2 giờ trước',
      createdAt: '2024-01-15',
      showKey: false,
    },
    {
      id: 2,
      name: 'Development API Key',
      key: 'pk_test_d3v3l0pm3nt',
      status: 'active',
      lastUsed: '30 phút trước',
      createdAt: '2023-12-01',
      showKey: false,
    },
  ]);

  const [webhooks, setWebhooks] = useState([
    {
      id: 1,
      url: 'https://example.com/webhooks/points',
      event: 'points.issued',
      status: 'active',
      lastDelivery: '1 giờ trước',
      deliveryRate: '99.8%',
    },
    {
      id: 2,
      url: 'https://example.com/webhooks/redemption',
      event: 'reward.redeemed',
      status: 'active',
      lastDelivery: '30 phút trước',
      deliveryRate: '99.5%',
    },
  ]);

  const [showCreateKeyModal, setShowCreateKeyModal] = useState(false);
  const [showCreateWebhookModal, setShowCreateWebhookModal] = useState(false);
  const [newKey, setNewKey] = useState({ name: '' });
  const [newWebhook, setNewWebhook] = useState({ url: '', event: 'points.issued' });

  const handleCreateKey = () => {
    if (!newKey.name.trim()) {
      toast.error('Vui lòng nhập tên khóa');
      return;
    }

    const key = {
      id: Math.max(...apiKeys.map(k => k.id), 0) + 1,
      name: newKey.name,
      key: `pk_${Math.random().toString(36).substr(2, 9)}`,
      status: 'active',
      lastUsed: 'Chưa bao giờ',
      createdAt: new Date().toISOString().split('T')[0],
      showKey: true,
    };

    setApiKeys([...apiKeys, key]);
    setNewKey({ name: '' });
    setShowCreateKeyModal(false);
    toast.success('Khóa API đã được tạo');
  };

  const handleCreateWebhook = () => {
    if (!newWebhook.url.trim()) {
      toast.error('Vui lòng nhập URL webhook');
      return;
    }

    const webhook = {
      id: Math.max(...webhooks.map(w => w.id), 0) + 1,
      url: newWebhook.url,
      event: newWebhook.event,
      status: 'active',
      lastDelivery: 'Chưa bao giờ',
      deliveryRate: '0%',
    };

    setWebhooks([...webhooks, webhook]);
    setNewWebhook({ url: '', event: 'points.issued' });
    setShowCreateWebhookModal(false);
    toast.success('Webhook đã được tạo');
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success('Khóa đã được sao chép vào clipboard');
  };

  const handleToggleShowKey = (id: number) => {
    setApiKeys(apiKeys.map(k => k.id === id ? { ...k, showKey: !k.showKey } : k));
  };

  const handleDeleteKey = (id: number) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
    toast.success('Khóa API đã được xóa');
  };

  const handleDeleteWebhook = (id: number) => {
    setWebhooks(webhooks.filter(w => w.id !== id));
    toast.success('Webhook đã được xóa');
  };

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Cài đặt & Tích hợp</h1>
        <p className="text-muted-foreground mt-1">
          Quản lý khóa API, webhook và tích hợp CRM
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab('api-keys')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'api-keys'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Khóa API
        </button>
        <button
          onClick={() => setActiveTab('webhooks')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'webhooks'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Webhooks
        </button>
        <button
          onClick={() => setActiveTab('integrations')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'integrations'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Tích hợp
        </button>
      </div>

      {/* API Keys Tab */}
      {activeTab === 'api-keys' && (
        <div className="space-y-6">
          <div className="flex gap-2 justify-end">
            <Button
              onClick={() => setShowCreateKeyModal(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tạo khóa mới
            </Button>
          </div>

          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle>Khóa API của bạn</CardTitle>
              <CardDescription>Quản lý các khóa API để truy cập API của chúng tôi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="p-4 rounded-lg border border-border bg-background">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{apiKey.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Tạo: {apiKey.createdAt} | Sử dụng lần cuối: {apiKey.lastUsed}
                        </p>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        apiKey.status === 'active'
                          ? 'bg-accent/20 text-accent'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {apiKey.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                      </span>
                    </div>

                    {/* API Key Display */}
                    <div className="mb-4 p-3 rounded bg-muted/50 flex items-center justify-between font-mono text-sm">
                      <span className="text-foreground">
                        {apiKey.showKey ? apiKey.key : '••••' + apiKey.key.slice(-8)}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleToggleShowKey(apiKey.id)}
                        >
                          {apiKey.showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopyKey(apiKey.key)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="h-4 w-4 mr-2" />
                        Cài đặt
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteKey(apiKey.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Webhooks Tab */}
      {activeTab === 'webhooks' && (
        <div className="space-y-6">
          <div className="flex gap-2 justify-end">
            <Button
              onClick={() => setShowCreateWebhookModal(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tạo Webhook
            </Button>
          </div>

          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
              <CardDescription>Nhận thông báo theo thời gian thực về các sự kiện</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {webhooks.map((webhook) => (
                  <div key={webhook.id} className="p-4 rounded-lg border border-border bg-background">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{webhook.url}</h3>
                          <Check className="h-4 w-4 text-accent" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Sự kiện: <span className="font-medium">{webhook.event}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Gửi lần cuối: {webhook.lastDelivery} | Tỷ lệ thành công: {webhook.deliveryRate}
                        </p>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        webhook.status === 'active'
                          ? 'bg-accent/20 text-accent'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {webhook.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="h-4 w-4 mr-2" />
                        Cài đặt
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Xem nhật ký
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteWebhook(webhook.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              name: 'Shopify',
              description: 'Tích hợp cửa hàng Shopify của bạn',
              icon: '🛍️',
              status: 'connected',
            },
            {
              name: 'WooCommerce',
              description: 'Tích hợp với WooCommerce',
              icon: '📦',
              status: 'not-connected',
            },
            {
              name: 'Stripe',
              description: 'Tích hợp thanh toán Stripe',
              icon: '💳',
              status: 'not-connected',
            },
            {
              name: 'HubSpot CRM',
              description: 'Đồng bộ dữ liệu khách hàng',
              icon: '🔗',
              status: 'connected',
            },
            {
              name: 'Salesforce',
              description: 'Tích hợp Salesforce CRM',
              icon: '☁️',
              status: 'not-connected',
            },
            {
              name: 'Zapier',
              description: 'Kết nối 5000+ ứng dụng',
              icon: '⚡',
              status: 'not-connected',
            },
          ].map((integration, i) => (
            <Card key={i} className="border border-border bg-card">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{integration.icon}</div>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    integration.status === 'connected'
                      ? 'bg-accent/20 text-accent'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {integration.status === 'connected' ? 'Đã kết nối' : 'Chưa kết nối'}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{integration.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>
                <Button variant="outline" className="w-full">
                  {integration.status === 'connected' ? 'Cài đặt' : 'Kết nối'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create API Key Modal */}
      <Dialog open={showCreateKeyModal} onOpenChange={setShowCreateKeyModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tạo khóa API mới</DialogTitle>
            <DialogDescription>
              Tạo một khóa API mới để truy cập API MyPoint Merchant
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Tên khóa *</label>
              <input
                type="text"
                value={newKey.name}
                onChange={(e) => setNewKey({ ...newKey, name: e.target.value })}
                placeholder="ví dụ: Production API Key"
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="p-3 rounded bg-yellow-500/10 border border-yellow-500/30 flex gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-yellow-700">
                Giữ khóa API của bạn bí mật. Không chia sẻ với bất kỳ ai.
              </p>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowCreateKeyModal(false)}>
                Hủy
              </Button>
              <Button onClick={handleCreateKey} className="bg-primary hover:bg-primary/90">
                Tạo khóa
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Webhook Modal */}
      <Dialog open={showCreateWebhookModal} onOpenChange={setShowCreateWebhookModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tạo Webhook mới</DialogTitle>
            <DialogDescription>
              Nhận thông báo sự kiện theo thời gian thực
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">URL Webhook *</label>
              <input
                type="url"
                value={newWebhook.url}
                onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
                placeholder="https://example.com/webhooks"
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Sự kiện *</label>
              <select
                value={newWebhook.event}
                onChange={(e) => setNewWebhook({ ...newWebhook, event: e.target.value })}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="points.issued">Điểm được phát hành</option>
                <option value="points.redeemed">Điểm được sử dụng</option>
                <option value="reward.redeemed">Phần thưởng được quy đổi</option>
                <option value="campaign.created">Chiến dịch được tạo</option>
                <option value="campaign.ended">Chiến dịch kết thúc</option>
              </select>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowCreateWebhookModal(false)}>
                Hủy
              </Button>
              <Button onClick={handleCreateWebhook} className="bg-primary hover:bg-primary/90">
                Tạo Webhook
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
