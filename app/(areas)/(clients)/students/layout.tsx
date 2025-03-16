"use client"

import * as React from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { StudentSidebar } from "./components/student-sidebar"
import { StudentBreadcrumb } from "./components/student-breadcrumb"
import { StudentSidebarInitializer } from "./components/student-sidebar-initializer"
import { Main } from "./components/Main"
import { Separator } from "@/components/ui/separator"
import { ErrorBoundary } from 'react-error-boundary'
import { NotFound, UnauthorizedPage } from '@/app/error/index'

// TODO: Integrar com sistema de autenticação
const hasAccess = false // Simula verificação de acesso

export default function StudentsLayout() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Se não tiver acesso, mostra página de acesso restrito
  if (!hasAccess) {
    return (
      <UnauthorizedPage
        title="Acesso Restrito"
        message="Você precisa ser um aluno para acessar esta área."
        loginLink="/login"
        homeLink="/"
        loginButtonText="Fazer login como aluno"
        homeButtonText="Voltar para página inicial"
        supportMessage="Se você é um aluno e está vendo esta mensagem, por favor entre em contato com a academia."
      />
    )
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <StudentSidebarInitializer />
        <StudentSidebar />
        <SidebarInset className="flex w-full flex-col">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <StudentBreadcrumb />
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <ErrorBoundary
              fallback={
                <NotFound
                  title="Erro na Área do Aluno"
                  message="Ocorreu um erro ao carregar a área do aluno"
                  homeLink="/students"
                  homeButtonText="Voltar para área do aluno"
                />
              }
            >
              <Main />
            </ErrorBoundary>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
} 