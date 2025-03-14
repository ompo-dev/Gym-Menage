"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useSidebarStore } from "@/lib/store/sidebar-store"
import { Suspense } from "react"

function StudentSidebarInitializerContent() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { setActiveRoute } = useSidebarStore()

  useEffect(() => {
    // Atualiza a rota ativa com base no pathname e searchParams
    setActiveRoute(pathname + (searchParams.toString() ? `?${searchParams.toString()}` : ""))
  }, [pathname, searchParams, setActiveRoute])

  return null
}

export function StudentSidebarInitializer() {
  return (
    <Suspense>
      <StudentSidebarInitializerContent />
    </Suspense>
  )
} 