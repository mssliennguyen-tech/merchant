import { DashboardLayout } from '@/components/dashboard-layout';
import { RewardForm } from '@/components/reward-form';

export default function NewRewardPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Create New Reward</h1>
        <p className="text-muted-foreground mt-1">
          Add a new reward to your catalog
        </p>
      </div>

      <RewardForm />
    </DashboardLayout>
  );
}
