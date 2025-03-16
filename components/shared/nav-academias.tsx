'use client';

import { Building2, Edit, Forward, type LucideIcon, MoreHorizontal, Trash2 } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import type { SidebarAcademiaData } from './app-sidebar';

export function NavAcademias({
  academias,
}: {
  academias: SidebarAcademiaData[];
}) {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="text-muted-foreground dark:text-sidebar-foreground/60">
        Minhas Academias
      </SidebarGroupLabel>
      <SidebarMenu>
        {academias.map((academia) => (
          <SidebarMenuItem key={academia.name}>
            <SidebarMenuButton
              asChild
              className="text-foreground dark:text-sidebar-foreground hover:bg-accent dark:hover:bg-sidebar-accent"
            >
              <a href={`/academias/${academia.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <Building2 className="text-muted-foreground dark:text-sidebar-foreground/60" />
                <span>{academia.name}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  showOnHover
                  className="text-muted-foreground dark:text-sidebar-foreground/60"
                >
                  <MoreHorizontal />
                  <span className="sr-only">Mais</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? 'bottom' : 'right'}
                align={isMobile ? 'end' : 'start'}
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
  );
}
