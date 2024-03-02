import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './globals.css'
import { Inter } from 'next/font/google'
import BootstrapClient from '@/components/BootstrapClient'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <BootstrapClient />
        <div id="modal-root"></div>
      </body>
    </html>
  )
}
