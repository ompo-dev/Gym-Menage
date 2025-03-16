'use client';

import { AppBreadcrumb } from '@/components/shared/app-breadcrumb';
import { AppSidebar } from '@/components/shared/app-sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import {
  BarChart3,
  Building2,
  Calendar,
  DollarSign,
  Dumbbell,
  GraduationCap,
  Home,
  Settings,
  UserCog,
  Users,
  Warehouse,
} from 'lucide-react';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { NotFound } from '../../error';
import { Main } from '../components/Main';

// Dados de exemplo
const dashboardData = {
  user: {
    name: 'João Silva',
    email: 'joao.silva@fitmanager.com',
    avatar: '/placeholder.svg?height=32&width=32',
    role: 'admin' as const,
  },
  academias: [
    {
      name: 'Academia Central',
      logo: Building2,
      plan: 'Empresarial',
    },
    {
      name: 'Academia Fitness',
      logo: Warehouse,
      plan: 'Profissional',
    },
    {
      name: 'Studio Pilates',
      logo: GraduationCap,
      plan: 'Básico',
    },
  ],
  navItems: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: Home,
      isActive: true,
      items: [
        {
          title: 'Visão Geral',
          url: '/dashboard',
        },
        {
          title: 'Análises',
          url: '/dashboard?analytics',
        },
        {
          title: 'Relatórios',
          url: '/dashboard?reports',
        },
      ],
    },
    {
      title: 'Clientes',
      url: '/dashboard?clients',
      icon: Users,
      items: [
        {
          title: 'Todos os Clientes',
          url: '/dashboard?clients',
        },
        {
          title: 'Novos Clientes',
          url: '/dashboard?clients&new',
        },
        {
          title: 'Planos',
          url: '/dashboard?clients&plans',
        },
      ],
    },
    {
      title: 'Funcionários',
      url: '/dashboard?employees',
      icon: UserCog,
      items: [
        {
          title: 'Todos os Funcionários',
          url: '/dashboard?employees',
        },
        {
          title: 'Instrutores',
          url: '/dashboard?employees&instructors',
        },
        {
          title: 'Administrativo',
          url: '/dashboard?employees&admin',
        },
      ],
    },
    {
      title: 'Equipamentos',
      url: '/dashboard?equipment',
      icon: Dumbbell,
      items: [
        {
          title: 'Inventário',
          url: '/dashboard?equipment',
        },
        {
          title: 'Manutenção',
          url: '/dashboard?equipment&maintenance',
        },
      ],
    },
    {
      title: 'Pagamentos',
      url: '/dashboard?payments',
      icon: DollarSign,
      items: [
        {
          title: 'Mensalidades',
          url: '/dashboard?payments',
        },
        {
          title: 'Faturas',
          url: '/dashboard?payments&invoices',
        },
        {
          title: 'Relatórios',
          url: '/dashboard?payments&reports',
        },
      ],
    },
    {
      title: 'Agendamentos',
      url: '/dashboard?schedule',
      icon: Calendar,
      items: [
        {
          title: 'Aulas',
          url: '/dashboard?schedule',
        },
        {
          title: 'Horários',
          url: '/dashboard?schedule&timetable',
        },
      ],
    },
    {
      title: 'Relatórios',
      url: '/dashboard?reports',
      icon: BarChart3,
      items: [
        {
          title: 'Financeiro',
          url: '/dashboard?reports',
        },
        {
          title: 'Frequência',
          url: '/dashboard?reports&attendance',
        },
        {
          title: 'Desempenho',
          url: '/dashboard?reports&performance',
        },
      ],
    },
    {
      title: 'Configurações',
      url: '/dashboard?settings',
      icon: Settings,
      items: [
        {
          title: 'Perfil',
          url: '/dashboard?settings&profile',
        },
        {
          title: 'Academia',
          url: '/dashboard?settings&gym',
        },
        {
          title: 'Planos',
          url: '/dashboard?settings&plans',
        },
        {
          title: 'Integrações',
          url: '/dashboard?settings&integrations',
        },
      ],
    },
  ],
};

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar
          userRole="admin"
          user={dashboardData.user}
          academias={dashboardData.academias}
          navItems={dashboardData.navItems}
        />
        <SidebarInset className="flex w-full flex-col">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <AppBreadcrumb />
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
  );
}
