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
import { usePathname, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import type { SidebarNavItem } from './app-sidebar';

function NavMainContent({
  items,
  userRole = 'admin',
}: {
  items: SidebarNavItem[];
  userRole: 'admin' | 'student' | 'instructor';
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, url?: string) => {
    e.preventDefault();

    if (url) {
      router.push(url);
    }
  };

  // Verifica se um item está ativo com base no pathname
  const isItemActive = (item: SidebarNavItem): boolean => {
    if (!item.url) return false;

    // Se o item tem subitens, verifica se o pathname começa com a URL do item
    if (item.items) {
      return pathname.startsWith(item.url);
    }

    // Para itens sem subitens, verifica se o pathname é exatamente igual à URL
    return pathname === item.url;
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
                            href={subItem.url || '#'}
                            onClick={(e) => handleNavigation(e, subItem.url)}
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
                <a href={item.url || '#'} onClick={(e) => handleNavigation(e, item.url)}>
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

function NavSkeleton() {
  // Array com IDs fixos em vez de usar índices
  const skeletonItems = [
    { id: 'skeleton-item-1' },
    { id: 'skeleton-item-2' },
    { id: 'skeleton-item-3' },
    { id: 'skeleton-item-4' },
    { id: 'skeleton-item-5' },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-muted-foreground dark:text-sidebar-foreground/60">
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
      </SidebarGroupLabel>
      <SidebarMenu>
        {skeletonItems.map((item) => (
          <SidebarMenuItem key={item.id}>
            <div className="flex items-center px-3 py-2">
              <div className="h-5 w-5 mr-2 animate-pulse rounded bg-muted" />
              <div className="h-5 w-24 animate-pulse rounded bg-muted" />
            </div>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export function NavMain({
  items,
  userRole = 'admin',
}: {
  items: SidebarNavItem[];
  userRole: 'admin' | 'student' | 'instructor';
}) {
  return (
    <Suspense fallback={<NavSkeleton />}>
      <NavMainContent items={items} userRole={userRole} />
    </Suspense>
  );
}
