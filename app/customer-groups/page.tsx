'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit2, Trash2, Users, Upload, Download, Eye } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface CustomerGroup {
  id: number;
  name: string;
  description: string;
  customerCount: number;
  createdDate: string;
  lastModified: string;
  status: 'active' | 'inactive';
}

export default function CustomerGroupsPage() {
  const [groups, setGroups] = useState<CustomerGroup[]>([
    {
      id: 1,
      name: 'VIP Customers',
      description: 'Khách hàng VIP cấp cao',
      customerCount: 245,
      createdDate: '2024-01-15',
      lastModified: '2024-03-10',
      status: 'active',
    },
    {
      id: 2,
      name: 'New Customers',
      description: 'Khách hàng mới đăng ký trong 3 tháng',
      customerCount: 1203,
      createdDate: '2024-02-20',
      lastModified: '2024-03-12',
      status: 'active',
    },
    {
      id: 3,
      name: 'Inactive Users',
      description: 'Khách hàng không hoạt động hơn 3 tháng',
      customerCount: 567,
      createdDate: '2024-01-10',
      lastModified: '2024-03-08',
      status: 'active',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<CustomerGroup | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const filteredGroups = groups.filter(g =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateGroup = () => {
    if (!formData.name.trim()) {
      toast.error('Vui lòng nhập tên nhóm');
      return;
    }

    const newGroup: CustomerGroup = {
      id: Math.max(...groups.map(g => g.id)) + 1,
      name: formData.name,
      description: formData.description,
      customerCount: 0,
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      status: 'active',
    };

    setGroups([...groups, newGroup]);
    setFormData({ name: '', description: '' });
    setShowCreateModal(false);
    toast.success('Nhóm khách hàng đã được tạo thành công');
  };

  const handleEditGroup = () => {
    if (!formData.name.trim()) {
      toast.error('Vui lòng nhập tên nhóm');
      return;
    }

    setGroups(
      groups.map(g =>
        g.id === selectedGroup?.id
          ? {
              ...g,
              name: formData.name,
              description: formData.description,
              lastModified: new Date().toISOString().split('T')[0],
            }
          : g
      )
    );
    setFormData({ name: '', description: '' });
    setShowEditModal(false);
    setSelectedGroup(null);
    toast.success('Nhóm khách hàng đã được cập nhật');
  };

  const handleDeleteGroup = (id: number) => {
    setGroups(groups.filter(g => g.id !== id));
    toast.success('Nhóm khách hàng đã được xóa');
  };

  const openEditModal = (group: CustomerGroup) => {
    setSelectedGroup(group);
    setFormData({ name: group.name, description: group.description });
    setShowEditModal(true);
  };

  const openViewModal = (group: CustomerGroup) => {
    setSelectedGroup(group);
    setShowViewModal(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!selectedGroup) {
      toast.error('Vui lòng chọn nhóm trước');
      return;
    }

    // Simulate file upload
    const reader = new FileReader();
    reader.onload = () => {
      const lines = (reader.result as string).split('\n').filter(line => line.trim());
      const customerCount = lines.length - 1; // Exclude header

      if (customerCount <= 0) {
        toast.error('File không chứa dữ liệu hợp lệ');
        return;
      }

      setGroups(
        groups.map(g =>
          g.id === selectedGroup.id
            ? {
                ...g,
                customerCount: g.customerCount + customerCount,
                lastModified: new Date().toISOString().split('T')[0],
              }
            : g
        )
      );

      toast.success(`Đã thêm ${customerCount} khách hàng vào nhóm`);
      setShowUploadModal(false);
    };
    reader.readAsText(file);
  };

  const downloadTemplate = () => {
    const template = 'customer_id,email,phone,name\n1001,customer1@example.com,0123456789,Nguyễn Văn A\n1002,customer2@example.com,0987654321,Trần Thị B';
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(template));
    element.setAttribute('download', 'customer_template.csv');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Đã tải xuống mẫu file');
  };

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Nhóm Khách Hàng</h1>
          <p className="text-muted-foreground mt-1">
            Tạo và quản lý các nhóm khách hàng cho chiến dịch
          </p>
        </div>
        <Button onClick={() => {
          setFormData({ name: '', description: '' });
          setShowCreateModal(true);
        }} className="mt-4 md:mt-0 bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Tạo nhóm mới
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="search"
          placeholder="Tìm kiếm nhóm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm w-full sm:flex-1"
        />
      </div>

      {/* Customer Groups Table */}
      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle>Quản lý nhóm khách hàng</CardTitle>
          <CardDescription>Danh sách tất cả các nhóm khách hàng đã tạo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Tên nhóm
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Mô tả
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Số khách hàng
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Ngày tạo
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Cập nhật lần cuối
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Trạng thái
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                    Tác vụ
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredGroups.map((group) => (
                  <tr
                    key={group.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <p className="font-medium text-foreground">{group.name}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-sm">
                      {group.description || '-'}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-foreground">
                        {group.customerCount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-sm">
                      {group.createdDate}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-sm">
                      {group.lastModified}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-accent/20 text-accent">
                        {group.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openViewModal(group)}
                          title="Xem chi tiết"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedGroup(group);
                            setShowUploadModal(true);
                          }}
                          title="Tải lên danh sách"
                        >
                          <Upload className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(group)}
                          title="Chỉnh sửa"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteGroup(group.id)}
                          title="Xóa"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredGroups.length === 0 && (
            <div className="py-12 text-center">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Không có nhóm khách hàng nào</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Group Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tạo nhóm khách hàng mới</DialogTitle>
            <DialogDescription>
              Nhập thông tin chi tiết cho nhóm khách hàng mới
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tên nhóm *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ví dụ: VIP Customers"
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Mô tả
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Mô tả về nhóm khách hàng này"
                rows={3}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Hủy
              </Button>
              <Button onClick={handleCreateGroup} className="bg-primary hover:bg-primary/90">
                Tạo nhóm
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Group Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa nhóm khách hàng</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin chi tiết của nhóm
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tên nhóm *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Mô tả
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowEditModal(false)}>
                Hủy
              </Button>
              <Button onClick={handleEditGroup} className="bg-primary hover:bg-primary/90">
                Lưu thay đổi
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Modal */}
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tải lên danh sách khách hàng</DialogTitle>
            <DialogDescription>
              Tải lên danh sách khách hàng cho nhóm: <strong>{selectedGroup?.name}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Kéo thả file CSV hoặc Excel vào đây
              </p>
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Button variant="outline" className="mb-2" asChild>
                  <span>Chọn file</span>
                </Button>
              </label>
              <p className="text-xs text-muted-foreground">
                Hỗ trợ CSV, XLSX (tối đa 50MB)
              </p>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm font-medium text-foreground mb-2">Định dạng file:</p>
              <p className="text-xs text-muted-foreground mb-3">
                File phải chứa các cột: customer_id, email, phone, name
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadTemplate}
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Tải mẫu file
              </Button>
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowUploadModal(false)}>
                Hủy
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                Hoàn tất
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chi tiết nhóm khách hàng</DialogTitle>
          </DialogHeader>
          {selectedGroup && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Tên nhóm</p>
                  <p className="font-medium text-foreground">{selectedGroup.name}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Số khách hàng</p>
                  <p className="font-medium text-foreground">{selectedGroup.customerCount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Ngày tạo</p>
                  <p className="font-medium text-foreground">{selectedGroup.createdDate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Cập nhật lần cuối</p>
                  <p className="font-medium text-foreground">{selectedGroup.lastModified}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Mô tả</p>
                <p className="text-sm text-foreground">{selectedGroup.description || '-'}</p>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowViewModal(false)}
              >
                Đóng
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
