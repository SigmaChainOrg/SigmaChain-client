"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
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
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const commonMenuItems = [
  { title: "Dashboard", href: routes["dashboard"], icon: faHome },
  { title: "Solicitudes", href: routes["solicitudes"], icon: faFileLines },
];
const menuItems = {
  manager: [
    ...commonMenuItems,
    { title: "Administración", href: "#", icon: faFileEdit },
    { title: "Personal", href: "#", icon: faUserGroup },
    { title: "Clientes", href: "#", icon: faUsers },
  ],
  reviewer: [
    ...commonMenuItems,
    { title: "Tus procesos", href: "#", icon: faFileEdit },
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
    return items.map((item) => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton
          asChild
          variant={userProfile}
          isActive={
            pathName.split("/")[2] === item.href.split("/")[2] ? true : false
          }
        >
          <Link href={item.href}>
            <FontAwesomeIcon icon={item.icon} />
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ));
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
