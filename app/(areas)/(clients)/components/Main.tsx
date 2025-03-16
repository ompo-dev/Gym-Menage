'use client';

import { PageSkeleton } from '@/components/PageSkeleton';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const [currentComponent, setCurrentComponent] = useState<AvailablePages>('overview');

  useEffect(() => {
    console.log('Student Main component mounted/updated, searchParams:', searchParams.toString());
  }, [searchParams]);

  // Função para determinar qual página exibir baseado nos parâmetros de busca
  const getCurrentPage = useCallback((): AvailablePages => {
    const paramsString = searchParams.toString();
    console.log('Search Params (Student Main.tsx):', paramsString);

    // Verifica cada parâmetro de busca
    if (paramsString.includes('workouts')) return 'workouts';
    if (paramsString.includes('measurements')) return 'measurements';
    if (paramsString.includes('diet')) return 'diet';
    if (paramsString.includes('schedule')) return 'schedule';
    if (paramsString.includes('profile')) return 'profile';

    // Se não houver parâmetros, retorna a página inicial
    return 'overview';
  }, [searchParams]);

  useEffect(() => {
    const newPage = getCurrentPage();
    console.log('Student Current Component:', currentComponent, 'New Page:', newPage);

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
