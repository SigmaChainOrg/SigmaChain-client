"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
} from "@/app/components/shadcn/sidebar";
import { CustomCloseTriggerRight } from "./customTriggerRight";
export function ActivitySidebar() {
  return (
    <Sidebar side="right" collapsible="offcanvas">
      <SidebarHeader className="content-start text-black">
        <h4>Gestionar información de la actividad</h4>
        <CustomCloseTriggerRight />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu></SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter> </SidebarFooter>
    </Sidebar>
  );
}
