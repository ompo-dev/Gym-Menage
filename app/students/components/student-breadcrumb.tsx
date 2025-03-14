"use client"

import { Fragment } from "react"
import { useSearchParams } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { Suspense } from "react"

const breadcrumbMap = {
  overview: "Visão Geral",
  profile: "Perfil",
  workouts: "Treinos",
  measurements: "Medidas",
  payments: "Pagamentos",
  schedule: "Horários",
}

function StudentBreadcrumbContent() {
  const searchParams = useSearchParams()
  const currentPage = Object.keys(breadcrumbMap).find((key) => searchParams.has(key)) || "overview"

  return (
    <div className="flex items-center gap-1 text-sm">
      <span>Área do Aluno</span>
      <ChevronRight className="h-4 w-4" />
      <span>{breadcrumbMap[currentPage as keyof typeof breadcrumbMap]}</span>
    </div>
  )
}

export function StudentBreadcrumb() {
  return (
    <Suspense>
      <StudentBreadcrumbContent />
    </Suspense>
  )
} 