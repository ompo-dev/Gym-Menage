"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type RouteMap = {
  [key: string]: string
}

const routeMap: RouteMap = {
  "/dashboard": "Dashboard",
  "/dashboard/clients": "Clientes",
  "/dashboard/employees": "Funcionários",
  "/dashboard/equipment": "Equipamentos",
  "/dashboard/payments": "Pagamentos",
  "/dashboard/schedule": "Agendamentos",
  "/dashboard/reports": "Relatórios",
  "/dashboard/settings": "Configurações",
}

export function BreadcrumbNav() {
  const pathname = usePathname()

  const getBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean)
    const breadcrumbs = paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join("/")}`
      const label = routeMap[href] || path.charAt(0).toUpperCase() + path.slice(1)
      const isLast = index === paths.length - 1

      return {
        href,
        label,
        isLast,
      }
    })

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()

  if (breadcrumbs.length <= 1) return null

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.href}>
            <BreadcrumbItem>
              {crumb.isLast ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={crumb.href}>
                  {crumb.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
} 