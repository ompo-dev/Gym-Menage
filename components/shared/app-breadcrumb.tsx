'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';

type RouteMap = {
  [key: string]: string;
};

// Mapeamento de rotas para o dashboard
const dashboardRouteMap: RouteMap = {
  dashboard: 'Dashboard',
  analytics: 'Análises',
  clients: 'Clientes',
  'clients/new': 'Novos Clientes',
  'clients/plans': 'Planos',
  employees: 'Funcionários',
  'employees/instructors': 'Instrutores',
  'employees/admin': 'Administrativo',
  equipment: 'Equipamentos',
  'equipment/maintenance': 'Manutenção',
  payments: 'Pagamentos',
  'payments/invoices': 'Faturas',
  'payments/reports': 'Relatórios de Pagamentos',
  schedule: 'Agendamentos',
  'schedule/timetable': 'Horários',
  reports: 'Relatórios',
  'reports/attendance': 'Frequência',
  'reports/performance': 'Desempenho',
  settings: 'Configurações',
  'settings/profile': 'Perfil',
  'settings/gym': 'Academia',
  'settings/plans': 'Planos',
  'settings/integrations': 'Integrações',
};

// Mapeamento de rotas para a área de estudantes
const studentRouteMap: RouteMap = {
  students: 'Área do Aluno',
  'students/profile': 'Perfil',
  'students/workouts': 'Treinos',
  'students/workouts/current': 'Meus Treinos',
  'students/workouts/history': 'Histórico de Treinos',
  'students/exercises': 'Exercícios',
  'students/measurements': 'Medidas',
  'students/evolution': 'Evolução',
  'students/photos': 'Fotos',
  'students/diet': 'Dieta',
  'students/diet/plan': 'Plano Alimentar',
  'students/diet/meals': 'Refeições',
  'students/diet/progress': 'Progresso da Dieta',
  'students/payments': 'Pagamentos',
  'students/schedule': 'Horários',
};

function AppBreadcrumbContent() {
  const router = useRouter();
  const pathname = usePathname();

  // Determina se estamos na área de dashboard ou de estudantes
  const isStudentArea = pathname.includes('/students');
  const routeMap = isStudentArea ? studentRouteMap : dashboardRouteMap;
  const baseRoute = isStudentArea ? '/students' : '/dashboard';

  // Função para navegar sem recarregar a página
  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    router.push(href);
  };

  const getBreadcrumbs = () => {
    // Remove a barra inicial e divide o pathname em segmentos
    const segments = pathname.split('/').filter(Boolean);

    // Primeiro item sempre é a rota base
    const breadcrumbs = [
      {
        href: baseRoute,
        label: routeMap[segments[0]] || segments[0],
        isLast: segments.length === 1,
      },
    ];

    // Se temos apenas um segmento, retornamos apenas o item base
    if (segments.length <= 1) {
      return breadcrumbs;
    }

    // Construímos o caminho progressivamente
    let currentPath = '';

    // Iteramos sobre os segmentos restantes
    for (let i = 1; i < segments.length; i++) {
      currentPath += `/${segments[i]}`;
      const fullPath = segments.slice(0, i + 1).join('/');
      const label = routeMap[fullPath] || segments[i];

      breadcrumbs.push({
        href: `/${fullPath}`,
        label,
        isLast: i === segments.length - 1,
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.href}>
            <BreadcrumbItem>
              {crumb.isLast ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <a
                    href={crumb.href}
                    onClick={(e) => handleNavigate(e, crumb.href)}
                    className="hover:underline"
                  >
                    {crumb.label}
                  </a>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function BreadcrumbSkeleton() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <div className="h-5 w-24 animate-pulse rounded bg-muted" />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <div className="h-5 w-20 animate-pulse rounded bg-muted" />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function AppBreadcrumb() {
  return (
    <React.Suspense fallback={<BreadcrumbSkeleton />}>
      <AppBreadcrumbContent />
    </React.Suspense>
  );
}
