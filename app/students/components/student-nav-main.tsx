"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function StudentNavMain({
  items,
}: {
  items: {
    title: string
    param: string
    icon?: LucideIcon
    items?: {
      title: string
      param: string
    }[]
  }[]
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, param: string) => {
    e.preventDefault()
    // Extrair a parte principal do parâmetro (antes do ponto)
    const mainParam = param.split(".")[0]
    // Se houver um subparâmetro, adicioná-lo à URL
    const subParam = param.split(".")[1]
    router.push(`/students?${mainParam}${subParam ? `&${subParam}` : ""}`)
  }

  const isActive = (param: string) => {
    // Extrair a parte principal do parâmetro
    const mainParam = param.split(".")[0]
    // Verificar se o parâmetro principal está presente na URL
    const hasMainParam = Array.from(searchParams.keys()).includes(mainParam)
    // Se for um subparâmetro, verificar se ele está presente
    if (param.includes(".")) {
      const subParam = param.split(".")[1]
      return hasMainParam && Array.from(searchParams.keys()).includes(subParam)
    }
    return hasMainParam
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-muted-foreground dark:text-sidebar-foreground/60">
        Menu Principal
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) =>
          item.items ? (
            <Collapsible key={item.title} asChild defaultOpen={isActive(item.param)} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton 
                    tooltip={item.title} 
                    className="text-foreground dark:text-sidebar-foreground hover:bg-accent dark:hover:bg-sidebar-accent"
                  >
                    {item.icon && <item.icon className="text-muted-foreground dark:text-sidebar-foreground/60" />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-muted-foreground dark:text-sidebar-foreground/60" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton 
                          asChild
                          className="text-muted-foreground dark:text-sidebar-foreground/80 hover:bg-accent dark:hover:bg-sidebar-accent hover:text-foreground dark:hover:text-sidebar-foreground"
                        >
                          <a href={`/students?${subItem.param.replace(".", "&")}`} onClick={(e) => handleNavigation(e, subItem.param)}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                tooltip={item.title}
                className="text-foreground dark:text-sidebar-foreground hover:bg-accent dark:hover:bg-sidebar-accent"
              >
                <a href={`/students?${item.param}`} onClick={(e) => handleNavigation(e, item.param)}>
                  {item.icon && <item.icon className="text-muted-foreground dark:text-sidebar-foreground/60" />}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
} 