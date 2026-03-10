
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Zap, Gift, BarChart3, Users, X } from 'lucide-react';

function RegistrationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Đăng ký để nhận tư vấn</DialogTitle>
        </DialogHeader>
        <div className="mt-6">
          <div className="space-y-6">
            {/* Thông tin cá nhân */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Thông tin cá nhân</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Danh xưng *</label>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 border-2 border-destructive text-destructive rounded-lg hover:bg-destructive/5">Anh</button>
                    <button className="flex-1 px-3 py-2 border border-border rounded-lg hover:bg-muted">Chị</button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Họ tên *</label>
                  <input type="text" placeholder="Nhập họ và tên" className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Số điện thoại *</label>
                  <input type="tel" placeholder="Nhập số điện thoại" className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                  <input type="email" placeholder="Nhập email" className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Bạn biết đến Got It qua kênh nào?</label>
                  <select className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Chọn</option>
                    <option>Facebook</option>
                    <option>Google</option>
                    <option>Bạn bè</option>
                    <option>Khác</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-t border-border"></div>

            {/* Thông tin công ty */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Thông tin công ty</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Tên công ty</label>
                  <input type="text" placeholder="Nhập tên công ty" className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Mã số thuế</label>
                  <input type="text" placeholder="Nhập mã số thuế" className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Công ty thuộc lĩnh vực *</label>
                  <select className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Chọn</option>
                    <option>Bán lẻ</option>
                    <option>Nhà hàng</option>
                    <option>E-commerce</option>
                    <option>Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Bạn thuộc khu vực</label>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 border-2 border-destructive text-destructive rounded-lg hover:bg-destructive/5 text-sm font-medium">Miền Nam & Trung</button>
                    <button className="flex-1 px-3 py-2 border border-border rounded-lg hover:bg-muted text-sm font-medium">Miền Bắc</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border"></div>

            {/* Nội dung tư vấn */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Nội dung tư vấn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Bạn cần tư vấn dịch vụ, sản phẩm gì? *</label>
                  <select className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Chọn</option>
                    <option>Chương trình khách hàng thân thiết</option>
                    <option>Công cụ marketing</option>
                    <option>Analytics</option>
                    <option>Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Giá trị sản phẩm, dịch vụ cần tư vấn *</label>
                  <select className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Chọn</option>
                    <option>Dưới 10 triệu</option>
                    <option>10-50 triệu</option>
                    <option>50-100 triệu</option>
                    <option>Trên 100 triệu</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-foreground mb-2">Mô tả nhu cầu</label>
                <textarea placeholder="Nhập mô tả nhu cầu" rows={4} className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"></textarea>
              </div>
            </div>

            <button className="w-full bg-destructive text-white font-semibold py-3 rounded-lg hover:bg-destructive/90 transition-colors">
              Đăng ký tư vấn
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container flex items-center justify-between px-4 sm:px-6 py-4">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">
                M
              </span>
            </div>
            <span className="font-semibold text-foreground">Merchant Portal</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="outline" className="border-border hover:bg-muted">
                Đăng nhập
              </Button>
            </Link>
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Đăng ký đối tác
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6">
        <div className="container max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Xây dựng mối quan hệ lâu dài với khách hàng thông qua chương trình khách hàng thân thiết
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            MyPoint giúp bạn dễ dàng tạo, quản lý và phát triển chương trình loyalty của mình. Tăng sự tham gia của khách hàng, cải thiện khả năng giữ chân và thúc đẩy mua lại.
          </p>

        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Mọi thứ bạn cần
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Các công cụ mạnh mẽ được thiết kế để giúp các nhà bán lẻ thành công với chương trình khách hàng thân thiết
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Zap,
                title: 'Quản lý chiến dịch',
                description: 'Tạo các chiến dịch nhắm mục tiêu giúp tăng sự tham gia và ghi nhận khách hàng tốt nhất của bạn',
              },
              {
                icon: Gift,
                title: 'Quản lý phần thưởng',
                description: 'Thiết kế những phần thưởng hấp dẫn và quản lý kho hàng một cách dễ dàng',
              },
              {
                icon: BarChart3,
                title: 'Phân tích & Insights',
                description: 'Theo dõi hiệu suất với các báo cáo chi tiết và những hiểu biết có hành động',
              },
              {
                icon: Users,
                title: 'Phân đoạn khách hàng',
                description: 'Nhắm mục tiêu các nhóm khách hàng cụ thể bằng các chiến dịch được cá nhân hóa',
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Card key={i} className="border border-border bg-card">
                  <CardHeader>
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-2">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { value: '10K+', label: 'Nhà bán lẻ đang hoạt động' },
              { value: '500M+', label: 'Điểm thưởng được phát hành' },
              { value: '98%', label: 'Sự hài lòng của khách hàng' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>





      {/* Footer */}
      <footer className="border-t border-border bg-card py-12 px-4 sm:px-6">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {[
              {
                title: 'Sản phẩm',
                links: ['Tính năng', 'Giá cả', 'Bảo mật', 'Cập nhật'],
              },
              {
                title: 'Công ty',
                links: ['Giới thiệu', 'Blog', 'Tuyển dụng', 'Liên hệ'],
              },
              {
                title: 'Tài nguyên',
                links: ['Tài liệu', 'API', 'Hỗ trợ', 'Cộng đồng'],
              },
              {
                title: 'Pháp lý',
                links: ['Bảo mật', 'Điều khoản', 'Cookie', 'Giấy phép'],
              },
            ].map((col, i) => (
              <div key={i}>
                <h3 className="font-semibold text-foreground mb-4">
                  {col.title}
                </h3>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <Link
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between">
            <div className="inline-flex items-center gap-2 mb-4 md:mb-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">
                  MP
                </span>
              </div>
              <span className="font-semibold text-foreground">MyPoint</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 MyPoint. Bảo lưu mọi quyền.
            </p>
          </div>
        </div>
      </footer>

      {/* Registration Modal */}
      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
