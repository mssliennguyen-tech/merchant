'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit2, Trash2, Users, Upload, Download, Mail } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';

const roles = [
  { id: 'admin', label: 'Admin', color: 'bg-red-500/20 text-red-600', description: 'Toàn quyền truy cập' },
  { id: 'manager', label: 'Quản lý', color: 'bg-blue-500/20 text-blue-600', description: 'Quản lý chiến dịch và báo cáo' },
  { id: 'marketing', label: 'Marketing', color: 'bg-purple-500/20 text-purple-600', description: 'Tạo chiến dịch, xem báo cáo' },
  { id: 'viewer', label: 'Xem', color: 'bg-gray-500/20 text-gray-600', description: 'Chỉ xem báo cáo' },
];

const permissions = [
  { id: 'campaigns.create', label: 'Tạo chiến dịch' },
  { id: 'campaigns.edit', label: 'Chỉnh sửa chiến dịch' },
  { id: 'campaigns.delete', label: 'Xóa chiến dịch' },
  { id: 'reports.view', label: 'Xem báo cáo' },
  { id: 'rewards.manage', label: 'Quản lý phần thưởng' },
  { id: 'wallet.view', label: 'Xem ví điểm' },
  { id: 'wallet.manage', label: 'Quản lý ví điểm' },
  { id: 'users.manage', label: 'Quản lý người dùng' },
  { id: 'settings.view', label: 'Xem cài đặt' },
  { id: 'settings.manage', label: 'Quản lý cài đặt' },
];

export default function UsersPage() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'a@example.com',
      role: 'admin',
      status: 'active',
      joinDate: '2024-01-15',
      lastLogin: '2 giờ trước',
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'b@example.com',
      role: 'manager',
      status: 'active',
      joinDate: '2024-02-20',
      lastLogin: '1 ngày trước',
    },
    {
      id: 3,
      name: 'Lê Văn C',
      email: 'c@example.com',
      role: 'marketing',
      status: 'active',
      joinDate: '2024-03-10',
      lastLogin: '30 phút trước',
    },
    {
      id: 4,
      name: 'Phạm Thị D',
      email: 'd@example.com',
      role: 'viewer',
      status: 'inactive',
      joinDate: '2024-03-25',
      lastLogin: '7 ngày trước',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'viewer',
    password: '',
    permissions: [] as string[],
  });

  const filteredUsers = users.filter(u => {
    const matchesSearch = !searchTerm || 
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      toast.error('Vui lòng điền tất cả thông tin');
      return;
    }
    const user = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Chưa đăng nhập',
    };
    setUsers([...users, user]);
    setShowAddModal(false);
    setNewUser({ name: '', email: '', role: 'viewer', password: '', permissions: [] });
    toast.success('Người dùng đã được thêm thành công');
  };

  const handleEditUser = () => {
    if (!selectedUser.name || !selectedUser.email) {
      toast.error('Vui lòng điền tất cả thông tin');
      return;
    }
    setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u));
    setShowEditModal(false);
    toast.success('Người dùng đã được cập nhật');
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
    toast.success('Người dùng đã được xóa');
  };

  const getRoleLabel = (roleId: string) => {
    return roles.find(r => r.id === roleId)?.label || roleId;
  };

  const getRoleColor = (roleId: string) => {
    return roles.find(r => r.id === roleId)?.color || '';
  };

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý Người dùng</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý tài khoản nhân viên và phân quyền truy cập
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" onClick={() => setShowImportModal(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Nhập danh sách
          </Button>
          <Button onClick={() => setShowAddModal(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Thêm người dùng
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <select 
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm"
        >
          <option value="">Tất cả vai trò</option>
          {roles.map(r => (
            <option key={r.id} value={r.id}>{r.label}</option>
          ))}
        </select>
        <input
          type="search"
          placeholder="Tìm kiếm theo tên hoặc email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm w-full sm:w-64"
        />
      </div>

      {/* Users Table */}
      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle>Danh sách người dùng</CardTitle>
          <CardDescription>Tổng cộng {filteredUsers.length} người dùng</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Người dùng</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Vai trò</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Trạng thái</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Đăng nhập lần cuối</th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">Tác vụ</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {user.id}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getRoleColor(user.role)}`}>
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.status === 'active'
                          ? 'bg-green-500/20 text-green-600'
                          : 'bg-gray-500/20 text-gray-600'
                      }`}>
                        {user.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-sm">{user.lastLogin}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setShowEditModal(true);
                          }}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteUser(user.id)}
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

          {filteredUsers.length === 0 && (
            <div className="py-12 text-center">
              <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Không tìm thấy người dùng nào</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add User Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Thêm người dùng mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Họ tên *</label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Nhập họ tên"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Nhập email"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Vai trò</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {roles.map(r => (
                    <option key={r.id} value={r.id}>{r.label} - {r.description}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Mật khẩu tạm thời</label>
                <input
                  type="text"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Để trống để tạo tự động"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Quyền hạn</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 border border-border rounded-lg bg-background">
                {permissions.map(p => (
                  <label key={p.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newUser.permissions.includes(p.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewUser({ ...newUser, permissions: [...newUser.permissions, p.id] });
                        } else {
                          setNewUser({ ...newUser, permissions: newUser.permissions.filter(perm => perm !== p.id) });
                        }
                      }}
                      className="rounded"
                    />
                    <span className="text-sm text-foreground">{p.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <Button variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">
                Hủy
              </Button>
              <Button onClick={handleAddUser} className="flex-1 bg-primary hover:bg-primary/90">
                Thêm người dùng
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
            <DialogDescription>{selectedUser?.email}</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Họ tên *</label>
                <input
                  type="text"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Vai trò</label>
                  <select
                    value={selectedUser.role}
                    onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {roles.map(r => (
                      <option key={r.id} value={r.id}>{r.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Trạng thái</label>
                  <select
                    value={selectedUser.status}
                    onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setShowEditModal(false)} className="flex-1">
                  Hủy
                </Button>
                <Button onClick={handleEditUser} className="flex-1 bg-primary hover:bg-primary/90">
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Import Modal */}
      <Dialog open={showImportModal} onOpenChange={setShowImportModal}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Nhập danh sách người dùng</DialogTitle>
            <DialogDescription>
              Tải lên file CSV hoặc Excel với cột: Họ tên, Email, Vai trò
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">Kéo file vào đây hoặc click để chọn</p>
              <p className="text-xs text-muted-foreground mt-1">Hỗ trợ CSV, XLSX, XLS</p>
              <input type="file" className="hidden" accept=".csv,.xlsx,.xls" />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  toast.success('Đã tải xuống mẫu');
                }}
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-2" />
                Tải mẫu
              </Button>
              <Button
                onClick={() => {
                  toast.success('Đang nhập dữ liệu...');
                  setTimeout(() => {
                    toast.success('Nhập 5 người dùng thành công');
                    setShowImportModal(false);
                  }, 1500);
                }}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Nhập
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Role Reference Card */}
      <Card className="mt-8 border border-border bg-card">
        <CardHeader>
          <CardTitle>Hướng dẫn Vai trò</CardTitle>
          <CardDescription>Mô tả quyền hạn của từng vai trò</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {roles.map(role => (
              <div key={role.id} className="p-4 border border-border rounded-lg">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium mb-2 ${role.color}`}>
                  {role.label}
                </span>
                <p className="text-sm text-muted-foreground">{role.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
