"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/app/components/dashboard/sidebar/NavMain";
import { NavProjects } from "@/app/components/dashboard/sidebar/NavProjects";
import { NavSecondary } from "@/app/components/dashboard/sidebar/NavSecondary";
import { NavUser } from "@/app/components/dashboard/sidebar/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo from "../../logo/logo";
import LgLight from "../../logo/LgLight";
import { dashboardRoles } from "@/app/types/types";
import { adminMenu, merchantMenu } from "@/app/constants";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  role: dashboardRoles;
};

export function AppSidebar({ role, ...props }: AppSidebarProps) {
  const data = role === "admin" ? adminMenu : merchantMenu;
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="[&>svg]:size-10">
              <a href="#">
                <LgLight />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="text-xl truncate font-medium">
                    MEAL<strong>FLOWZ</strong>
                  </span>
                  <span className="truncate text-md">
                    {role === "admin" ? "Admin" : "Merchant"}
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
