import { DashboardLayout } from '@/components/dashboard-layout';
import { CampaignForm } from '@/components/campaign-form';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewCampaignPage() {
  return (
    <DashboardLayout>
      {/* Page header */}
      <div className="mb-8">
        <Link
          href="/campaigns"
          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Campaigns
        </Link>
        <h1 className="text-3xl font-bold text-foreground">Create New Campaign</h1>
        <p className="text-muted-foreground mt-1">
          Set up a new loyalty campaign in 4 easy steps
        </p>
      </div>

      {/* Form */}
      <CampaignForm />
    </DashboardLayout>
  );
}
