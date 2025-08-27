"use client";
import { useSidebarStore } from "@/app/app/request/state/sidebar-store";
import { AppSidebar } from "@/app/components/shadcn/app-sidebar";
import { SidebarProvider } from "@/app/components/shadcn/sidebar";

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const { leftOpen, setLeftOpen } = useSidebarStore();

  return (
    <SidebarProvider open={leftOpen} onOpenChange={setLeftOpen}>
      <AppSidebar userProfile="manager" />
    </SidebarProvider>
  );
}
