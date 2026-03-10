'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit2, Trash2, Copy } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Mẫu điểm hàng ngày',
      type: 'sku',
      description: 'Quy tắc tính điểm dựa trên SKU sản phẩm',
      rules: [
        { condition: 'SKU: A001-A100', points: 1 },
        { condition: 'SKU: B001-B100', points: 2 },
        { condition: 'SKU: C001-C100', points: 5 },
      ],
      maxPerUser: 1000,
      version: '1.0',
      active: true,
    },
    {
      id: 2,
      name: 'Mẫu khuyến mãi theo thời gian',
      type: 'time',
      description: 'Tính toán điểm dựa trên khoảng thời gian',
      rules: [
        { condition: 'Thứ 2-5', multiplier: 1 },
        { condition: 'Thứ 6-7', multiplier: 2 },
        { condition: 'Chủ nhật', multiplier: 3 },
      ],
      maxPerUser: 5000,
      version: '1.1',
      active: true,
    },
    {
      id: 3,
      name: 'Mẫu quản lý chi nhánh',
      type: 'branch',
      description: 'Phân bổ điểm theo chi nhánh',
      rules: [
        { branch: 'Hà Nội', allocation: '40%' },
        { branch: 'TP.HCM', allocation: '35%' },
        { branch: 'Đà Nẵng', allocation: '25%' },
      ],
      maxPerUser: 2000,
      version: '1.0',
      active: true,
    },
    {
      id: 4,
      name: 'Mẫu giảm giá theo phòng ban',
      type: 'department',
      description: 'Áp dụng mức giảm giá khác nhau cho từng phòng',
      rules: [
        { department: 'Marketing', discount: '10%' },
        { department: 'Sales', discount: '15%' },
        { department: 'HR', discount: '5%' },
      ],
      maxPerUser: 1500,
      version: '2.0',
      active: false,
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    type: 'sku',
    description: '',
  });

  const typeLabels: Record<string, string> = {
    sku: 'Theo SKU',
    time: 'Theo thời gian',
    branch: 'Theo chi nhánh',
    department: 'Theo phòng ban',
  };

  const handleCreate = () => {
    if (!newTemplate.name.trim()) {
      toast.error('Vui lòng nhập tên mẫu');
      return;
    }

    const template = {
      id: Math.max(...templates.map(t => t.id), 0) + 1,
      ...newTemplate,
      rules: [],
      maxPerUser: 1000,
      version: '1.0',
      active: true,
    };

    setTemplates([...templates, template]);
    setNewTemplate({ name: '', type: 'sku', description: '' });
    setShowCreateModal(false);
    toast.success('Mẫu đã được tạo thành công');
  };

  const handleDelete = (id: number) => {
    setTemplates(templates.filter(t => t.id !== id));
    toast.success('Mẫu đã được xóa');
  };

  const handleToggleActive = (id: number) => {
    setTemplates(templates.map(t => 
      t.id === id ? { ...t, active: !t.active } : t
    ));
  };

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý mẫu</h1>
          <p className="text-muted-foreground mt-1">
            Tạo và quản lý các mẫu quy tắc cho các chiến dịch
          </p>
        </div>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="mt-4 md:mt-0 bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tạo mẫu mới
        </Button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card key={template.id} className={`border ${template.active ? 'border-border' : 'border-muted opacity-75'} bg-card`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <CardDescription className="text-xs mt-1">{typeLabels[template.type]}</CardDescription>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded ${
                  template.active ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'
                }`}>
                  {template.active ? 'Hoạt động' : 'Không hoạt động'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{template.description}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Rules Preview */}
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Quy tắc:</p>
                <div className="space-y-1">
                  {template.rules.slice(0, 2).map((rule, idx) => {
                    const ruleText = rule.condition || rule.branch || rule.department || 'N/A';
                    const value = rule.points || rule.multiplier || rule.allocation || rule.discount || '-';
                    return (
                      <p key={idx} className="text-xs text-muted-foreground">
                        {ruleText}: <span className="font-medium">{value}</span>
                      </p>
                    );
                  })}
                  {template.rules.length > 2 && (
                    <p className="text-xs text-muted-foreground">+{template.rules.length - 2} quy tắc khác</p>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded bg-muted/50">
                  <p className="text-muted-foreground">Max/User</p>
                  <p className="font-medium text-foreground">{template.maxPerUser.toLocaleString()}</p>
                </div>
                <div className="p-2 rounded bg-muted/50">
                  <p className="text-muted-foreground">Version</p>
                  <p className="font-medium text-foreground">{template.version}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setSelectedTemplate(template);
                    setShowEditModal(true);
                  }}
                >
                  <Edit2 className="h-3 w-3 mr-1" />
                  Chỉnh sửa
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    const copy = { ...template, id: Math.max(...templates.map(t => t.id)) + 1, name: `${template.name} (Bản sao)` };
                    setTemplates([...templates, copy]);
                    toast.success('Mẫu đã được sao chép');
                  }}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Sao chép
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleDelete(template.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Template Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tạo mẫu mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Tên mẫu *</label>
              <input
                type="text"
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                placeholder="Nhập tên mẫu"
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Loại mẫu *</label>
              <select
                value={newTemplate.type}
                onChange={(e) => setNewTemplate({ ...newTemplate, type: e.target.value })}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="sku">Theo SKU</option>
                <option value="time">Theo thời gian</option>
                <option value="branch">Theo chi nhánh</option>
                <option value="department">Theo phòng ban</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Mô tả</label>
              <textarea
                value={newTemplate.description}
                onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                placeholder="Nhập mô tả mẫu"
                rows={3}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Hủy
              </Button>
              <Button onClick={handleCreate} className="bg-primary hover:bg-primary/90">
                Tạo mẫu
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
