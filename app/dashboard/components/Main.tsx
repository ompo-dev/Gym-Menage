"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { PageSkeleton } from "./PageSkeleton"

type AvailablePages = "overview" | "clients" | "employees" | "equipment" | "payments" | "reports" | "schedule"

// Importação dinâmica das páginas
const DynamicPages = {
  overview: dynamic(() => import("../page"), { 
    loading: () => <PageSkeleton />,
    ssr: false
  }),
  clients: dynamic(() => import("../clients/page"), {
    loading: () => <PageSkeleton />,
    ssr: false
  }),
  employees: dynamic(() => import("../employees/page"), {
    loading: () => <PageSkeleton />,
    ssr: false
  }),
  equipment: dynamic(() => import("../equipment/page"), {
    loading: () => <PageSkeleton />,
    ssr: false
  }),
  payments: dynamic(() => import("../payments/page"), {
    loading: () => <PageSkeleton />,
    ssr: false
  }),
  reports: dynamic(() => import("../reports/page"), {
    loading: () => <PageSkeleton />,
    ssr: false
  }),
  schedule: dynamic(() => import("../schedule/page"), {
    loading: () => <PageSkeleton />,
    ssr: false
  })
}

export function Main() {
  const searchParams = useSearchParams()
  const [currentComponent, setCurrentComponent] = useState<AvailablePages>("overview")
  
  // Função para determinar qual página exibir baseado nos parâmetros de busca
  const getCurrentPage = useCallback((): AvailablePages => {
    // Verifica cada parâmetro de busca
    if (searchParams.has("clients")) return "clients"
    if (searchParams.has("employees")) return "employees"
    if (searchParams.has("equipment")) return "equipment"
    if (searchParams.has("payments")) return "payments"
    if (searchParams.has("reports")) return "reports"
    if (searchParams.has("schedule")) return "schedule"
    
    // Se não houver parâmetros, retorna a página inicial
    return "overview"
  }, [searchParams])

  useEffect(() => {
    const newPage = getCurrentPage()
    setCurrentComponent(newPage)
  }, [getCurrentPage])

  const PageComponent = DynamicPages[currentComponent]

  return (
    <div className="container p-4 md:p-6">
      <PageComponent />
    </div>
  )
} 