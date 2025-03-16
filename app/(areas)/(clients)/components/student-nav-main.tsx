"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar"
import { Activity, Calendar, DollarSign, Dumbbell, Home, Ruler, User } from "lucide-react"

function StudentNavMainContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleNavigate = (page: string) => {
    router.push(`/students?${page}`)
  }

  return (
    <SidebarMenu>
      <SidebarMenuButton
        isActive={!searchParams.toString()}
        onClick={() => handleNavigate("")}
      >
        <Home />
        <span>Visão Geral</span>
      </SidebarMenuButton>
      <SidebarMenuButton
        isActive={searchParams.has("profile")}
        onClick={() => handleNavigate("profile")}
      >
        <User />
        <span>Perfil</span>
      </SidebarMenuButton>
      <SidebarMenuButton
        isActive={searchParams.has("workouts")}
        onClick={() => handleNavigate("workouts")}
      >
        <Dumbbell />
        <span>Treinos</span>
      </SidebarMenuButton>
      <SidebarMenuButton
        isActive={searchParams.has("measurements")}
        onClick={() => handleNavigate("measurements")}
      >
        <Ruler />
        <span>Medidas</span>
      </SidebarMenuButton>
      <SidebarMenuButton
        isActive={searchParams.has("payments")}
        onClick={() => handleNavigate("payments")}
      >
        <DollarSign />
        <span>Pagamentos</span>
      </SidebarMenuButton>
      <SidebarMenuButton
        isActive={searchParams.has("schedule")}
        onClick={() => handleNavigate("schedule")}
      >
        <Calendar />
        <span>Horários</span>
      </SidebarMenuButton>
    </SidebarMenu>
  )
}

export function StudentNavMain() {
  return (
    <Suspense>
      <StudentNavMainContent />
    </Suspense>
  )
} 