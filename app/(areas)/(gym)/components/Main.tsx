'use client';

import { PageSkeleton } from '@/components/PageSkeleton';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';

type AvailablePages =
  | 'overview'
  | 'clients'
  | 'employees'
  | 'equipment'
  | 'payments'
  | 'reports'
  | 'schedule'
  | 'settings'
  | 'analytics';

// Importação dinâmica das páginas
const DynamicPages = {
  overview: dynamic(() => import('../dashboard/page'), {
    loading: () => <PageSkeleton />,
    ssr: false,
  }),
  analytics: dynamic(() => import('../dashboard/analytics/page'), {
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
  settings: dynamic(() => import('../dashboard/settings/page'), {
    loading: () => <PageSkeleton />,
    ssr: false,
  }),
};

function MainContent() {
  const pathname = usePathname();
  const [currentComponent, setCurrentComponent] = useState<AvailablePages>('overview');

  // Função para determinar qual página exibir baseado no pathname
  const getCurrentPage = useCallback((): AvailablePages => {
    // Remove o prefixo /dashboard se existir
    const path = pathname.replace('/dashboard', '').split('/')[1] || '';

    // Mapeia os caminhos para os componentes correspondentes
    switch (path) {
      case 'clients':
        return 'clients';
      case 'employees':
        return 'employees';
      case 'equipment':
        return 'equipment';
      case 'payments':
        return 'payments';
      case 'reports':
        return 'reports';
      case 'schedule':
        return 'schedule';
      case 'settings':
        return 'settings';
      case 'analytics':
        return 'analytics';
      default:
        return 'overview';
    }
  }, [pathname]);

  useEffect(() => {
    const newPage = getCurrentPage();

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
