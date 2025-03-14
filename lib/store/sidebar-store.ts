import { create } from 'zustand'

interface SidebarState {
  // Estado de expansão da sidebar
  isOpen: boolean
  // Rota atual ativa
  activeRoute: string
  // Menus expandidos (submenus)
  expandedMenus: string[]
  // Ações
  setOpen: (isOpen: boolean) => void
  setActiveRoute: (route: string) => void
  toggleMenu: (menuId: string) => void
  isMenuExpanded: (menuId: string) => boolean
  isRouteActive: (route: string) => boolean
}

export const useSidebarStore = create<SidebarState>((set, get) => ({
  isOpen: true,
  activeRoute: '',
  expandedMenus: [],

  setOpen: (isOpen) => set({ isOpen }),

  setActiveRoute: (route) => {
    set({ activeRoute: route })
    // Quando uma rota é ativada, expande automaticamente o menu pai
    const parentMenu = route.split('/')[2] // Pega o segundo segmento da rota (/dashboard/clients -> clients)
    if (parentMenu && !get().expandedMenus.includes(parentMenu)) {
      set((state) => ({
        expandedMenus: [...state.expandedMenus, parentMenu]
      }))
    }
  },

  toggleMenu: (menuId) => {
    set((state) => ({
      expandedMenus: state.expandedMenus.includes(menuId)
        ? state.expandedMenus.filter(id => id !== menuId)
        : [...state.expandedMenus, menuId]
    }))
  },

  isMenuExpanded: (menuId) => {
    return get().expandedMenus.includes(menuId)
  },

  isRouteActive: (route) => {
    const currentRoute = get().activeRoute
    // Verifica se a rota atual começa com a rota fornecida
    // Isso permite que /dashboard/clients/1 ainda mantenha /dashboard/clients ativo
    return currentRoute.startsWith(route)
  }
})) 