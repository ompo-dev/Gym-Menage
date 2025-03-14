"use client"

import * as React from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Main } from "./components/Main"
import { ErrorBoundary } from 'react-error-boundary'
import { NotFound } from '@/app/error'

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex w-full flex-col">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <BreadcrumbNav />
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <ErrorBoundary
              fallback={
                <NotFound
                  title="Erro no Dashboard"
                  message="Ocorreu um erro ao carregar o dashboard"
                  homeLink="/dashboard"
                  homeButtonText="Voltar para o dashboard"
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

