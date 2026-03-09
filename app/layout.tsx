import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'MyPoint - Quản lý chương trình khách hàng thân thiết',
  description: 'Xây dựng và quản lý các chương trình khách hàng thân thiết giúp tăng sự tham gia và giữ chân khách hàng. Tạo chiến dịch, quản lý phần thưởng và theo dõi hiệu suất tất cả ở một nơi.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'MyPoint - Quản lý chương trình khách hàng thân thiết',
    description: 'Xây dựng và quản lý các chương trình khách hàng thân thiết giúp tăng sự tham gia và giữ chân khách hàng.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
