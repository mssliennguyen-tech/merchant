'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

export default function RegisterPartnerPage() {
  const [formData, setFormData] = useState({
    salutation: 'anh',
    fullName: '',
    phone: '',
    email: '',
    channel: '',
    companyName: '',
    taxId: '',
    industry: '',
    region: 'mienNam',
    service: '',
    value: '',
    description: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email) {
      toast.error('Vui lòng điền tất cả thông tin bắt buộc');
      return;
    }
    toast.success('Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn trong 24 giờ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="container flex items-center justify-between px-4 sm:px-6 py-4">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">M</span>
            </div>
            <span className="font-semibold text-foreground">Merchant Portal</span>
          </Link>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Đăng ký để nhận tư vấn</h1>
          <p className="text-lg text-muted-foreground">
            Hãy cho chúng tôi biết thêm về kinh doanh của bạn để chúng tôi có thể cung cấp giải pháp tốt nhất
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border shadow-lg p-8 space-y-8">
          {/* Thông tin cá nhân */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
              Thông tin cá nhân
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Danh xưng <span className="text-destructive">*</span>
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleInputChange('salutation', 'anh')}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                      formData.salutation === 'anh'
                        ? 'border-2 border-primary bg-primary/5 text-primary'
                        : 'border border-border text-foreground hover:border-primary/50'
                    }`}
                  >
                    Anh
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('salutation', 'chi')}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                      formData.salutation === 'chi'
                        ? 'border-2 border-primary bg-primary/5 text-primary'
                        : 'border border-border text-foreground hover:border-primary/50'
                    }`}
                  >
                    Chị
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Họ tên <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Nhập họ và tên"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Số điện thoại <span className="text-destructive">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Nhập số điện thoại"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Nhập email"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Bạn biết đến chúng tôi qua kênh nào?
                </label>
                <select
                  value={formData.channel}
                  onChange={(e) => handleInputChange('channel', e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                >
                  <option value="">Chọn kênh</option>
                  <option value="facebook">Facebook</option>
                  <option value="google">Google</option>
                  <option value="friend">Bạn bè</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>
          </div>

          {/* Thông tin công ty */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
              Thông tin công ty
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Tên công ty
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Nhập tên công ty"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Mã số thuế
                </label>
                <input
                  type="text"
                  value={formData.taxId}
                  onChange={(e) => handleInputChange('taxId', e.target.value)}
                  placeholder="Nhập mã số thuế"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Công ty thuộc lĩnh vực <span className="text-destructive">*</span>
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                >
                  <option value="">Chọn lĩnh vực</option>
                  <option value="retail">Bán lẻ</option>
                  <option value="restaurant">Nhà hàng</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="other">Khác</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Bạn thuộc khu vực
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleInputChange('region', 'mienNam')}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                      formData.region === 'mienNam'
                        ? 'border-2 border-primary bg-primary/5 text-primary'
                        : 'border border-border text-foreground hover:border-primary/50'
                    }`}
                  >
                    Miền Nam & Trung
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInputChange('region', 'mienBac')}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                      formData.region === 'mienBac'
                        ? 'border-2 border-primary bg-primary/5 text-primary'
                        : 'border border-border text-foreground hover:border-primary/50'
                    }`}
                  >
                    Miền Bắc
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Nội dung tư vấn */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
              Nội dung tư vấn
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Bạn cần tư vấn dịch vụ, sản phẩm gì? <span className="text-destructive">*</span>
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => handleInputChange('service', e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                >
                  <option value="">Chọn dịch vụ</option>
                  <option value="loyalty">Chương trình khách hàng thân thiết</option>
                  <option value="marketing">Công cụ marketing</option>
                  <option value="analytics">Analytics</option>
                  <option value="other">Khác</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">
                  Giá trị sản phẩm, dịch vụ cần tư vấn <span className="text-destructive">*</span>
                </label>
                <select
                  value={formData.value}
                  onChange={(e) => handleInputChange('value', e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                >
                  <option value="">Chọn mức giá</option>
                  <option value="under10m">Dưới 10 triệu</option>
                  <option value="10-50m">10-50 triệu</option>
                  <option value="50-100m">50-100 triệu</option>
                  <option value="over100m">Trên 100 triệu</option>
                </select>
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-semibold text-foreground mb-3">
                Mô tả nhu cầu
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Nhập mô tả chi tiết nhu cầu của bạn"
                rows={4}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-border">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-lg"
            >
              Gửi yêu cầu tư vấn
            </Button>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ
            </p>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 mt-16">
        <div className="container max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 Merchant Portal. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </footer>
    </div>
  );
}
