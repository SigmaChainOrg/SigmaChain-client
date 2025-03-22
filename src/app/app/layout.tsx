import { AppSidebar } from "@/components/shadcn/app-sidebar";
import { SidebarProvider } from "@/components/shadcn/sidebar";
import { cookies } from "next/headers";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <div className="h-screen w-screen">
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar userProfile="manager" />
        <main className="aling-content-start grid h-full w-full grid-cols-12 gap-x-2 gap-y-6 bg-background px-4 pb-6">
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
