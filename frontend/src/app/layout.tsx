import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Chatbot from '../components/Chatbot'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from '@/context/ThemeContext'
import Navbar from '../components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Job Portal | Advanced Career Platform',
  description: 'AI-Powered Job Portal with Resume Analysis, Mock Interviews, and Career Assistant.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-theme-bg text-theme-text transition-colors duration-300`}>
        <AuthProvider>
          <ThemeProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Chatbot />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
