'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit2, Trash2, BarChart3, Copy, Pause, Play, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Khuyến mãi hè',
      status: 'active',
      points: 450000,
      pointsCap: 500000,
      customers: 3421,
      engagement: 78,
      burnRate: 12.5,
      startDate: '1 tháng 6, 2024',
      endDate: '31 tháng 8, 2024',
    },
    {
      id: 2,
      name: 'Thưởng sinh nhật',
      status: 'active',
      points: 320000,
      pointsCap: 400000,
      customers: 2156,
      engagement: 65,
      burnRate: 8.2,
      startDate: '1 tháng 1, 2024',
      endDate: '31 tháng 12, 2024',
    },
    {
      id: 3,
      name: 'Chương trình giới thiệu',
      status: 'draft',
      points: 210000,
      pointsCap: 300000,
      customers: 890,
      engagement: 42,
      burnRate: 5.1,
      startDate: '15 tháng 7, 2024',
      endDate: '15 tháng 9, 2024',
    },
    {
      id: 4,
      name: 'VIP Độc quyền',
      status: 'paused',
      points: 180000,
      pointsCap: 250000,
      customers: 234,
      engagement: 91,
      burnRate: 14.3,
      startDate: '1 tháng 5, 2024',
      endDate: '31 tháng 5, 2024',
    },
    {
      id: 5,
      name: 'Khuyến mãi Tết',
      status: 'closed',
      points: 150000,
      pointsCap: 200000,
      customers: 456,
      engagement: 56,
      burnRate: 10.2,
      startDate: '20 tháng 1, 2024',
      endDate: '28 tháng 2, 2024',
    },
  ]);

  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [showCloneModal, setShowCloneModal] = useState(false);

  const filteredCampaigns = campaigns.filter(c => {
    const matchesStatus = !statusFilter || c.status === statusFilter;
    const matchesSearch = !searchTerm || c.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleTogglePause = (id: number) => {
    setCampaigns(campaigns.map(c => 
      c.id === id 
        ? { ...c, status: c.status === 'paused' ? 'active' : 'paused' }
        : c
    ));
    const campaign = campaigns.find(c => c.id === id);
    const action = campaign?.status === 'paused' ? 'tiếp tục' : 'tạm dừng';
    toast.success(`Chiến dịch đã được ${action}`);
  };

  const handleCloneCampaign = (campaign: any) => {
    setSelectedCampaign(campaign);
    setShowCloneModal(true);
  };

  const confirmClone = () => {
    const newCampaign = {
      ...selectedCampaign,
      id: Math.max(...campaigns.map(c => c.id)) + 1,
      name: `${selectedCampaign.name} (Bản sao)`,
      status: 'draft',
    };
    setCampaigns([...campaigns, newCampaign]);
    setShowCloneModal(false);
    toast.success('Chiến dịch đã được nhân bản thành công');
  };

  const handleDelete = (id: number) => {
    setCampaigns(campaigns.filter(c => c.id !== id));
    toast.success('Chiến dịch đã được xóa');
  };

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Chiến dịch</h1>
        <p className="text-muted-foreground mt-1">
          Tạo và quản lý các chiến dịch khách hàng thân thiết của bạn
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="draft">Nháp</option>
          <option value="active">Hoạt động</option>
          <option value="paused">Tạm dừng</option>
          <option value="closed">Đã kết thúc</option>
        </select>
        <input
          type="search"
          placeholder="Tìm kiếm chiến dịch..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm w-full sm:w-64"
        />
      </div>

      {/* Campaigns table */}
      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle>Quản lý chiến dịch</CardTitle>
          <CardDescription>Theo dõi và quản lý tất cả chiến dịch của bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Tên chiến dịch
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Thời gian
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Ngân sách / Sử dụng
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Tốc độ tiêu thụ
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Khách hàng
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Tham gia
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
                {filteredCampaigns.map((campaign) => {
                  const usage = (campaign.points / campaign.pointsCap) * 100;
                  const isOverBudget = usage > 90;
                  
                  return (
                    <tr
                      key={campaign.id}
                      className={`border-b border-border hover:bg-muted/50 transition-colors ${isOverBudget ? 'bg-destructive/5' : ''}`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-start gap-2">
                          {isOverBudget && <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />}
                          <div>
                            <p className="font-medium text-foreground">
                              {campaign.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        <span className="text-xs">{campaign.startDate} - {campaign.endDate}</span>
                      </td>
                      <td className="px-4 py-3 text-foreground font-medium">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">{(campaign.pointsCap / 1000).toFixed(0)}K ({(campaign.points / 1000).toFixed(0)}K)</p>
                          <div className="h-2 w-24 rounded-full bg-muted overflow-hidden">
                            <div
                              className={`h-full ${isOverBudget ? 'bg-destructive' : 'bg-accent'}`}
                              style={{ width: `${Math.min(usage, 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-foreground font-medium">
                        <span className="text-sm">{campaign.burnRate}%/ngày</span>
                      </td>
                      <td className="px-4 py-3 text-foreground">
                        {campaign.customers.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${campaign.engagement}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-foreground">
                            {campaign.engagement}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            campaign.status === 'active'
                              ? 'bg-accent/20 text-accent'
                              : campaign.status === 'draft'
                              ? 'bg-primary/20 text-primary'
                              : campaign.status === 'paused'
                              ? 'bg-yellow-500/20 text-yellow-600'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {campaign.status === 'active' && 'Hoạt động'}
                          {campaign.status === 'draft' && 'Nháp'}
                          {campaign.status === 'paused' && 'Tạm dừng'}
                          {campaign.status === 'closed' && 'Đã kết thúc'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            title="Xem chi tiết"
                          >
                            <Link href={`/campaigns/${campaign.id}`}>
                              <BarChart3 className="h-4 w-4" />
                            </Link>
                          </Button>
                          {campaign.status !== 'closed' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleTogglePause(campaign.id)}
                              title={campaign.status === 'paused' ? 'Tiếp tục' : 'Tạm dừng'}
                            >
                              {campaign.status === 'paused' ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCloneCampaign(campaign)}
                            title="Nhân bản chiến dịch"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                          >
                            <Link href={`/campaigns/${campaign.id}/edit`}>
                              <Edit2 className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(campaign.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredCampaigns.length === 0 && (
            <div className="py-12 text-center">
              <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Không có chiến dịch nào</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Clone Campaign Modal */}
      <Dialog open={showCloneModal} onOpenChange={setShowCloneModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nhân bản chiến dịch</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn tạo bản sao của chiến dịch <strong>{selectedCampaign?.name}</strong>?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Chiến dịch mới sẽ được tạo với tất cả cài đặt giống hệt, nhưng sẽ ở trạng thái "Nháp" và bạn có thể chỉnh sửa trước khi kích hoạt.
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowCloneModal(false)}>
                Hủy
              </Button>
              <Button onClick={confirmClone} className="bg-primary hover:bg-primary/90">
                Xác nhận nhân bản
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
