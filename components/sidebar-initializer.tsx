"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { useSidebarStore } from "@/lib/store/sidebar-store"

export function SidebarInitializer() {
  const pathname = usePathname()
  const setActiveRoute = useSidebarStore((state) => state.setActiveRoute)

  useEffect(() => {
    // Atualiza a rota ativa sempre que o pathname mudar
    setActiveRoute(pathname)
  }, [pathname, setActiveRoute])

  return null
} 