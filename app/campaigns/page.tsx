'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit2, MoreVertical, Trash2, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function CampaignsPage() {
  const [campaigns] = useState([
    {
      id: 1,
      name: 'Khuyến mãi hè',
      status: 'active',
      points: 450000,
      customers: 3421,
      engagement: 78,
      startDate: '1 tháng 6, 2024',
      endDate: '31 tháng 8, 2024',
    },
    {
      id: 2,
      name: 'Thưởng sinh nhật',
      status: 'active',
      points: 320000,
      customers: 2156,
      engagement: 65,
      startDate: '1 tháng 1, 2024',
      endDate: '31 tháng 12, 2024',
    },
    {
      id: 3,
      name: 'Chương trình giới thiệu',
      status: 'pending',
      points: 210000,
      customers: 890,
      engagement: 42,
      startDate: '15 tháng 7, 2024',
      endDate: '15 tháng 9, 2024',
    },
    {
      id: 4,
      name: 'VIP Độc quyền',
      status: 'paused',
      points: 180000,
      customers: 234,
      engagement: 91,
      startDate: '1 tháng 5, 2024',
      endDate: '31 tháng 5, 2024',
    },
  ]);

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Chiến dịch</h1>
          <p className="text-muted-foreground mt-1">
            Tạo và quản lý các chiến dịch khách hàng thân thiết của bạn
          </p>
        </div>
        <Button asChild className="mt-4 md:mt-0 bg-primary hover:bg-primary/90">
          <Link href="/campaigns/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Tạo chiến dịch
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <select className="rounded-lg border border-border bg-card px-3 py-2 text-sm">
          <option>Tất cả trạng thái</option>
          <option>Hoạt động</option>
          <option>Đang chờ</option>
          <option>Tạm dừng</option>
          <option>Hoàn thành</option>
        </select>
        <input
          type="search"
          placeholder="Search campaigns..."
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm w-full sm:w-64"
        />
      </div>

      {/* Campaigns table */}
      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
          <CardDescription>Manage and monitor your active campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Campaign
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Period
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Points
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Customers
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Engagement
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-foreground">
                          {campaign.name}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <span className="text-xs">{campaign.startDate} - {campaign.endDate}</span>
                    </td>
                    <td className="px-4 py-3 text-foreground font-medium">
                      {(campaign.points / 1000).toFixed(0)}K
                    </td>
                    <td className="px-4 py-3 text-foreground">
                      {campaign.customers.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-accent"
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
                            : campaign.status === 'pending'
                            ? 'bg-primary/20 text-primary'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {campaign.status.charAt(0).toUpperCase() +
                          campaign.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                        >
                          <Link href={`/campaigns/${campaign.id}`}>
                            <BarChart3 className="h-4 w-4" />
                          </Link>
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

          {campaigns.length === 0 && (
            <div className="py-12 text-center">
              <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No campaigns yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
