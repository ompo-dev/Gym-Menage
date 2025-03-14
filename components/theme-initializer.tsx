"use client"

import { useEffect } from "react"
import { useThemeStore } from "@/lib/store/theme-store"

export function ThemeInitializer() {
  const { setTheme } = useThemeStore()

  useEffect(() => {
    // Verifica a preferência do sistema
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setTheme(prefersDark ? "dark" : "light")

    // Observa mudanças na preferência do sistema
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light")
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [setTheme])

  return null
} 