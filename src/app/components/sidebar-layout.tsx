"use client";
import { useSidebarStore } from "@/app/app/request/state/sidebar-store";
import { useUserProfileStore } from "@/app/app/state/use-user-profile-store";
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
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const setUserProfile = useUserProfileStore((state) => state.setUserProfile);
  setUserProfile("requester");
  return (
    <SidebarProvider open={leftOpen} onOpenChange={setLeftOpen}>
      <AppSidebar userProfile={userProfile} />
      <main className="mt-7 grid h-full w-full grid-cols-12 gap-x-2 gap-y-6 bg-background px-4 py-6">
        {children}
      </main>
    </SidebarProvider>
  );
}
