"use client"

import type * as React from "react"
import {
  BarChart3,
  Users,
  Calendar,
  Settings,
  Home,
  DollarSign,
  UserCog,
  Dumbbell,
  Building2,
  Warehouse,
  GraduationCap,
} from "lucide-react"

import { NavMain } from "@/components/SideBar/nav-main"
import { NavAcademias } from "@/components/SideBar/nav-academias"
import { NavUser } from "@/components/SideBar/nav-user"
import { AcademiaSwitcher } from "@/components/academia-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

// Dados de exemplo
const data = {
  user: {
    name: "João Silva",
    email: "joao.silva@fitmanager.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  academias: [
    {
      name: "Academia Central",
      logo: Building2,
      plan: "Empresarial",
    },
    {
      name: "Academia Fitness",
      logo: Warehouse,
      plan: "Profissional",
    },
    {
      name: "Studio Pilates",
      logo: GraduationCap,
      plan: "Básico",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
      items: [
        {
          title: "Visão Geral",
          url: "/dashboard",
        },
        {
          title: "Análises",
          url: "/dashboard?analytics",
        },
        {
          title: "Relatórios",
          url: "/dashboard?reports",
        },
      ],
    },
    {
      title: "Clientes",
      url: "/dashboard?clients",
      icon: Users,
      items: [
        {
          title: "Todos os Clientes",
          url: "/dashboard?clients",
        },
        {
          title: "Novos Clientes",
          url: "/dashboard?clients&new",
        },
        {
          title: "Planos",
          url: "/dashboard?clients&plans",
        },
      ],
    },
    {
      title: "Funcionários",
      url: "/dashboard?employees",
      icon: UserCog,
      items: [
        {
          title: "Todos os Funcionários",
          url: "/dashboard?employees",
        },
        {
          title: "Instrutores",
          url: "/dashboard?employees&instructors",
        },
        {
          title: "Administrativo",
          url: "/dashboard?employees&admin",
        },
      ],
    },
    {
      title: "Equipamentos",
      url: "/dashboard?equipment",
      icon: Dumbbell,
      items: [
        {
          title: "Inventário",
          url: "/dashboard?equipment",
        },
        {
          title: "Manutenção",
          url: "/dashboard?equipment&maintenance",
        },
      ],
    },
    {
      title: "Pagamentos",
      url: "/dashboard?payments",
      icon: DollarSign,
      items: [
        {
          title: "Mensalidades",
          url: "/dashboard?payments",
        },
        {
          title: "Faturas",
          url: "/dashboard?payments&invoices",
        },
        {
          title: "Relatórios",
          url: "/dashboard?payments&reports",
        },
      ],
    },
    {
      title: "Agendamentos",
      url: "/dashboard?schedule",
      icon: Calendar,
      items: [
        {
          title: "Aulas",
          url: "/dashboard?schedule",
        },
        {
          title: "Horários",
          url: "/dashboard?schedule&timetable",
        },
      ],
    },
    {
      title: "Relatórios",
      url: "/dashboard?reports",
      icon: BarChart3,
      items: [
        {
          title: "Financeiro",
          url: "/dashboard?reports",
        },
        {
          title: "Frequência",
          url: "/dashboard?reports&attendance",
        },
        {
          title: "Desempenho",
          url: "/dashboard?reports&performance",
        },
      ],
    },
    {
      title: "Configurações",
      url: "/dashboard?settings",
      icon: Settings,
      items: [
        {
          title: "Perfil",
          url: "/dashboard?settings&profile",
        },
        {
          title: "Academia",
          url: "/dashboard?settings&gym",
        },
        {
          title: "Planos",
          url: "/dashboard?settings&plans",
        },
        {
          title: "Integrações",
          url: "/dashboard?settings&integrations",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar 
      collapsible="icon" 
      className="bg-background border-r border-border dark:bg-sidebar-background dark:border-sidebar-border" 
      {...props}
    >
      <SidebarHeader className="border-b border-border dark:border-sidebar-border">
        <AcademiaSwitcher academias={data.academias} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavAcademias academias={data.academias} />
      </SidebarContent>
      <SidebarFooter className="border-t border-border dark:border-sidebar-border">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

