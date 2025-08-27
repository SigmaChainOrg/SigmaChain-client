"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "@/app/components/shadcn/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/shadcn/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/shadcn/dropdown-menu";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/components/shadcn/collapsible";
import { routes } from "@/app/routes";
import { cn } from "@/features/shadcn/services/utils";
import {
  faEllipsisVertical,
  faFileEdit,
  faFileLines,
  faHome,
  faUserGroup,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const commonMenuItems = [
  { title: "Dashboard", href: routes["dashboard"], icon: faHome, children: [] },
  {
    title: "Solicitudes",
    href: routes["request"],
    icon: faFileLines,
    children: [],
  },
];
const menuItems = {
  manager: [
    {
      title: "Dashboard",
      href: routes["dashboard"],
      icon: faHome,
      children: [],
    },
    {
      title: "Solicitudes",
      href: routes["request"],
      icon: faFileLines,
      children: [
        {
          title: "Publicadas",
          href: routes["published-request"],
          icon: faFileLines,
        },
        {
          title: "Sin publicar",
          href: routes["unpublished-request"],
          icon: faFileLines,
        },
      ],
    },
    { title: "Administración", href: "#", icon: faFileEdit, children: [] },
    { title: "Personal", href: "#", icon: faUserGroup, children: [] },
    { title: "Clientes", href: "#", icon: faUsers, children: [] },
  ],
  reviewer: [
    ...commonMenuItems,
    { title: "Tus procesos", href: "#", icon: faFileEdit, children: [] },
  ],
  requester: [...commonMenuItems],
};

type UserProfile = keyof typeof menuItems;

type AppSidebarProps = {
  userProfile?: UserProfile;
};

export function AppSidebar({ userProfile = "manager" }: AppSidebarProps) {
  const pathName = usePathname();

  const renderMenuItems = (items: (typeof menuItems)[keyof typeof menuItems]) => {
    return items.map((item) => {
      if (item.children && item.children.length > 0) {
        // Renderiza un Collapsible si el elemento tiene hijos
        return (
          <Collapsible
            key={item.title}
            defaultOpen
            className="group/collapsible group-data-[collapsible=icon]:border-2 group-data-[collapsible=icon]:border-secondary"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className={cn(
                  pathName.split("/")[2] === item.href.split("/")[2] ? "bg-secondary" : "",
                  "group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:gap-y-0",
                )}
              >
                <CollapsibleTrigger>
                  <FontAwesomeIcon icon={item.icon} />
                  <span>{item.title}</span>
                  <ChevronDown className="transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>

              <CollapsibleContent>
                <SidebarGroupContent>
                  {item.children.map((child) => (
                    <SidebarMenuItem key={child.title}>
                      <SidebarMenuButton
                        asChild
                        variant={userProfile}
                        isActive={pathName.split("/")[3] === child.href.split("/")[3]}
                        className="pl-7 hover:bg-transparent hover:text-complement data-[active=true]:bg-transparent data-[active=true]:text-complement"
                      >
                        <Link href={child.href}>
                          <FontAwesomeIcon icon={child.icon} />
                          <span>{child.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        );
      } else {
        // Renderiza un botón normal si no tiene hijos
        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              variant={userProfile}
              isActive={pathName.split("/")[2] === item.href.split("/")[2] ? true : false}
            >
              <Link href={item.href}>
                <FontAwesomeIcon icon={item.icon} />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      }
    });
  };
  return (
    <Sidebar collapsible="icon" variant={userProfile}>
      <SidebarHeader>
        <FontAwesomeIcon icon={faHome} />
        <span>SigmaChain</span>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarSeparator
        className={
          userProfile === "requester" ? "bg-sidebar-manager" : "bg-sidebar-manager-foreground"
        }
      />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {userProfile in menuItems && renderMenuItems(menuItems[userProfile])}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator
        className={
          userProfile === "requester" ? "bg-sidebar-manager" : "bg-sidebar-manager-foreground"
        }
      />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  kind="username"
                  variant={userProfile}
                  className={
                    userProfile === "requester"
                      ? "hover:bg-transparent hover:text-sidebar-requester-foreground"
                      : "hover:bg-transparent hover:text-sidebar-manager-foreground"
                  }
                >
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h5>Username</h5>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
