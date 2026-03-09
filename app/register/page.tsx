import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gradient-to-br from-accent/5 to-primary/5 p-12">
        <div className="text-center">
          <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-accent/10">
            <div className="text-5xl">🎁</div>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Bắt đầu hành trình khách hàng thân thiết của bạn
          </h2>
          <p className="text-muted-foreground max-w-xs">
            Tham gia hàng ngàn nhà bán lẻ xây dựng mối quan hệ lâu dài với khách hàng
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full flex-col justify-center px-4 sm:px-6 lg:w-1/2 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          {/* Back button */}
          <Link
            href="/login"
            className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại đăng nhập
          </Link>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Tạo tài khoản của bạn
            </h1>
            <p className="text-muted-foreground">
              Thiết lập tài khoản nhà bán lẻ của bạn trong vài phút
            </p>
          </div>

          {/* Registration Form */}
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tên
                </label>
                <Input
                  type="text"
                  placeholder="Nguyễn"
                  className="h-10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Họ
                </label>
                <Input
                  type="text"
                  placeholder="Văn A"
                  className="h-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tên công ty
              </label>
              <Input
                type="text"
                placeholder="Công ty ABC"
                className="h-10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Địa chỉ email
              </label>
              <Input
                type="email"
                placeholder="abc@company.com"
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
              <p className="text-xs text-muted-foreground mt-1">
                Ít nhất 8 ký tự với số và ký tự đặc biệt
              </p>
            </div>

            <div>
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-border bg-background mt-1"
                />
                <span className="text-sm text-muted-foreground">
                  Tôi đồng ý với{' '}
                  <Link
                    href="#"
                    className="font-medium text-primary hover:underline"
                  >
                    Điều khoản dịch vụ
                  </Link>{' '}
                  và{' '}
                  <Link
                    href="#"
                    className="font-medium text-primary hover:underline"
                  >
                    Chính sách bảo mật
                  </Link>
                </span>
              </label>
            </div>

            <Button
              className="w-full h-10 bg-primary hover:bg-primary/90"
              asChild
            >
              <Link href="/dashboard" className="flex items-center justify-center gap-2">
                Tạo tài khoản
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Đã có tài khoản?{' '}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
