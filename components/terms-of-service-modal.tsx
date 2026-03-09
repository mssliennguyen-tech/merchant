'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, AlertCircle } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline?: () => void;
}

export function TermsOfServiceModal({ isOpen, onAccept, onDecline }: TermsModalProps) {
  const [isChecked, setIsChecked] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-2xl border border-border bg-card">
        <CardHeader className="border-b border-border">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Điều khoản sử dụng dịch vụ</CardTitle>
              <CardDescription className="mt-2">
                Vui lòng đọc và đồng ý với các điều khoản dưới đây
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="py-6">
          {/* Alert */}
          <div className="mb-6 flex gap-3 rounded-lg bg-red-50 p-4 dark:bg-red-950/30">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 dark:text-red-400">
              Vui lòng đăng nhập thành công với tư cách nhà bán lẻ. Bạn phải đồng ý với các điều khoản để tiếp tục sử dụng hệ thống.
            </p>
          </div>

          {/* Terms Content */}
          <div className="max-h-96 overflow-y-auto space-y-4 text-sm text-muted-foreground">
            <section>
              <h3 className="font-semibold text-foreground mb-2">1. Quyền và trách nhiệm của nhà bán lẻ</h3>
              <p>
                Nhà bán lẻ cam kết tuân thủ các quy định pháp luật hiện hành và không sử dụng dịch vụ MyPoint cho bất kỳ mục đích bất hợp pháp nào.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">2. Dữ liệu khách hàng</h3>
              <p>
                Nhà bán lẻ chịu trách nhiệm bảo vệ thông tin cá nhân của khách hàng. MyPoint sẽ xử lý dữ liệu theo chính sách bảo mật của chúng tôi.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">3. Chương trình khách hàng thân thiết</h3>
              <p>
                Nhà bán lẻ tự chịu trách nhiệm thiết kế và quản lý chương trình khách hàng thân thiết của mình. MyPoint chỉ cung cấp công cụ để hỗ trợ việc này.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">4. Thanh toán và hóa đơn</h3>
              <p>
                Nhà bán lẻ cam kết thanh toán đầy đủ và đúng hạn cho các dịch vụ được cung cấp. Chúng tôi sẽ cấp hóa đơn hàng tháng.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">5. Giới hạn trách nhiệm</h3>
              <p>
                MyPoint không chịu trách nhiệm cho bất kỳ thiệt hại gián tiếp nào phát sinh từ việc sử dụng hoặc không thể sử dụng dịch vụ của chúng tôi.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">6. Chấm dứt dịch vụ</h3>
              <p>
                MyPoint có quyền chấm dứt tài khoản nếu nhà bán lẻ vi phạm các điều khoản này hoặc sử dụng dịch vụ một cách bất thích hợp.
              </p>
            </section>
          </div>

          {/* Checkbox */}
          <div className="mt-6 flex items-start gap-3 border-t border-border pt-6">
            <input
              type="checkbox"
              id="terms-agree"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-border cursor-pointer"
            />
            <label htmlFor="terms-agree" className="text-sm text-muted-foreground cursor-pointer">
              Tôi đã đọc và đồng ý với các Điều khoản sử dụng dịch vụ của MyPoint
            </label>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            {onDecline && (
              <Button
                variant="outline"
                onClick={onDecline}
                className="flex-1"
              >
                Từ chối
              </Button>
            )}
            <Button
              onClick={onAccept}
              disabled={!isChecked}
              className="flex-1 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Đồng ý và tiếp tục
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
