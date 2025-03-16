"use client"

import { Building2, Forward, MoreHorizontal, Trash2, Edit, type LucideIcon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavAcademias({
  academias,
}: {
  academias: {
    name: string
    logo: LucideIcon
    plan: string
  }[]
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="text-muted-foreground dark:text-sidebar-foreground/60">
        Minhas Academias
      </SidebarGroupLabel>
      <SidebarMenu>
        {academias.map((academia) => (
          <SidebarMenuItem key={academia.name}>
            <SidebarMenuButton asChild className="text-foreground dark:text-sidebar-foreground hover:bg-accent dark:hover:bg-sidebar-accent">
              <a href="#">
                <Building2 className="text-muted-foreground dark:text-sidebar-foreground/60" />
                <span>{academia.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover className="text-muted-foreground dark:text-sidebar-foreground/60">
                  <MoreHorizontal />
                  <span className="sr-only">Mais</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Building2 className="text-muted-foreground dark:text-muted-foreground" />
                  <span>Ver Academia</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="text-muted-foreground dark:text-muted-foreground" />
                  <span>Editar Academia</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Forward className="text-muted-foreground dark:text-muted-foreground" />
                  <span>Compartilhar</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="text-destructive" />
                  <span>Excluir Academia</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-muted-foreground dark:text-sidebar-foreground/60 hover:bg-accent dark:hover:bg-sidebar-accent">
            <MoreHorizontal />
            <span>Mais Academias</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

