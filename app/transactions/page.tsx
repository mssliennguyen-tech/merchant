'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Filter, CreditCard } from 'lucide-react';
import { useState } from 'react';

export default function TransactionsPage() {
  const [transactions] = useState([
    {
      id: 'TXN001',
      date: '2024-03-15',
      customer: 'Nguyễn Văn A',
      customerId: 'CUST123',
      type: 'points_earned',
      amount: 150,
      reference: 'Chiến dịch Khuyến mãi hè',
      status: 'completed',
    },
    {
      id: 'TXN002',
      date: '2024-03-14',
      customer: 'Trần Thị B',
      customerId: 'CUST456',
      type: 'points_redeemed',
      amount: -100,
      reference: 'Giảm giá 100.000 VNĐ',
      status: 'completed',
    },
    {
      id: 'TXN003',
      date: '2024-03-14',
      customer: 'Hoàng Văn C',
      customerId: 'CUST789',
      type: 'points_earned',
      amount: 200,
      reference: 'Chương trình giới thiệu',
      status: 'completed',
    },
    {
      id: 'TXN004',
      date: '2024-03-13',
      customer: 'Lê Thị D',
      customerId: 'CUST012',
      type: 'points_redeemed',
      amount: -250,
      reference: 'Tín dụng cửa hàng 500.000 VNĐ',
      status: 'completed',
    },
    {
      id: 'TXN005',
      date: '2024-03-13',
      customer: 'Charlie Brown',
      customerId: 'CUST345',
      type: 'points_earned',
      amount: 75,
      reference: 'Birthday Bonus',
      status: 'pending',
    },
  ]);

  const getTransactionIcon = (type: string) => {
    return type === 'points_earned' ? '+' : '−';
  };

  const getTransactionColor = (type: string) => {
    return type === 'points_earned'
      ? 'text-accent'
      : 'text-destructive';
  };

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Giao dịch</h1>
          <p className="text-muted-foreground mt-1">
            Xem và theo dõi tất cả các giao dịch điểm
          </p>
        </div>
        <Button
          variant="outline"
          className="mt-4 gap-2 md:mt-0"
        >
          <Download className="h-4 w-4" />
          Xuất CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {[
          { label: 'Total Transactions', value: '12,456' },
          { label: 'Points Issued', value: '2.5M' },
          { label: 'Points Redeemed', value: '1.8M' },
        ].map((stat, i) => (
          <Card key={i} className="border border-border bg-card">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="date"
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm"
        />
        <span className="text-muted-foreground">to</span>
        <input
          type="date"
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm"
        />
        <select className="rounded-lg border border-border bg-card px-3 py-2 text-sm">
          <option>All Types</option>
          <option>Points Earned</option>
          <option>Points Redeemed</option>
        </select>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          More Filters
        </Button>
      </div>

      {/* Transactions table */}
      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>Complete transaction history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Transaction ID
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Reference
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr
                    key={txn.id}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-primary">
                      {txn.id}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {new Date(txn.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-foreground">
                          {txn.customer}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {txn.customerId}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs capitalize">
                        {txn.type.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className={`px-4 py-3 font-bold ${getTransactionColor(txn.type)}`}>
                      {getTransactionIcon(txn.type)}{Math.abs(txn.amount)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {txn.reference}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          txn.status === 'completed'
                            ? 'bg-accent/20 text-accent'
                            : 'bg-primary/20 text-primary'
                        }`}
                      >
                        {txn.status.charAt(0).toUpperCase() +
                          txn.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {transactions.length === 0 && (
            <div className="py-12 text-center">
              <CreditCard className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No transactions found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
