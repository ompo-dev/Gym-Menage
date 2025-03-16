'use client';

import { PageSkeleton } from '@/components/PageSkeleton';
import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';
import { Suspense, useCallback, useEffect, useState } from 'react';

type AvailablePages =
  | 'overview'
  | 'clients'
  | 'employees'
  | 'equipment'
  | 'payments'
  | 'reports'
  | 'schedule';

// Importação dinâmica das páginas
const DynamicPages = {
  overview: dynamic(() => import('../dashboard/page'), {
    loading: () => <PageSkeleton />,
    ssr: false,
  }),
  clients: dynamic(() => import('../dashboard/clients/page'), {
    loading: () => <PageSkeleton />,
    ssr: false,
  }),
  employees: dynamic(() => import('../dashboard/employees/page'), {
    loading: () => <PageSkeleton />,
    ssr: false,
  }),
  equipment: dynamic(() => import('../dashboard/equipment/page'), {
    loading: () => <PageSkeleton />,
    ssr: false,
  }),
  payments: dynamic(() => import('../dashboard/payments/page'), {
    loading: () => <PageSkeleton />,
    ssr: false,
  }),
  reports: dynamic(() => import('../dashboard/reports/page'), {
    loading: () => <PageSkeleton />,
    ssr: false,
  }),
  schedule: dynamic(() => import('../dashboard/schedule/page'), {
    loading: () => <PageSkeleton />,
    ssr: false,
  }),
};

function MainContent() {
  const [searchParams] = useQueryState('', { history: 'push' });
  const [currentComponent, setCurrentComponent] = useState<AvailablePages>('overview');

  // Função para determinar qual página exibir baseado nos parâmetros de busca
  const getCurrentPage = useCallback((): AvailablePages => {
    // Verifica cada parâmetro de busca
    if (searchParams?.includes('clients')) return 'clients';
    if (searchParams?.includes('employees')) return 'employees';
    if (searchParams?.includes('equipment')) return 'equipment';
    if (searchParams?.includes('payments')) return 'payments';
    if (searchParams?.includes('reports')) return 'reports';
    if (searchParams?.includes('schedule')) return 'schedule';

    // Se não houver parâmetros, retorna a página inicial
    return 'overview';
  }, [searchParams]);

  useEffect(() => {
    const newPage = getCurrentPage();
    setCurrentComponent(newPage);
  }, [getCurrentPage]);

  const PageComponent = DynamicPages[currentComponent];

  return (
    <div className="container p-4 md:p-6">
      <PageComponent />
    </div>
  );
}

export function Main() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <MainContent />
    </Suspense>
  );
}
