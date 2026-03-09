'use client';

import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Download, Check, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function BulkUploadPage() {
  const [uploadStep, setUploadStep] = useState<'select' | 'preview' | 'complete'>('select');
  const [previewData] = useState([
    { name: '$5 Discount', points: 50, category: 'discount', quantity: 100 },
    { name: '$10 Discount', points: 100, category: 'discount', quantity: 150 },
    { name: 'Free Item', points: 75, category: 'freeproduct', quantity: 200 },
  ]);

  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-8">
        <Link
          href="/rewards"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground mb-4"
        >
          ← Back to Rewards
        </Link>
        <h1 className="text-3xl font-bold text-foreground">Bulk Upload Rewards</h1>
        <p className="text-muted-foreground mt-1">
          Upload multiple rewards at once using a CSV file
        </p>
      </div>

      {uploadStep === 'select' && (
        <div className="max-w-2xl">
          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle>Select CSV File</CardTitle>
              <CardDescription>
                Choose a file to import multiple rewards
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Template download */}
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <p className="text-sm font-medium text-foreground mb-2">
                  Download Template
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  Get started with our CSV template
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Template
                </Button>
              </div>

              {/* File upload area */}
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="font-medium text-foreground mb-1">
                  Drag and drop your CSV file here
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  or click to select a file
                </p>
                <Button
                  onClick={() => setUploadStep('preview')}
                  className="bg-primary hover:bg-primary/90"
                >
                  Select File
                </Button>
              </div>

              {/* Instructions */}
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">
                  CSV Format Requirements
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>First column: Reward Name</li>
                  <li>Second column: Points Required</li>
                  <li>Third column: Category</li>
                  <li>Fourth column: Quantity</li>
                  <li>Maximum 1000 rows per upload</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {uploadStep === 'preview' && (
        <div className="max-w-4xl">
          <Card className="border border-border bg-card">
            <CardHeader>
              <CardTitle>Preview Data</CardTitle>
              <CardDescription>
                Review the data before uploading
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Summary */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Total Records', value: '3' },
                  { label: 'Valid', value: '3' },
                  { label: 'Errors', value: '0' },
                ].map((item, i) => (
                  <div key={i} className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-xl font-bold text-foreground mt-1">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Preview table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Points
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {previewData.map((item, i) => (
                      <tr key={i} className="border-b border-border">
                        <td className="px-4 py-3 text-foreground">
                          {item.name}
                        </td>
                        <td className="px-4 py-3 text-foreground">
                          {item.points}
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">
                          {item.category}
                        </td>
                        <td className="px-4 py-3 text-foreground">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-3">
                          <Check className="h-5 w-5 text-accent" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setUploadStep('select')}
                >
                  Back
                </Button>
                <Button
                  className="gap-2 bg-primary hover:bg-primary/90"
                  onClick={() => setUploadStep('complete')}
                >
                  <Check className="h-4 w-4" />
                  Upload Rewards
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {uploadStep === 'complete' && (
        <div className="max-w-2xl">
          <Card className="border border-border bg-card">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 mb-4">
                <Check className="h-8 w-8 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Upload Complete
              </h2>
              <p className="text-muted-foreground mb-8">
                Successfully imported 3 rewards to your catalog
              </p>
              <div className="space-y-3">
                <Button
                  asChild
                  className="w-full gap-2 bg-primary hover:bg-primary/90"
                >
                  <Link href="/rewards">
                    <Check className="h-4 w-4" />
                    View Rewards
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setUploadStep('select')}
                  className="w-full"
                >
                  Upload More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
