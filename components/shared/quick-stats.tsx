'use client';

import { ChevronRight, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import type { SidebarStatsItem } from './app-sidebar';

export function QuickStats({
  stats,
}: {
  stats: SidebarStatsItem[];
}) {
  const { isMobile } = useSidebar();
  const [activeStats, setActiveStats] = React.useState(stats[0]);

  if (!stats.length) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div
                className={`flex aspect-square size-8 items-center justify-center rounded-lg ${activeStats.bgColor}`}
              >
                <activeStats.icon className={`size-4 ${activeStats.color}`} />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{activeStats.name}</span>
                <span className="truncate text-xs text-muted-foreground">{activeStats.value}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-[280px] rounded-lg p-2"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="px-2 text-xs font-normal text-muted-foreground">
              Acompanhamento
            </DropdownMenuLabel>
            <div className="mt-2 space-y-1">
              {stats.map((stat) => (
                <DropdownMenuItem
                  key={stat.name}
                  onClick={() => setActiveStats(stat)}
                  className={`rounded-md p-2 outline-none ${
                    stat === activeStats ? `${stat.bgColor} ${stat.color}` : 'hover:bg-accent'
                  }`}
                >
                  <div className="flex w-full flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex size-8 items-center justify-center rounded-md ${stat.bgColor}`}
                      >
                        <stat.icon className={`size-4 ${stat.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{stat.name}</span>
                          {stat === activeStats && <ChevronRight className="size-4" />}
                        </div>
                        <span className="text-xs text-muted-foreground">{stat.value}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-1">
                      <Progress value={stat.progress} className="flex-1" />
                      <span className="text-xs font-medium">{stat.progress}%</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 px-1">
                      {stat.details.map((detail, index) => (
                        <div
                          key={`${stat.name}-${detail.label}-${index}`}
                          className="flex items-center gap-1 text-xs text-muted-foreground"
                        >
                          <detail.icon className="size-3 flex-shrink-0" />
                          <span className="truncate">{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <DropdownMenuSeparator className="my-2" />
            <DropdownMenuItem className="rounded-md p-2 text-center">
              <div className="flex w-full items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
                Ver relatório completo
                <ChevronRight className="size-4" />
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
