'use client';

import { PageSkeleton } from '@/components/PageSkeleton';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const [currentComponent, setCurrentComponent] = useState<AvailablePages>('overview');

  // Adicionar um useEffect para capturar mudanças na URL
  useEffect(() => {
    console.log('Dashboard Main component mounted/updated, searchParams:', searchParams.toString());
  }, [searchParams]);

  // Função para determinar qual página exibir baseado nos parâmetros de busca
  const getCurrentPage = useCallback((): AvailablePages => {
    const paramsString = searchParams.toString();
    console.log('Search Params (Dashboard Main.tsx):', paramsString);

    // Verificar cada parâmetro
    if (paramsString.includes('clients')) return 'clients';
    if (paramsString.includes('employees')) return 'employees';
    if (paramsString.includes('equipment')) return 'equipment';
    if (paramsString.includes('payments')) return 'payments';
    if (paramsString.includes('reports')) return 'reports';
    if (paramsString.includes('schedule')) return 'schedule';

    // Se não houver parâmetros, retorna a página inicial
    return 'overview';
  }, [searchParams]);

  useEffect(() => {
    const newPage = getCurrentPage();
    console.log('Dashboard Current Component:', currentComponent, 'New Page:', newPage);

    // Só atualiza se for diferente para evitar loops
    if (newPage !== currentComponent) {
      setCurrentComponent(newPage);
    }
  }, [getCurrentPage, currentComponent]);

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
