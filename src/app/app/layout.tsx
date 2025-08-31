import { SidebarLayout } from "@/app/components/providers/sidebar-provider";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <SidebarLayout />
      <div className="flex w-full flex-col bg-background">{children}</div>
    </div>
  );
}
