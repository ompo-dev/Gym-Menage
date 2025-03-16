'use client';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { SidebarNavItem } from './app-sidebar';

export function NavMain({
  items,
  userRole = 'admin',
}: {
  items: SidebarNavItem[];
  userRole: 'admin' | 'student' | 'instructor';
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    url?: string,
    param?: string
  ) => {
    e.preventDefault();

    if (userRole === 'admin' && url) {
      // Extrair apenas os parâmetros de busca da URL
      const queryString = url.split('?')[1] || '';
      // Atualizar a URL sem recarregar a página
      router.push(`${pathname}${queryString ? `?${queryString}` : ''}`, { scroll: false });
    } else if (userRole === 'student') {
      // Para estudantes, usamos o sistema de parâmetros
      if (param) {
        router.push(`/students?${param}`);
      } else {
        router.push('/students');
      }
    }
  };

  // Verifica se um item está ativo com base no URL ou parâmetros
  const isItemActive = (item: SidebarNavItem): boolean => {
    if (userRole === 'admin' && item.url) {
      // Para admin, verificamos se a URL atual contém a URL do item
      const currentUrl = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
      return item.isActive || currentUrl.includes(item.url);
    }

    if (userRole === 'student' && item.param) {
      // Para estudantes, verificamos se o parâmetro está presente
      return item.isActive || searchParams.has(item.param);
    }

    return item.isActive || false;
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-muted-foreground dark:text-sidebar-foreground/60">
        {userRole === 'admin' ? 'Menu Principal' : 'Menu do Aluno'}
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) =>
          item.items ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isItemActive(item)}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className="text-foreground dark:text-sidebar-foreground hover:bg-accent dark:hover:bg-sidebar-accent"
                  >
                    {item.icon && (
                      <item.icon className="text-muted-foreground dark:text-sidebar-foreground/60" />
                    )}
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
                          <a
                            href={subItem.url || (subItem.param ? `?${subItem.param}` : '')}
                            onClick={(e) => handleNavigation(e, subItem.url, subItem.param)}
                          >
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
                isActive={isItemActive(item)}
                tooltip={item.title}
                className="text-foreground dark:text-sidebar-foreground hover:bg-accent dark:hover:bg-sidebar-accent"
              >
                <a
                  href={item.url || (item.param ? `?${item.param}` : '')}
                  onClick={(e) => handleNavigation(e, item.url, item.param)}
                >
                  {item.icon && (
                    <item.icon className="text-muted-foreground dark:text-sidebar-foreground/60" />
                  )}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
