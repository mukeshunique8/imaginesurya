"use client";

import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import React from "react";
import { ADMINROUTES } from "@/lib/data/routes";

export default function EditBreadcrumb() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean); // removes empty parts

  // Create paths with href
  const pathMap = parts.map((part, index) => {
    const href = "/" + parts.slice(0, index + 1).join("/");
    return {
      name: part.charAt(0).toUpperCase() + part.slice(1),
      href,
    };
  });

  const hasEllipsis = pathMap.length > 3;
  const visibleStart = pathMap.slice(0, 1); // e.g. admin
  const hiddenMiddle = pathMap.slice(1, pathMap.length - 1); // e.g. dashboard/edit
  const last = pathMap[pathMap.length - 1]; // current page

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Home */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={ADMINROUTES.DASHBOARD}>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* {visibleStart.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={item.href}>{item.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))} */}

        {/* Ellipsis dropdown for middle parts */}
        {hasEllipsis && hiddenMiddle.length > 0 && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 focus:outline-none">
                  <BreadcrumbEllipsis className="size-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {hiddenMiddle.map((item, index) => (
                    <DropdownMenuItem key={index} asChild>
                      <Link href={item.href}>{item.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
          </>
        )}

        {/* Last page (no link) */}
        {last && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{last.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
