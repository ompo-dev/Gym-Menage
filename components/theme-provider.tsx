"use client"

import * as React from "react"
import { useEffect } from "react"
import { useThemeStore } from "@/lib/store/theme-store"

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme, accent } = useThemeStore()

  // Aplica o tema quando montar e quando mudar
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(theme)
  }, [theme])

  // Aplica a cor de destaque quando montar e quando mudar
  useEffect(() => {
    const root = window.document.documentElement
    const colors = {
      blue: "235 40% 60%",
      green: "142 71% 45%",
      red: "0 84% 60%",
      purple: "262 83% 58%",
      orange: "24 95% 53%",
      yellow: "41 96% 50%",
      pink: "322 81% 60%",
    }
    root.style.setProperty("--primary", colors[accent as keyof typeof colors] || "235 40% 60%")
    root.style.setProperty("--ring", colors[accent as keyof typeof colors] || "235 40% 60%")
  }, [accent])

  return <>{children}</>
}

export { useThemeStore as useTheme }
