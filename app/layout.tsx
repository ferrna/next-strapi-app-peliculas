import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './globals.css'
import { Inter } from 'next/font/google'
import BootstrapClient from '@/components/BootstrapClient'
import { AuthProvider } from '@/context/ContextAuth'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <BootstrapClient />
        </AuthProvider>
        <div id="modal-root"></div>
      </body>
    </html>
  )
}
