import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeInitializer } from "@/components/theme-initializer"
import { SidebarInitializer } from "@/components/sidebar-initializer"
import { NuqsProvider } from '@/components/providers/nuqs-provider'
import { ErrorBoundary } from 'react-error-boundary'
import { NotFound } from '@/app/components/error'

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
            <ErrorBoundary
              fallback={
                <NotFound
                  title="Erro inesperado"
                  message="Ocorreu um erro ao carregar a aplicação"
                  homeLink="/"
                  homeButtonText="Voltar para o início"
                />
              }
            >
              {children}
            </ErrorBoundary>
          </ThemeProvider>
        </NuqsProvider>
      </body>
    </html>
  )
}
