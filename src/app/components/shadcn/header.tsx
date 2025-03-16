"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/breadcrumb";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { SidebarTrigger } from "@/components/shadcn/sidebar";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/shadcn/utils";
import {
  faBell,
  faFilter,
  faHome,
  faMessage,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Slash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export function DashboardHeader({
  accessButon,
}: {
  accessButon: { name: string; ref: string };
}) {
  const router = useRouter();
  return (
    <div className="mx-[-16px] flex flex-row place-content-between gap-2 border-[1px] border-solid border-gray-300 bg-white px-4 py-5">
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
            router.push(accessButon.ref);
          }}
        >
          {accessButon.name}
        </Button>
        <Button variant="ghost">
          <FontAwesomeIcon icon={faMessage} />
        </Button>
        <Button variant="ghost">
          <FontAwesomeIcon icon={faBell} />
        </Button>
      </div>
    </div>
  );
}

export function BreadcrumbHeader({
  estado,
  path,
}: {
  estado: boolean;
  path: string;
}) {
  const pathItems = path.split("/").filter(Boolean); // Split the path and remove empty strings
  const lastItem = pathItems.pop();
  return (
    <div className="mx-[-16px] flex flex-row place-content-between gap-2 border-[1px] border-solid border-gray-300 bg-white px-4 py-5">
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
        <p
          className={cn(
            "text-sm italic",
            estado ? "text-success" : "text-danger",
          )}
        >
          estado: {estado ? "guardado" : "sin guardar"}
        </p>
        <Button variant="ghost">
          <FontAwesomeIcon icon={faMessage} />
        </Button>
        <Button variant="ghost">
          <FontAwesomeIcon icon={faBell} />
        </Button>
      </div>
    </div>
  );
}
