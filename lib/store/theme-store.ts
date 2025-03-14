import { create } from 'zustand'

type Theme = 'light' | 'dark'

interface ThemeStore {
  theme: Theme
  accent: string
  setTheme: (theme: Theme) => void
  setAccent: (accent: string) => void
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'light',
  accent: 'blue',
  setTheme: (theme: Theme) => set({ theme }),
  setAccent: (accent: string) => set({ accent }),
})) 