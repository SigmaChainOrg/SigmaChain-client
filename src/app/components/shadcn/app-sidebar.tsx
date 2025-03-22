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
} from "@/components/shadcn/sidebar";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/shadcn/collapsible";
import { routes } from "@/lib/routes";
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
    href: routes["solicitudes"],
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
      href: routes["solicitudes"],
      icon: faFileLines,
      children: [
        {
          title: "Publicadas",
          href: routes["solicitudes-publicadas"],
          icon: faFileLines,
        },
        {
          title: "Sin publicar",
          href: routes["solicitudes-sin-publicar"],
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

  const renderMenuItems = (
    items: (typeof menuItems)[keyof typeof menuItems],
  ) => {
    return items.map((item) => {
      if (item.children && item.children.length > 0) {
        // Renderiza un Collapsible si el elemento tiene hijos
        return (
          <Collapsible
            key={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className={
                  pathName.split("/")[2] === item.href.split("/")[2]
                    ? "text-complement"
                    : ""
                }
              >
                <CollapsibleTrigger>
                  <FontAwesomeIcon icon={item.icon} />
                  <span>{item.title}</span>
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  {item.children.map((child) => (
                    <SidebarMenuItem key={child.title}>
                      <SidebarMenuButton
                        asChild
                        variant={userProfile}
                        isActive={
                          pathName.split("/")[3] === child.href.split("/")[3]
                        }
                        className="pl-7"
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
              isActive={
                pathName.split("/")[2] === item.href.split("/")[2]
                  ? true
                  : false
              }
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
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarSeparator
                className={
                  userProfile === "requester"
                    ? "bg-sidebar-manager"
                    : "bg-sidebar-manager-foreground"
                }
              />
              {userProfile in menuItems &&
                renderMenuItems(menuItems[userProfile])}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator
          className={
            userProfile === "requester"
              ? "bg-sidebar-manager"
              : "bg-sidebar-manager-foreground"
          }
        />
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
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
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
