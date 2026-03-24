import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side - Form */}
      <div className="flex w-full flex-col justify-center px-4 sm:px-6 lg:w-1/2 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">
                M
              </span>
            </div>
            <span className="text-2xl font-bold text-foreground">Merchant Portal</span>
          </Link>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Chào mừng quay lại
            </h1>
            <p className="text-muted-foreground">
              Đăng nhập vào tài khoản nhà bán lẻ của bạn để quản lý chương trình khách hàng thân thiết
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Địa chỉ email
              </label>
              <Input
                type="email"
                placeholder="abc@example.com"
                className="h-10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Mật khẩu
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                className="h-10"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-border bg-background"
                />
                <span className="text-sm text-muted-foreground">
                  Ghi nhớ tôi
                </span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-primary hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>

            <Button
              className="w-full h-10 bg-primary hover:bg-primary/90"
              asChild
            >
              <Link href="/dashboard" className="flex items-center justify-center gap-2">
                Đăng nhập
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm text-muted-foreground">hoặc</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Sign up link */}

        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5 p-12">
        <div className="text-center">
          <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
            <div className="text-5xl">📊</div>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Quản lý Chương trình Khách hàng Thân thiết
          </h2>
          <p className="text-muted-foreground max-w-xs">
            Theo dõi các chiến dịch, phần thưởng và sự tham gia của khách hàng tất cả ở một nơi
          </p>
        </div>
      </div>
    </div>
  );
}
