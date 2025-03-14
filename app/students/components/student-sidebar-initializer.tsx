"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useSidebarStore } from "@/lib/store/sidebar-store"

export function StudentSidebarInitializer() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const setActiveRoute = useSidebarStore((state) => state.setActiveRoute)

  useEffect(() => {
    // Construir a rota ativa baseada nos parâmetros da URL
    const params = Array.from(searchParams.entries())
    if (params.length > 0) {
      // Se houver parâmetros, construir a URL com todos eles
      const queryString = params.map(([key, value]) => `${key}${value ? `=${value}` : ""}`).join("&")
      setActiveRoute(`/students?${queryString}`)
    } else {
      // Se não houver parâmetros, usar apenas o pathname
      setActiveRoute(pathname)
    }
  }, [pathname, searchParams, setActiveRoute])

  return null
} 