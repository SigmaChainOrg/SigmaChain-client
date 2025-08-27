import { SidebarLayout } from "@/app/components/providers/sidebar-provider";
import { cn } from "@/features/shadcn/services/utils";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      <SidebarLayout />
      <main className={cn("flex w-full flex-col bg-background")}>{children}</main>
    </div>
  );
}
