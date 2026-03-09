'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function RewardForm({ isEdit = false }: { isEdit?: boolean }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pointsRequired: 0,
    category: 'discount',
    quantity: 0,
    image: '',
    active: true,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : name.includes('Points') || name === 'quantity'
          ? parseInt(value) || 0
          : value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back button */}
      <Link
        href="/rewards"
        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Rewards
      </Link>

      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle>{isEdit ? 'Edit Reward' : 'Create New Reward'}</CardTitle>
          <CardDescription>
            {isEdit
              ? 'Update the reward details'
              : 'Add a new reward to your catalog'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            {/* Basic Info Section */}
            <div className="space-y-4 pb-6 border-b border-border">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Reward Name *
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., $10 Discount"
                  className="h-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description
                </label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe this reward..."
                  className="min-h-20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full h-10 rounded-lg border border-border bg-background px-3 py-2 text-sm"
                  >
                    <option value="discount">Discount</option>
                    <option value="freeproduct">Free Product</option>
                    <option value="experience">Experience</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Points Required *
                  </label>
                  <Input
                    type="number"
                    name="pointsRequired"
                    value={formData.pointsRequired}
                    onChange={handleInputChange}
                    placeholder="100"
                    className="h-10"
                  />
                </div>
              </div>
            </div>

            {/* Inventory Section */}
            <div className="space-y-4 pb-6 border-b border-border">
              <h3 className="font-semibold text-foreground">Inventory</h3>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Total Quantity Available *
                </label>
                <Input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="500"
                  className="h-10"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Leave at 0 for unlimited
                </p>
              </div>
            </div>

            {/* Status Section */}
            <div className="space-y-4 pb-6">
              <h3 className="font-semibold text-foreground">Status</h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-border bg-background"
                />
                <span className="text-sm font-medium text-foreground">
                  Make this reward available now
                </span>
              </label>
              <p className="text-xs text-muted-foreground">
                Only active rewards will be visible to customers
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-border">
              <Button
                variant="outline"
                asChild
              >
                <Link href="/rewards">Cancel</Link>
              </Button>
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <Save className="h-4 w-4" />
                {isEdit ? 'Update Reward' : 'Create Reward'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
