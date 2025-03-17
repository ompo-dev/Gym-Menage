'use client';

import {
  Activity,
  Apple,
  BarChart3,
  Building2,
  Calendar,
  DollarSign,
  Dumbbell,
  GraduationCap,
  Home,
  LineChart,
  Ruler,
  Settings,
  User,
  UserCog,
  Users,
  Warehouse,
} from 'lucide-react';
import type * as React from 'react';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { AcademiaSwitcher } from './academia-switcher';
import { NavAcademias } from './nav-academias';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import { QuickStats } from './quick-stats';

// Tipos para os dados da sidebar
export type SidebarUserData = {
  name: string;
  email: string;
  avatar: string;
  since?: string;
  role: 'admin' | 'student' | 'instructor';
};

export type SidebarAcademiaData = {
  name: string;
  logo: React.ElementType;
  plan: string;
};

export type SidebarNavItem = {
  title: string;
  url?: string;
  icon?: React.ElementType;
  isActive?: boolean;
  items?: {
    title: string;
    url?: string;
  }[];
};

export type SidebarStatsItem = {
  name: string;
  value: string;
  progress: number;
  icon: React.ElementType;
  details: {
    icon: React.ElementType;
    label: string;
    value: string;
  }[];
  color: string;
  bgColor: string;
};

export type SidebarProps = {
  userRole: 'admin' | 'student' | 'instructor';
  user: SidebarUserData;
  academias?: SidebarAcademiaData[];
  navItems: SidebarNavItem[];
  stats?: SidebarStatsItem[];
  className?: string;
};

export function AppSidebar({
  userRole,
  user,
  academias = [],
  navItems,
  stats = [],
  className,
  ...props
}: SidebarProps & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className={cn(
        'bg-background border-r border-border dark:bg-sidebar-background dark:border-sidebar-border',
        className
      )}
      {...props}
    >
      <SidebarHeader
        className={cn(
          userRole === 'admin'
            ? 'border-b border-border dark:border-sidebar-border'
            : 'flex flex-col gap-2'
        )}
      >
        {userRole === 'admin' ? (
          <AcademiaSwitcher academias={academias} />
        ) : (
          <>
            <div className="flex items-center gap-2 px-6 font-semibold">
              <Dumbbell className="h-6 w-6" />
              <span className="text-xl">Academia XYZ</span>
            </div>
            {stats.length > 0 && <QuickStats stats={stats} />}
          </>
        )}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} userRole={userRole} />
        {userRole === 'admin' && academias.length > 0 && <NavAcademias academias={academias} />}
      </SidebarContent>
      <SidebarFooter className="border-t border-border dark:border-sidebar-border">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
