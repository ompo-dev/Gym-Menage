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
    const hues = {
      blue: "217",
      green: "142",
      red: "0",
      purple: "262",
      orange: "24",
      yellow: "41",
      pink: "322",
    }
    root.style.setProperty("--primary-hue", hues[accent as keyof typeof hues] || "217")
  }, [accent])

  return <>{children}</>
}

export { useThemeStore as useTheme }
