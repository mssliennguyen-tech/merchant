'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import { toast } from 'sonner';

interface MerchantModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MerchantModalForm({ isOpen, onClose }: MerchantModalFormProps) {
  const [formData, setFormData] = useState({
    salutation: 'Anh',
    fullName: '',
    phone: '',
    email: '',
    reference: '',
    companyName: '',
    taxId: '',
    industry: '',
    region: 'Miền Nam & Trung',
    services: '',
    productValue: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email) {
      toast.error('Vui lòng điền đầy đủ thông tin cá nhân');
      return;
    }
    toast.success('Cảm ơn bạn! Chúng tôi sẽ liên hệ trong 24h');
    onClose();
    setFormData({
      salutation: 'Anh',
      fullName: '',
      phone: '',
      email: '',
      reference: '',
      companyName: '',
      taxId: '',
      industry: '',
      region: 'Miền Nam & Trung',
      services: '',
      productValue: '',
      description: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Thông tin cá nhân</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Warning message */}
          <div className="bg-red-50 border border-red-200 rounded p-3 text-sm text-red-700">
            Vui lòng điền thông tin bên dưới, chúng tôi sẽ liên hệ bạn trong vòng 24h làm việc.
          </div>

          {/* Personal Info Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin cá nhân</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Danh xưng *</label>
                  <select
                    name="salutation"
                    value={formData.salutation}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-red-300 rounded-lg text-gray-900 font-medium"
                  >
                    <option>Anh</option>
                    <option>Chị</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên *</label>
                  <Input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Nhập họ và tên"
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Nhập số điện thoại"
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Nhập email"
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bạn biết đến Got It qua kênh nào? *</label>
                <select
                  name="reference"
                  value={formData.reference}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white"
                >
                  <option value="">Chọn</option>
                  <option value="social">Mạng xã hội</option>
                  <option value="friend">Bạn bè giới thiệu</option>
                  <option value="search">Tìm kiếm Google</option>
                  <option value="other">Khác</option>
                </select>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t-2 border-dashed border-gray-300"></div>

          {/* Company Info Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin công ty</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên công ty</label>
                  <Input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Nhập tên công ty"
                    className="border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mã số thuế</label>
                  <Input
                    type="text"
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleInputChange}
                    placeholder="Nhập mã số thuế"
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Công ty thuộc lĩnh vực *</label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white"
                  >
                    <option value="">Chọn</option>
                    <option value="retail">Bán lẻ</option>
                    <option value="hospitality">Du lịch - Khách sạn</option>
                    <option value="food">Thực phẩm - Nhà hàng</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bạn thuộc khu vực</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, region: 'Miền Nam & Trung' }))}
                      className={`flex-1 px-3 py-2 rounded-lg border text-sm font-medium transition ${
                        formData.region === 'Miền Nam & Trung'
                          ? 'border-red-500 text-red-500'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      Miền Nam & Trung
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, region: 'Miền Bắc' }))}
                      className={`flex-1 px-3 py-2 rounded-lg border text-sm font-medium transition ${
                        formData.region === 'Miền Bắc'
                          ? 'border-red-500 text-red-500'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      Miền Bắc
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t-2 border-dashed border-gray-300"></div>

          {/* Consultation Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nội dung tư vấn</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bạn cần tư vấn dịch vụ, sản phẩm gì? *</label>
                  <select
                    name="services"
                    value={formData.services}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white"
                  >
                    <option value="">Chọn</option>
                    <option value="loyalty_program">Chương trình loyalty</option>
                    <option value="points_system">Hệ thống điểm</option>
                    <option value="rewards">Phần thưởng</option>
                    <option value="analytics">Phân tích dữ liệu</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giá trị sản phẩm, dịch vụ cần tư vấn *</label>
                  <select
                    name="productValue"
                    value={formData.productValue}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white"
                  >
                    <option value="">Chọn</option>
                    <option value="under_50m">Dưới 50 triệu</option>
                    <option value="50m_100m">50 - 100 triệu</option>
                    <option value="100m_500m">100 - 500 triệu</option>
                    <option value="above_500m">Trên 500 triệu</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả nhu cầu</label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Nhập mô tả nhu cầu của bạn"
                  className="border-gray-300 min-h-24"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-11 bg-red-600 hover:bg-red-700 text-white font-semibold text-base"
          >
            Đăng ký tư vấn
          </Button>
        </form>
      </div>
    </div>
  );
}
