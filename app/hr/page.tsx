'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Edit2, Upload, Download, Mail } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function HRPage() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyena@example.com',
      department: 'Marketing',
      position: 'Quản lý',
      status: 'active',
      joinDate: '2023-01-15',
      pointsBalance: 5000,
      walletBudget: 10000,
    },
    {
      id: 2,
      name: 'Trần Thị B',
      email: 'thib@example.com',
      department: 'Sales',
      position: 'Nhân viên bán hàng',
      status: 'active',
      joinDate: '2023-06-20',
      pointsBalance: 3500,
      walletBudget: 7000,
    },
    {
      id: 3,
      name: 'Phạm Minh C',
      email: 'minhc@example.com',
      department: 'HR',
      position: 'Chuyên viên tuyển dụng',
      status: 'active',
      joinDate: '2022-11-10',
      pointsBalance: 2000,
      walletBudget: 5000,
    },
    {
      id: 4,
      name: 'Hoàng Anh D',
      email: 'anhd@example.com',
      department: 'Finance',
      position: 'Kế toán',
      status: 'inactive',
      joinDate: '2023-03-05',
      pointsBalance: 1500,
      walletBudget: 3000,
    },
  ]);

  const [departments, setDepartments] = useState([
    { id: 1, name: 'Marketing', budget: 50000, employees: 5, pointsIssued: 12500 },
    { id: 2, name: 'Sales', budget: 80000, employees: 12, pointsIssued: 28000 },
    { id: 3, name: 'HR', budget: 30000, employees: 3, pointsIssued: 5000 },
    { id: 4, name: 'Finance', budget: 25000, employees: 2, pointsIssued: 3500 },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [activeTab, setActiveTab] = useState('employees');
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    department: 'Marketing',
    position: '',
    walletBudget: 5000,
  });

  const handleAddEmployee = () => {
    if (!newEmployee.name.trim() || !newEmployee.email.trim()) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const employee = {
      id: Math.max(...employees.map(e => e.id), 0) + 1,
      ...newEmployee,
      status: 'active',
      joinDate: new Date().toISOString().split('T')[0],
      pointsBalance: 0,
    };

    setEmployees([...employees, employee]);
    setNewEmployee({ name: '', email: '', department: 'Marketing', position: '', walletBudget: 5000 });
    setShowAddModal(false);
    toast.success('Nhân viên đã được thêm');
  };

  const handleDelete = (id: number) => {
    setEmployees(employees.filter(e => e.id !== id));
    toast.success('Nhân viên đã được xóa');
  };

  const handleImportCSV = () => {
    toast.success('Dữ liệu mẫu được tải về. Vui lòng điền thông tin và tải lên');
  };

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý Nhân sự</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý nhân viên, phòng ban và phân bổ ngân sách
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          {activeTab === 'employees' && (
            <>
              <Button 
                variant="outline"
                onClick={() => setShowImportModal(true)}
              >
                <Upload className="h-4 w-4 mr-2" />
                Tải lên CSV
              </Button>
              <Button 
                onClick={() => setShowAddModal(true)}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm nhân viên
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b border-border">
        <button
          onClick={() => setActiveTab('employees')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'employees'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Nhân viên ({employees.length})
        </button>
        <button
          onClick={() => setActiveTab('departments')}
          className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'departments'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Phòng ban ({departments.length})
        </button>
      </div>

      {/* Employees Tab */}
      {activeTab === 'employees' && (
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle>Danh sách nhân viên</CardTitle>
            <CardDescription>Quản lý nhân viên và phân bổ ngân sách</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Tên nhân viên</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Phòng ban</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Chức vụ</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Trạng thái</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Điểm / Ngân sách</th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">Tác vụ</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-foreground">{emp.name}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{emp.email}</td>
                      <td className="px-4 py-3 text-foreground">{emp.department}</td>
                      <td className="px-4 py-3 text-foreground">{emp.position}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          emp.status === 'active'
                            ? 'bg-accent/20 text-accent'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {emp.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-foreground text-xs">
                        <p className="font-medium">{emp.pointsBalance.toLocaleString()} / {emp.walletBudget.toLocaleString()}</p>
                        <div className="h-1.5 w-20 rounded-full bg-muted mt-1 overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{ width: `${(emp.pointsBalance / emp.walletBudget) * 100}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="sm"><Mail className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="sm"><Edit2 className="h-4 w-4" /></Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(emp.id)}
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
          </CardContent>
        </Card>
      )}

      {/* Departments Tab */}
      {activeTab === 'departments' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {departments.map((dept) => {
            const budgetUsed = dept.pointsIssued;
            const budgetPercentage = (budgetUsed / dept.budget) * 100;

            return (
              <Card key={dept.id} className="border border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-lg">{dept.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Nhân viên</p>
                      <p className="text-2xl font-bold text-foreground">{dept.employees}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Điểm cấp</p>
                      <p className="text-2xl font-bold text-foreground">{(dept.pointsIssued / 1000).toFixed(1)}K</p>
                    </div>
                  </div>

                  {/* Budget Usage */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-foreground">Ngân sách</p>
                      <p className="text-sm text-muted-foreground">
                        {budgetUsed.toLocaleString()} / {dept.budget.toLocaleString()}
                      </p>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full ${budgetPercentage > 80 ? 'bg-destructive' : 'bg-primary'}`}
                        style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{budgetPercentage.toFixed(1)}% sử dụng</p>
                  </div>

                  <Button variant="outline" className="w-full">
                    Quản lý phòng ban
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add Employee Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Thêm nhân viên mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Tên nhân viên *</label>
              <input
                type="text"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                placeholder="Nhập tên nhân viên"
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
              <input
                type="email"
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                placeholder="Nhập email"
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phòng ban *</label>
              <select
                value={newEmployee.department}
                onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Chức vụ</label>
              <input
                type="text"
                value={newEmployee.position}
                onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                placeholder="Nhập chức vụ"
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Ngân sách ví</label>
              <input
                type="number"
                value={newEmployee.walletBudget}
                onChange={(e) => setNewEmployee({ ...newEmployee, walletBudget: parseInt(e.target.value) })}
                className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Hủy
              </Button>
              <Button onClick={handleAddEmployee} className="bg-primary hover:bg-primary/90">
                Thêm nhân viên
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Import CSV Modal */}
      <Dialog open={showImportModal} onOpenChange={setShowImportModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tải lên CSV</DialogTitle>
            <DialogDescription>
              Nhập danh sách nhân viên từ file CSV
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              File CSV phải có các cột: Tên, Email, Phòng ban, Chức vụ, Ngân sách
            </p>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm font-medium text-foreground mb-1">Kéo thả file vào đây</p>
              <p className="text-xs text-muted-foreground">hoặc nhấp để chọn file</p>
            </div>
            <div className="flex gap-3 justify-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  handleImportCSV();
                  setShowImportModal(false);
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Tải mẫu
              </Button>
              <Button onClick={() => setShowImportModal(false)} className="bg-primary hover:bg-primary/90">
                Tải lên
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
