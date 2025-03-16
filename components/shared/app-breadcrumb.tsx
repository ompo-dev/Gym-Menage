'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import * as React from 'react';

type RouteMap = {
  [key: string]: string;
};

// Mapeamento de rotas para o dashboard
const dashboardRouteMap: RouteMap = {
  '/dashboard': 'Dashboard',
  clients: 'Clientes',
  new: 'Novos Clientes',
  plans: 'Planos',
  employees: 'Funcionários',
  instructors: 'Instrutores',
  admin: 'Administrativo',
  equipment: 'Equipamentos',
  maintenance: 'Manutenção',
  payments: 'Pagamentos',
  invoices: 'Faturas',
  reports: 'Relatórios de Pagamentos',
  schedule: 'Agendamentos',
  timetable: 'Horários',
  attendance: 'Frequência',
  performance: 'Desempenho',
  settings: 'Configurações',
  profile: 'Perfil',
  gym: 'Academia',
  integrations: 'Integrações',
  analytics: 'Análises',
};

// Mapeamento de rotas para a área de estudantes
const studentRouteMap: RouteMap = {
  '/students': 'Área do Aluno',
  profile: 'Perfil',
  workouts: 'Treinos',
  current: 'Meus Treinos',
  history: 'Histórico de Treinos',
  exercises: 'Exercícios',
  measurements: 'Medidas',
  evolution: 'Evolução',
  photos: 'Fotos',
  diet: 'Dieta',
  plan: 'Plano Alimentar',
  meals: 'Refeições',
  progress: 'Progresso da Dieta',
  payments: 'Pagamentos',
  schedule: 'Horários',
};

function AppBreadcrumbContent() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchParams] = useQueryState('', { history: 'push' });

  // Determina se estamos na área de dashboard ou de estudantes
  const isStudentArea = pathname.includes('/students');
  const routeMap = isStudentArea ? studentRouteMap : dashboardRouteMap;
  const baseRoute = isStudentArea ? '/students' : '/dashboard';

  // Função para navegar sem recarregar a página
  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    router.push(href);
  };

  // Função para depuração
  React.useEffect(() => {
    console.log('Search Params:', searchParams);
    console.log('Pathname:', pathname);

    // Verificamos se o primeiro parâmetro está no mapa de rotas
    if (searchParams) {
      const firstParam = searchParams.split('&')[0];
      console.log('First Param:', firstParam);
      console.log('In Route Map:', !!routeMap[firstParam]);
    }
  }, [searchParams, pathname, routeMap]);

  const getBreadcrumbs = () => {
    // Primeiro item sempre é a rota base
    const breadcrumbs = [
      {
        href: baseRoute,
        label: routeMap[baseRoute],
        isLast: !searchParams,
      },
    ];

    // Se não temos parâmetros de busca, retornamos apenas o item base
    if (!searchParams) {
      return breadcrumbs;
    }

    // Obtemos todos os parâmetros de busca como string
    const queryString = searchParams;

    // Verificamos se temos um parâmetro sem valor (ex: ?clients)
    // Este é o formato específico usado na aplicação
    const mainParam = queryString.split('&')[0].split('=')[0];

    if (routeMap[mainParam]) {
      breadcrumbs.push({
        href: `${baseRoute}?${mainParam}`,
        label: routeMap[mainParam],
        isLast: queryString === mainParam,
      });
    }

    // Se temos mais parâmetros, adicionamos o segundo nível
    if (queryString.includes('&')) {
      const subParam = queryString.split('&')[1].split('=')[0];

      if (routeMap[subParam]) {
        breadcrumbs.push({
          href: `${baseRoute}?${queryString}`,
          label: routeMap[subParam],
          isLast: true,
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  // Sempre exibimos o breadcrumb, mesmo que tenha apenas um item
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

export function AppBreadcrumb() {
  return (
    <React.Suspense fallback={<div>Carregando...</div>}>
      <AppBreadcrumbContent />
    </React.Suspense>
  );
}
