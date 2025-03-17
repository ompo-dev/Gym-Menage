'use client';

import { AppBreadcrumb } from '@/components/shared/app-breadcrumb';
import { AppSidebar } from '@/components/shared/app-sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import {
  Activity,
  Apple,
  BarChart2,
  Calendar,
  DollarSign,
  Dumbbell,
  Home,
  LineChart,
  Ruler,
  Target,
  Timer,
  TrendingUp,
  User,
} from 'lucide-react';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { NotFound, UnauthorizedPage } from '../../error';
import { Main } from '../components/Main';

// Dados de exemplo para o estudante
const studentData = {
  user: {
    name: 'João Silva',
    email: 'joao.silva@email.com',
    avatar: '/placeholder.svg?height=32&width=32',
    since: '2023',
    role: 'student' as const,
  },
  navItems: [
    {
      title: 'Visão Geral',
      param: undefined,
      icon: Home,
    },
    {
      title: 'Treinos',
      param: 'workouts',
      icon: Dumbbell,
      items: [
        {
          title: 'Meus Treinos',
          param: 'workouts',
        },
        {
          title: 'Histórico',
          param: 'workouts.history',
        },
        {
          title: 'Exercícios',
          param: 'workouts.exercises',
        },
      ],
    },
    {
      title: 'Medidas',
      param: 'measurements',
      icon: LineChart,
      items: [
        {
          title: 'Evolução',
          param: 'measurements',
        },
        {
          title: 'Histórico',
          param: 'measurements.history',
        },
        {
          title: 'Fotos',
          param: 'measurements.photos',
        },
      ],
    },
    {
      title: 'Dieta',
      param: 'diet',
      icon: Apple,
      items: [
        {
          title: 'Plano Alimentar',
          param: 'diet',
        },
        {
          title: 'Refeições',
          param: 'diet.meals',
        },
        {
          title: 'Progresso',
          param: 'diet.progress',
        },
      ],
    },
    {
      title: 'Pagamentos',
      param: 'payments',
      icon: DollarSign,
    },
    {
      title: 'Horários',
      param: 'schedule',
      icon: Calendar,
    },
  ],
  stats: [
    {
      name: 'Treino do Dia',
      value: 'Treino A - Superior',
      progress: 65,
      icon: Dumbbell,
      details: [
        { icon: Timer, label: 'Horário', value: '16:00' },
        { icon: Activity, label: 'Intensidade', value: 'Moderada' },
        { icon: Calendar, label: 'Duração', value: '60 min' },
      ],
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      name: 'Meta de Peso',
      value: '75.5kg',
      progress: 40,
      icon: Target,
      details: [
        { icon: Target, label: 'Meta', value: '73kg' },
        { icon: BarChart2, label: 'Variação', value: '-2.5kg' },
        { icon: Calendar, label: 'Prazo', value: '2 meses' },
      ],
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      name: 'Evolução Geral',
      value: 'Bom progresso',
      progress: 78,
      icon: TrendingUp,
      details: [
        { icon: Activity, label: 'Streak', value: '5 dias' },
        { icon: Target, label: 'Objetivos', value: '7/9' },
        { icon: Calendar, label: 'Desde', value: 'Jan/24' },
      ],
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
  ],
};

// TODO: Integrar com sistema de autenticação
const hasAccess = false; // Simula verificação de acesso

export default function StudentsLayout() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Se não tiver acesso, mostra página de acesso restrito
  if (!hasAccess) {
    return (
      <UnauthorizedPage
        title="Acesso Restrito"
        message="Você precisa ser um aluno para acessar esta área."
        loginLink="/login"
        homeLink="/"
        loginButtonText="Fazer login como aluno"
        homeButtonText="Voltar para página inicial"
        supportMessage="Se você é um aluno e está vendo esta mensagem, por favor entre em contato com a academia."
      />
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar
          userRole="student"
          user={studentData.user}
          navItems={studentData.navItems}
          stats={studentData.stats}
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
  );
}
