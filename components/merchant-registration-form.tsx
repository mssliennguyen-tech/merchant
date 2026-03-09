'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export function MerchantRegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    referralSource: '',
    companyName: '',
    taxId: '',
    industry: '',
    region: '',
    serviceNeeded: '',
    priceRange: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm.');
      setFormData({
        title: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        referralSource: '',
        companyName: '',
        taxId: '',
        industry: '',
        region: '',
        serviceNeeded: '',
        priceRange: '',
        description: '',
      });
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="w-full bg-card border border-border">
      <form onSubmit={handleSubmit} className="p-8 md:p-10">
        {/* Thông tin cá nhân */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-6">Thông tin cá nhân</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Danh xưng */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Danh xưng <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="title"
                    value="anh"
                    checked={formData.title === 'anh'}
                    onChange={handleInputChange}
                    className="w-4 h-4 cursor-pointer"
                    required
                  />
                  <span className="text-sm text-foreground">Anh</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="title"
                    value="chi"
                    checked={formData.title === 'chi'}
                    onChange={handleInputChange}
                    className="w-4 h-4 cursor-pointer"
                    required
                  />
                  <span className="text-sm text-foreground">Chị</span>
                </label>
              </div>
            </div>

            {/* Họ và tên */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="text"
                  name="firstName"
                  placeholder="Họ"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="border border-input rounded-md"
                  required
                />
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Tên"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="border border-input rounded-md"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Số điện thoại */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <Input
                type="tel"
                name="phone"
                placeholder="Nhập số điện thoại"
                value={formData.phone}
                onChange={handleInputChange}
                className="border border-input rounded-md"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                name="email"
                placeholder="Nhập email"
                value={formData.email}
                onChange={handleInputChange}
                className="border border-input rounded-md"
                required
              />
            </div>
          </div>

          {/* Bạn biết đến GoIt qua kênh nào */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Bạn biết đến MyPoint qua kênh nào?
            </label>
            <Select value={formData.referralSource} onValueChange={(value) => handleSelectChange('referralSource', value)}>
              <SelectTrigger className="border border-input rounded-md">
                <SelectValue placeholder="Chọn kênh" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="google">Google</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="friend">Bạn bè</SelectItem>
                <SelectItem value="other">Khác</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Thông tin công ty */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-6">Thông tin công ty</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Tên công ty */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tên công ty
              </label>
              <Input
                type="text"
                name="companyName"
                placeholder="Nhập tên công ty"
                value={formData.companyName}
                onChange={handleInputChange}
                className="border border-input rounded-md"
              />
            </div>

            {/* Mã số thuế */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Mã số thuế
              </label>
              <Input
                type="text"
                name="taxId"
                placeholder="Nhập mã số thuế"
                value={formData.taxId}
                onChange={handleInputChange}
                className="border border-input rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Công ty thuộc lĩnh vực */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Công ty thuộc lĩnh vực <span className="text-red-500">*</span>
              </label>
              <Select value={formData.industry} onValueChange={(value) => handleSelectChange('industry', value)}>
                <SelectTrigger className="border border-input rounded-md">
                  <SelectValue placeholder="Chọn lĩnh vực" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">Bán lẻ</SelectItem>
                  <SelectItem value="hospitality">Khách sạn & Du lịch</SelectItem>
                  <SelectItem value="fmcg">FMCG</SelectItem>
                  <SelectItem value="financial">Tài chính</SelectItem>
                  <SelectItem value="tech">Công nghệ</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bạn thuộc khu vực */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Bạn thuộc khu vực
              </label>
              <div className="flex gap-3">
                <label className="flex-1">
                  <input
                    type="radio"
                    name="region"
                    value="south-central"
                    checked={formData.region === 'south-central'}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <div className={`px-4 py-2 rounded-md border-2 cursor-pointer text-sm font-medium transition-all ${
                    formData.region === 'south-central'
                      ? 'border-red-500 bg-red-50 text-red-600'
                      : 'border-input bg-background text-foreground hover:border-border'
                  }`}>
                    Miền Nam & Trung
                  </div>
                </label>
                <label className="flex-1">
                  <input
                    type="radio"
                    name="region"
                    value="north"
                    checked={formData.region === 'north'}
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  <div className={`px-4 py-2 rounded-md border-2 cursor-pointer text-sm font-medium transition-all ${
                    formData.region === 'north'
                      ? 'border-red-500 bg-red-50 text-red-600'
                      : 'border-input bg-background text-foreground hover:border-border'
                  }`}>
                    Miền Bắc
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Nội dung tư vấn */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-6">Nội dung tư vấn</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Bạn cần tư vấn dịch vụ */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Bạn cần tư vấn dịch vụ, sản phẩm gì? <span className="text-red-500">*</span>
              </label>
              <Select value={formData.serviceNeeded} onValueChange={(value) => handleSelectChange('serviceNeeded', value)}>
                <SelectTrigger className="border border-input rounded-md">
                  <SelectValue placeholder="Chọn dịch vụ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="platform">Nền tảng quản lý</SelectItem>
                  <SelectItem value="campaign">Tạo chiến dịch</SelectItem>
                  <SelectItem value="rewards">Quản lý phần thưởng</SelectItem>
                  <SelectItem value="integration">Tích hợp API</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Giá trị sản phẩm */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Giá trị sản phẩm, dịch vụ cần tư vấn <span className="text-red-500">*</span>
              </label>
              <Select value={formData.priceRange} onValueChange={(value) => handleSelectChange('priceRange', value)}>
                <SelectTrigger className="border border-input rounded-md">
                  <SelectValue placeholder="Chọn mức giá" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-10">Dưới 10 triệu</SelectItem>
                  <SelectItem value="10-50">10 - 50 triệu</SelectItem>
                  <SelectItem value="50-100">50 - 100 triệu</SelectItem>
                  <SelectItem value="over-100">Trên 100 triệu</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mô tả nhu cầu */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Mô tả nhu cầu
            </label>
            <Textarea
              name="description"
              placeholder="Nhập mô tả nhu cầu của bạn"
              value={formData.description}
              onChange={handleInputChange}
              className="border border-input rounded-md min-h-32 resize-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md text-base transition-colors"
        >
          {isLoading ? 'Đang xử lý...' : 'Đăng ký tư vấn'}
        </Button>
      </form>
    </Card>
  );
}
