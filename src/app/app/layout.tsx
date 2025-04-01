import { SidebarLayout } from "@/app/components/sidebar-layout";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen">
      <SidebarLayout>{children}</SidebarLayout>
    </div>
  );
}
