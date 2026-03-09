'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit2, MoreVertical, Trash2, Gift } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function RewardsPage() {
  const [rewards] = useState([
    {
      id: 1,
      name: 'Giảm giá 100.000 VNĐ',
      pointsRequired: 100,
      redeemed: 342,
      available: 658,
      category: 'discount',
      active: true,
    },
    {
      id: 2,
      name: 'Cà phê miễn phí',
      pointsRequired: 50,
      redeemed: 891,
      available: 109,
      category: 'freeproduct',
      active: true,
    },
    {
      id: 3,
      name: 'Tín dụng cửa hàng 500.000 VNĐ',
      pointsRequired: 250,
      redeemed: 127,
      available: 373,
      category: 'discount',
      active: true,
    },
    {
      id: 4,
      name: 'Giao hàng miễn phí',
      pointsRequired: 75,
      redeemed: 564,
      available: 436,
      category: 'discount',
      active: false,
    },
  ]);

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Phần thưởng</h1>
          <p className="text-muted-foreground mt-1">
            Tạo và quản lý phần thưởng mà khách hàng của bạn có thể sử dụng
          </p>
        </div>
        <div className="mt-4 flex gap-2 md:mt-0">
          <Button
            variant="outline"
            asChild
            className="gap-2"
          >
            <Link href="/rewards/bulk-upload">
              <Plus className="h-4 w-4" />
              Tải lên hàng loạt
            </Link>
          </Button>
          <Button asChild className="gap-2 bg-primary hover:bg-primary/90">
            <Link href="/rewards/new">
              <Plus className="h-4 w-4" />
              Phần thưởng mới
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <select className="rounded-lg border border-border bg-card px-3 py-2 text-sm">
          <option>All Categories</option>
          <option>Discount</option>
          <option>Free Product</option>
          <option>Experience</option>
        </select>
        <select className="rounded-lg border border-border bg-card px-3 py-2 text-sm">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <input
          type="search"
          placeholder="Search rewards..."
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm w-full sm:w-64"
        />
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { label: 'Total Rewards', value: '24' },
          { label: 'Active Rewards', value: '18' },
          { label: 'Total Redeemed', value: '1.9K' },
        ].map((stat, i) => (
          <Card key={i} className="border border-border bg-card">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Rewards table */}
      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle>All Rewards</CardTitle>
          <CardDescription>Manage your available rewards catalog</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Reward
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Points Required
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Redeemed
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Available
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Category
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
                {rewards.map((reward) => (
                  <tr
                    key={reward.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{reward.name}</p>
                    </td>
                    <td className="px-4 py-3 text-foreground font-medium">
                      {reward.pointsRequired}
                    </td>
                    <td className="px-4 py-3 text-foreground">
                      {reward.redeemed}
                    </td>
                    <td className="px-4 py-3 text-foreground font-medium">
                      {reward.available}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <span className="text-xs capitalize">
                        {reward.category.replace(/([A-Z])/g, ' $1')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          reward.active
                            ? 'bg-accent/20 text-accent'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {reward.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                        >
                          <Link href={`/rewards/${reward.id}/edit`}>
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

          {rewards.length === 0 && (
            <div className="py-12 text-center">
              <Gift className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No rewards yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
