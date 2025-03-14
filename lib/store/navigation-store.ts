import { parseAsString, useQueryState } from 'nuqs'

// Tipos de páginas disponíveis
export type DashboardPage = 
  | 'overview'
  | 'clients'
  | 'employees'
  | 'equipment'
  | 'payments'
  | 'reports'
  | 'schedule'

const validPages: DashboardPage[] = [
  'overview',
  'clients',
  'employees',
  'equipment',
  'payments',
  'reports',
  'schedule'
]

// Hook para gerenciar a navegação
export function useNavigation() {
  const [page, setPage] = useQueryState(
    'page',
    parseAsString.withDefault('overview')
  )

  const validPage = validPages.includes(page as DashboardPage) ? page as DashboardPage : 'overview'

  return {
    currentPage: validPage,
    navigate: (newPage: DashboardPage) => setPage(newPage),
    isActive: (pageName: DashboardPage) => validPage === pageName
  }
} 