import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeInitializer } from "@/components/theme-initializer"
import { SidebarInitializer } from "@/components/sidebar-initializer"
import { NuqsProvider } from '@/components/providers/nuqs-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gym Management SaaS',
  description: 'Sistema de gestão para academias',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <NuqsProvider>
          <ThemeProvider>
            <ThemeInitializer />
            <SidebarInitializer />
              {children}
          </ThemeProvider>
        </NuqsProvider>
      </body>
    </html>
  )
}
