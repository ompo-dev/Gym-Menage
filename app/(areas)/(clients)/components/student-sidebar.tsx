"use client"

import type * as React from "react"
import {
  Dumbbell,
  LineChart,
  Apple,
  Calendar,
  User,
} from "lucide-react"

import { StudentNavMain } from "./student-nav-main"
import { StudentNavUser } from "./student-nav-user"
import { StudentQuickStats } from "./student-quick-stats"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar"
import { useSidebarStore } from "@/lib/store/sidebar-store"
import { cn } from "@/lib/utils"

// Dados de exemplo
const data = {
  user: {
    name: "João Silva",
    email: "joao.silva@email.com",
    avatar: "/placeholder.svg?height=32&width=32",
    since: "2023"
  },
  navMain: [
    {
      title: "Treinos",
      param: "workouts",
      icon: Dumbbell,
      items: [
        {
          title: "Meus Treinos",
          param: "workouts.current",
        },
        {
          title: "Histórico",
          param: "workouts.history",
        },
        {
          title: "Exercícios",
          param: "workouts.exercises",
        },
      ],
    },
    {
      title: "Medidas",
      param: "measurements",
      icon: LineChart,
      items: [
        {
          title: "Evolução",
          param: "measurements.evolution",
        },
        {
          title: "Histórico",
          param: "measurements.history",
        },
        {
          title: "Fotos",
          param: "measurements.photos",
        },
      ],
    },
    {
      title: "Dieta",
      param: "diet",
      icon: Apple,
      items: [
        {
          title: "Plano Alimentar",
          param: "diet.plan",
        },
        {
          title: "Refeições",
          param: "diet.meals",
        },
        {
          title: "Progresso",
          param: "diet.progress",
        },
      ],
    },
    {
      title: "Agenda",
      param: "schedule",
      icon: Calendar,
      items: [
        {
          title: "Aulas",
          param: "schedule.classes",
        },
        {
          title: "Personal",
          param: "schedule.personal",
        },
        {
          title: "Histórico",
          param: "schedule.history",
        },
      ],
    },
    {
      title: "Perfil",
      param: "profile",
      icon: User,
      items: [
        {
          title: "Meus Dados",
          param: "profile.info",
        },
        {
          title: "Objetivos",
          param: "profile.goals",
        },
        {
          title: "Configurações",
          param: "profile.settings",
        },
      ],
    },
  ],
}

export function StudentSidebar({ className, ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar 
      collapsible="icon" 
      className={cn(
        "bg-background border-r border-border dark:bg-sidebar-background dark:border-sidebar-border",
        className
      )}
      {...props}
    >
      <SidebarHeader className="flex flex-col gap-2">
        <div className="flex items-center gap-2 px-6 font-semibold">
          <Dumbbell className="h-6 w-6" />
          <span className="text-xl">Academia XYZ</span>
        </div>
        <StudentQuickStats />
      </SidebarHeader>
      <SidebarContent>
        <StudentNavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="border-t border-border dark:border-sidebar-border">
        <StudentNavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
} 