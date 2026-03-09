'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

export function CampaignForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    pointsPerTransaction: 0,
    startDate: '',
    endDate: '',
    maxParticipants: 0,
    targetGroup: 'all',
    rewardType: 'points',
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes('Points') || name.includes('Participants')
        ? parseInt(value) || 0
        : value,
    }));
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  s < step
                    ? 'border-accent bg-accent text-card'
                    : s === step
                    ? 'border-primary bg-primary text-card'
                    : 'border-border bg-card text-muted-foreground'
                }`}
              >
                {s < step ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{s}</span>
                )}
              </div>
              {s < 4 && (
                <div
                  className={`h-1 w-12 sm:w-24 ${
                    s < step ? 'bg-accent' : 'bg-border'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs sm:text-sm font-medium text-muted-foreground">
          <span>Basic Info</span>
          <span>Schedule</span>
          <span>Targeting</span>
          <span>Review</span>
        </div>
      </div>

      {/* Form content */}
      <Card className="border border-border bg-card">
        {step === 1 && (
          <>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
              <CardDescription>
                Provide the basic information about your campaign
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Campaign Name *
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Summer Sale Campaign"
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
                  placeholder="Describe your campaign..."
                  className="min-h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Points per Transaction *
                </label>
                <Input
                  type="number"
                  name="pointsPerTransaction"
                  value={formData.pointsPerTransaction}
                  onChange={handleInputChange}
                  placeholder="100"
                  className="h-10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Reward Type *
                </label>
                <select
                  name="rewardType"
                  value={formData.rewardType}
                  onChange={handleInputChange}
                  className="w-full h-10 rounded-lg border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value="points">Points</option>
                  <option value="discount">Discount</option>
                  <option value="freeproduct">Free Product</option>
                </select>
              </div>
            </CardContent>
          </>
        )}

        {step === 2 && (
          <>
            <CardHeader>
              <CardTitle>Campaign Schedule</CardTitle>
              <CardDescription>
                Set when your campaign runs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Start Date *
                  </label>
                  <Input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="h-10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    End Date *
                  </label>
                  <Input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="h-10"
                  />
                </div>
              </div>
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <p className="text-sm text-foreground">
                  <strong>Duration:</strong>{' '}
                  {formData.startDate && formData.endDate
                    ? `${Math.ceil(
                        (new Date(formData.endDate).getTime() -
                          new Date(formData.startDate).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )} days`
                    : 'Select dates to calculate'}
                </p>
              </div>
            </CardContent>
          </>
        )}

        {step === 3 && (
          <>
            <CardHeader>
              <CardTitle>Campaign Targeting</CardTitle>
              <CardDescription>
                Choose who can participate in this campaign
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Target Group *
                </label>
                <select
                  name="targetGroup"
                  value={formData.targetGroup}
                  onChange={handleInputChange}
                  className="w-full h-10 rounded-lg border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value="all">All Customers</option>
                  <option value="vip">VIP Members</option>
                  <option value="new">New Customers</option>
                  <option value="inactive">Re-engagement</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Max Participants (0 = unlimited) *
                </label>
                <Input
                  type="number"
                  name="maxParticipants"
                  value={formData.maxParticipants}
                  onChange={handleInputChange}
                  placeholder="1000"
                  className="h-10"
                />
              </div>
            </CardContent>
          </>
        )}

        {step === 4 && (
          <>
            <CardHeader>
              <CardTitle>Review & Launch</CardTitle>
              <CardDescription>
                Review your campaign details before launching
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-muted-foreground">
                    Campaign Name:
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {formData.name || 'Not set'}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-muted-foreground">
                    Duration:
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {formData.startDate && formData.endDate
                      ? `${formData.startDate} to ${formData.endDate}`
                      : 'Not set'}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-muted-foreground">
                    Points per Transaction:
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {formData.pointsPerTransaction}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-muted-foreground">
                    Target Group:
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {formData.targetGroup.charAt(0).toUpperCase() +
                      formData.targetGroup.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-muted-foreground">
                    Max Participants:
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {formData.maxParticipants || 'Unlimited'}
                  </span>
                </div>
              </div>
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <p className="text-sm text-foreground">
                  ✓ Everything looks good. Click "Launch Campaign" to go live.
                </p>
              </div>
            </CardContent>
          </>
        )}

        {/* Actions */}
        <div className="border-t border-border px-6 py-4 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          {step < 4 ? (
            <Button
              onClick={handleNext}
              className="gap-2 bg-primary hover:bg-primary/90"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button className="gap-2 bg-accent hover:bg-accent/90">
              <Check className="h-4 w-4" />
              Launch Campaign
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
