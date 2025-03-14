"use client"

import * as React from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { StudentSidebar } from "./components/student-sidebar"
import { StudentBreadcrumb } from "./components/student-breadcrumb"
import { StudentSidebarInitializer } from "./components/student-sidebar-initializer"
import { Main } from "./components/Main"
import { Separator } from "@/components/ui/separator"
import { ErrorBoundary } from 'react-error-boundary'
import { NotFound } from '@/app/components/error'

export default function StudentsLayout() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
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