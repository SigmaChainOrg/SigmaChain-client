"use client";
import { useSidebarStore } from "@/app/app/request/state/sidebar-store";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/shadcn/breadcrumb";
import { Button } from "@/app/components/shadcn/button";
import { Input } from "@/app/components/shadcn/input";
import { SidebarTrigger } from "@/app/components/shadcn/sidebar";
import { routes } from "@/app/routes";
import { cn } from "@/features/shadcn/services/utils";
import { faBell, faFilter, faHome, faMessage, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Slash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function HeaderLayout({ children }: { children: React.ReactNode }) {
  const { leftOpen } = useSidebarStore();
  return (
    <div
      className={cn(
        "fixed top-0 z-10 mx-[-16px] flex flex-row place-content-between gap-2 border-[1px] border-solid border-gray-300 bg-white px-4 py-5",
        leftOpen ? "w-[70rem]" : "w-[80rem]",
      )}
    >
      {children}
    </div>
  );
}

export function DashboardHeader({ accessButton }: { accessButton: { name: string; ref: string } }) {
  const router = useRouter();

  return (
    <HeaderLayout>
      <div className="flex flex-row items-center gap-2">
        <SidebarTrigger />
        <Input placeholder="Buscar" />
        <Button variant="ghost">
          <FontAwesomeIcon icon={faSearch} />
        </Button>
        <Button variant="ghost">
          <FontAwesomeIcon icon={faFilter} />
        </Button>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Button
          onClick={() => {
            router.push(accessButton.ref);
          }}
        >
          {accessButton.name}
        </Button>
        <Button variant="ghost">
          <FontAwesomeIcon icon={faMessage} />
        </Button>
        <Button variant="ghost">
          <FontAwesomeIcon icon={faBell} />
        </Button>
      </div>
    </HeaderLayout>
  );
}

export function BreadcrumbHeader({ estado, path }: { estado: boolean; path: string }) {
  const pathItems = path.split("/").filter(Boolean); // Split the path and remove empty strings
  const lastItem = pathItems.pop();
  return (
    <HeaderLayout>
      <div className="flex flex-row items-center gap-2">
        <SidebarTrigger />
        <Breadcrumb>
          <BreadcrumbList>
            {pathItems.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={
                      item === "app"
                        ? routes["dashboard"]
                        : `/${pathItems.slice(0, index + 1).join("/")}`
                    }
                  >
                    {item === "app" && (
                      <FontAwesomeIcon
                        icon={faHome}
                        className="h-5 text-primary hover:text-secondary"
                      />
                    )}
                    {item !== "app" && item}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
              </React.Fragment>
            ))}
            <BreadcrumbItem>
              <BreadcrumbPage>{lastItem}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-row items-center gap-2">
        <p className={cn("text-sm italic", estado ? "text-success" : "text-danger")}>
          estado: {estado ? "guardado" : "sin guardar"}
        </p>
        <Button variant="ghost">
          <FontAwesomeIcon icon={faMessage} />
        </Button>
        <Button variant="ghost">
          <FontAwesomeIcon icon={faBell} />
        </Button>
      </div>
    </HeaderLayout>
  );
}
