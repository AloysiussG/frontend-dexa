"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function DashboardBreadcrumb() {
  const pathname = usePathname();
  const segmentsURL = pathname.split("/");
  let url = "";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segmentsURL.map((segment, index) => {
          if (segment !== "") url += `/${segment}`;

          if (index === 0) return <div className="" key={999}></div>; // Skip the first empty segment
          return (
            <Fragment key={index}>
              <BreadcrumbItem className="hidden md:block">
                {/* Return page if index == segmentsURL.length - 1 */}
                {index === segmentsURL.length - 1 ? (
                  <BreadcrumbPage>
                    {segment.charAt(0).toUpperCase() + segment.slice(1)}
                  </BreadcrumbPage>
                ) : (
                  // Otherwise return link
                  <BreadcrumbLink asChild>
                    <Link href={`${url}`}>
                      {segment.charAt(0).toUpperCase() + segment.slice(1)}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < segmentsURL.length - 1 && (
                <BreadcrumbSeparator className="hidden md:block" />
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
