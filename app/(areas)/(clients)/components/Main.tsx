"use client"

import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState, Suspense } from "react"
import dynamic from "next/dynamic"
import { PageSkeleton } from "@/components/PageSkeleton"

type AvailablePages = "overview" | "workouts" | "measurements" | "diet" | "schedule" | "profile"

// Importação dinâmica das páginas
const DynamicPages = {
  overview: dynamic(() => import("../../page"), { 
    loading: () => <PageSkeleton />,
    ssr: false
  }),
  workouts: dynamic(() => import("../students/workouts/page"), {
    loading: () => <PageSkeleton />,
    ssr: false
  }),
  measurements: dynamic(() => import("../students/measurements/page"), {
    loading: () => <PageSkeleton />,
    ssr: false
  }),
  diet: dynamic(() => import("../students/diet/page"), {
    loading: () => <PageSkeleton />,
    ssr: false
  }),
  schedule: dynamic(() => import("../students/schedule/page"), {
    loading: () => <PageSkeleton />,
    ssr: false
  }),
  profile: dynamic(() => import("../students/profile/page"), {
    loading: () => <PageSkeleton />,
    ssr: false
  })
}

function MainContent() {
  const searchParams = useSearchParams()
  const [currentComponent, setCurrentComponent] = useState<AvailablePages>("overview")
  
  // Função para determinar qual página exibir baseado nos parâmetros de busca
  const getCurrentPage = useCallback((): AvailablePages => {
    // Verifica cada parâmetro de busca
    if (searchParams.has("workouts")) return "workouts"
    if (searchParams.has("measurements")) return "measurements"
    if (searchParams.has("diet")) return "diet"
    if (searchParams.has("schedule")) return "schedule"
    if (searchParams.has("profile")) return "profile"
    
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

export function Main() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <MainContent />
    </Suspense>
  )
} 