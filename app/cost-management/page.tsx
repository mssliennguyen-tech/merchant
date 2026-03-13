'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit2, Save, X } from 'lucide-react';
import { toast } from 'sonner';

interface MessageCost {
  id: string;
  method: 'SMS' | 'Zalo';
  costPerMessage: number;
  currency: 'VND' | 'USD';
  active: boolean;
  lastUpdated: string;
}

interface CostHistory {
  id: string;
  date: string;
  method: string;
  oldCost: number;
  newCost: number;
  changedBy: string;
}

export default function CostManagementPage() {
  const [messageCosts, setMessageCosts] = useState<MessageCost[]>([
    {
      id: '1',
      method: 'SMS',
      costPerMessage: 500,
      currency: 'VND',
      active: true,
      lastUpdated: '2024-03-08 14:30:00',
    },
    {
      id: '2',
      method: 'Zalo',
      costPerMessage: 300,
      currency: 'VND',
      active: true,
      lastUpdated: '2024-03-08 14:30:00',
    },
  ]);

  const [costHistory, setCostHistory] = useState<CostHistory[]>([
    {
      id: '1',
      date: '2024-03-08 14:30:00',
      method: 'SMS',
      oldCost: 400,
      newCost: 500,
      changedBy: 'Admin',
    },
    {
      id: '2',
      date: '2024-03-07 10:15:00',
      method: 'Zalo',
      oldCost: 250,
      newCost: 300,
      changedBy: 'Admin',
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ [key: string]: number }>({});

  const handleEdit = (cost: MessageCost) => {
    setEditingId(cost.id);
    setEditValues({ [cost.id]: cost.costPerMessage });
  };

  const handleSave = (cost: MessageCost) => {
    const newCost = editValues[cost.id];
    if (newCost === undefined || newCost < 0) {
      toast.error('Vui lòng nhập giá trị hợp lệ');
      return;
    }

    const oldCost = cost.costPerMessage;
    setMessageCosts(
      messageCosts.map((c) =>
        c.id === cost.id ? { ...c, costPerMessage: newCost, lastUpdated: new Date().toLocaleString('vi-VN') } : c
      )
    );

    setCostHistory([
      {
        id: (costHistory.length + 1).toString(),
        date: new Date().toLocaleString('vi-VN'),
        method: cost.method,
        oldCost: oldCost,
        newCost: newCost,
        changedBy: 'Admin',
      },
      ...costHistory,
    ]);

    setEditingId(null);
    toast.success(`Cập nhật chi phí ${cost.method} thành công!`);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValues({});
  };

  const calculateTotalMessages = () => {
    // This would be calculated from actual data
    return 15234;
  };

  const calculateTotalCost = () => {
    return messageCosts.reduce((sum, cost) => sum + cost.costPerMessage, 0);
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Quản lý chi phí tin nhắn</h1>
        <p className="text-muted-foreground mt-1">
          Cấu hình chi phí gửi tin nhắn cho các phương thức khác nhau
        </p>
      </div>

      {/* Cost Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="border border-border bg-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Chi phí SMS</p>
              <p className="text-3xl font-bold text-foreground">
                {messageCosts.find((c) => c.method === 'SMS')?.costPerMessage.toLocaleString('vi-VN')} VND
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Chi phí Zalo</p>
              <p className="text-3xl font-bold text-foreground">
                {messageCosts.find((c) => c.method === 'Zalo')?.costPerMessage.toLocaleString('vi-VN')} VND
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Tổng tin nhắn đã gửi</p>
              <p className="text-3xl font-bold text-foreground">
                {calculateTotalMessages().toLocaleString('vi-VN')}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-accent/10">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Tổng chi phí tối thiểu/tin</p>
              <p className="text-3xl font-bold text-accent">
                {calculateTotalCost().toLocaleString('vi-VN')} VND
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messaging Costs Table */}
      <Card className="border border-border bg-card mb-8">
        <CardHeader>
          <CardTitle>Chi phí gửi tin nhắn</CardTitle>
          <CardDescription>Quản lý giá cước cho từng phương thức gửi tin nhắn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border">
                  <TableHead className="text-foreground">Phương thức</TableHead>
                  <TableHead className="text-foreground">Chi phí mỗi tin</TableHead>
                  <TableHead className="text-foreground">Tên tiền tệ</TableHead>
                  <TableHead className="text-foreground">Trạng thái</TableHead>
                  <TableHead className="text-foreground">Cập nhật lần cuối</TableHead>
                  <TableHead className="text-foreground text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messageCosts.map((cost) => (
                  <TableRow key={cost.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium text-foreground">{cost.method}</TableCell>
                    <TableCell className="text-foreground">
                      {editingId === cost.id ? (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            value={editValues[cost.id] || ''}
                            onChange={(e) =>
                              setEditValues({ ...editValues, [cost.id]: parseInt(e.target.value) || 0 })
                            }
                            className="w-32 border-border bg-background text-foreground"
                          />
                          <span className="text-sm text-muted-foreground">VND</span>
                        </div>
                      ) : (
                        `${cost.costPerMessage.toLocaleString('vi-VN')} ${cost.currency}`
                      )}
                    </TableCell>
                    <TableCell className="text-foreground">{cost.currency}</TableCell>
                    <TableCell>
                      <Badge className={cost.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {cost.active ? 'Kích hoạt' : 'Vô hiệu'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{cost.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      {editingId === cost.id ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleSave(cost)}
                            className="text-green-600 hover:text-green-700 hover:bg-green-100"
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleCancel}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(cost)}
                          className="text-primary hover:text-primary hover:bg-primary/10"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Cost History */}
      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle>Lịch sử thay đổi chi phí</CardTitle>
          <CardDescription>Theo dõi tất cả những thay đổi giá cước tin nhắn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border">
                  <TableHead className="text-foreground">Ngày giờ</TableHead>
                  <TableHead className="text-foreground">Phương thức</TableHead>
                  <TableHead className="text-foreground">Chi phí cũ</TableHead>
                  <TableHead className="text-foreground">Chi phí mới</TableHead>
                  <TableHead className="text-foreground">Thay đổi</TableHead>
                  <TableHead className="text-foreground">Người thay đổi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {costHistory.map((history) => {
                  const change = history.newCost - history.oldCost;
                  const changePercent = ((change / history.oldCost) * 100).toFixed(1);
                  return (
                    <TableRow key={history.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <TableCell className="text-sm text-muted-foreground">{history.date}</TableCell>
                      <TableCell className="font-medium text-foreground">{history.method}</TableCell>
                      <TableCell className="text-foreground">{history.oldCost.toLocaleString('vi-VN')} VND</TableCell>
                      <TableCell className="text-foreground">{history.newCost.toLocaleString('vi-VN')} VND</TableCell>
                      <TableCell>
                        <Badge className={change > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                          {change > 0 ? '+' : ''}
                          {change.toLocaleString('vi-VN')} VND ({changePercent}%)
                        </Badge>
                      </TableCell>
                      <TableCell className="text-foreground">{history.changedBy}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
