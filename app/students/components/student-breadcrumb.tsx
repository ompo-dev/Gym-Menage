"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { ChevronRight } from "lucide-react"

const routeMap = {
  overview: "Início",
  workouts: "Treinos",
  measurements: "Medidas",
  diet: "Dieta",
  schedule: "Agenda",
  profile: "Perfil",
}

export function StudentBreadcrumb() {
  const searchParams = useSearchParams()
  const currentPage = React.useMemo(() => {
    if (searchParams.has("workouts")) return "workouts"
    if (searchParams.has("measurements")) return "measurements"
    if (searchParams.has("diet")) return "diet"
    if (searchParams.has("schedule")) return "schedule"
    if (searchParams.has("profile")) return "profile"
    return "overview"
  }, [searchParams])

  return (
    <nav className="flex items-center gap-1 text-sm">
      <span className="text-muted-foreground">Aluno</span>
      <ChevronRight className="size-4 text-muted-foreground" />
      <span>{routeMap[currentPage as keyof typeof routeMap]}</span>
    </nav>
  )
} 