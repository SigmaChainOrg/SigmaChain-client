"use client";
import { useSidebarStore } from "@/app/app/request/state/sidebar-store";
import { AppSidebar } from "@/app/components/shadcn/app-sidebar";
import { SidebarProvider } from "@/app/components/shadcn/sidebar";

export function SidebarLayout({
  children,
  defaultOpen = false,
}: {
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const { leftOpen, setLeftOpen } = useSidebarStore();

  return (
    <SidebarProvider open={leftOpen} onOpenChange={setLeftOpen}>
      <AppSidebar userProfile="manager" />
      <main className="mt-7 grid h-full w-full grid-cols-12 gap-x-2 gap-y-6 bg-background px-4 py-6">
        {children}
      </main>
    </SidebarProvider>
  );
}
