'use client';

import { PageSkeleton } from '@/components/PageSkeleton';
import dynamic from 'next/dynamic';
import { useQueryState } from 'nuqs';
import { Suspense, useCallback, useEffect, useState } from 'react';

type AvailablePages = 'overview' | 'workouts' | 'measurements' | 'diet' | 'schedule' | 'profile';

// Importação dinâmica das páginas
const DynamicPages = {
  overview: dynamic(() => import('../students/page'), {
    loading: () => <PageSkeleton />,
    ssr: false,
  }),
  workouts: dynamic(() => import('../students/workouts/page'), {
    loading: () => <PageSkeleton />,
    ssr: false,
  }),
  measurements: dynamic(() => import('../students/measurements/page'), {
    loading: () => <PageSkeleton />,
    ssr: false,
  }),
  diet: dynamic(() => import('../students/diet/page'), {
    loading: () => <PageSkeleton />,
    ssr: false,
  }),
  schedule: dynamic(() => import('../students/schedule/page'), {
    loading: () => <PageSkeleton />,
    ssr: false,
  }),
  profile: dynamic(() => import('../students/profile/page'), {
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
    if (searchParams?.includes('workouts')) return 'workouts';
    if (searchParams?.includes('measurements')) return 'measurements';
    if (searchParams?.includes('diet')) return 'diet';
    if (searchParams?.includes('schedule')) return 'schedule';
    if (searchParams?.includes('profile')) return 'profile';

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
