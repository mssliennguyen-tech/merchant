import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function RedeemPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container flex items-center justify-between px-4 sm:px-6 py-4">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">
                MP
              </span>
            </div>
            <span className="font-semibold text-foreground">MyPoint Redeem</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="w-full max-w-md">
          {/* Hero section */}
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 mb-4">
              <span className="text-3xl">🎁</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Redeem Your Reward
            </h1>
            <p className="text-muted-foreground">
              Enter your voucher code to claim your reward
            </p>
          </div>

          {/* Redemption form */}
          <Card className="border border-border bg-card mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Enter Voucher Code</CardTitle>
              <CardDescription>
                You'll find this code in your confirmation email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Voucher Code
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., MYPOINT-ABC123"
                    className="h-12 text-center font-mono text-lg tracking-widest uppercase"
                  />
                </div>

                <Button className="w-full h-11 bg-primary hover:bg-primary/90 gap-2">
                  Redeem Reward
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info cards */}
          <div className="space-y-3">
            {[
              {
                title: 'Easy Redemption',
                description: 'Redeem your rewards in seconds',
              },
              {
                title: 'Instant Confirmation',
                description: 'Get confirmation immediately after redemption',
              },
              {
                title: 'Secure & Safe',
                description: 'Your information is protected',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="mt-8 pt-8 border-t border-border">
            <h3 className="font-semibold text-foreground mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {[
                {
                  q: 'Where do I find my voucher code?',
                  a: 'Your voucher code was sent to your email when the reward was issued.',
                },
                {
                  q: 'Can I use a voucher multiple times?',
                  a: 'No, each voucher code can only be redeemed once.',
                },
                {
                  q: 'What if my code is expired?',
                  a: 'Contact customer support for assistance with expired vouchers.',
                },
              ].map((item, i) => (
                <div key={i} className="text-sm">
                  <p className="font-medium text-foreground mb-1">{item.q}</p>
                  <p className="text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6">
        <div className="container px-4 sm:px-6 text-center text-sm text-muted-foreground">
          <p>Need help? Contact us at support@mypoint.com</p>
        </div>
      </footer>
    </div>
  );
}
