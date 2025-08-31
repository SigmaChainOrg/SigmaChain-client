"use client";
import { useSidebarStore } from "@/app/app/request/state/sidebar-store";
import { useUserProfileStore } from "@/app/app/state/use-user-profile-store";
import { AppSidebar } from "@/app/components/app-sidebar";
import { SidebarProvider } from "@/app/components/shadcn/sidebar";

export function SidebarLayout() {
  const { leftOpen, setLeftOpen } = useSidebarStore();
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);
  setUserProfile("manager");
  return (
    <SidebarProvider open={leftOpen} onOpenChange={setLeftOpen}>
      <AppSidebar userProfile={userProfile} />
    </SidebarProvider>
  );
}
