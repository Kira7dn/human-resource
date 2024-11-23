"use client";
import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { Logo } from "../Logo";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

import { mainLinks, otherLinks, preferenceLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons/lib";

const LeftSideBar = () => {
  return (
    <div className={cn("h-full w-full")}>
      <article className="flex h-full flex-col gap-10 bg-secondary px-3 pt-3">
        <section className="w-full">
          <Logo expanded={true} size={50} />
        </section>
        <section className="flex flex-col gap-2">
          <div className={cn("flex flex-col text-gray-500")}>
            <h1 className="pb-2">MAIN MENU</h1>
            <Links links={mainLinks} />
          </div>
          {/* <div className={cn("flex flex-col text-gray-500")}>
            <h1 className="pb-2">OTHER MENU</h1>
            <Links links={otherLinks} />
          </div>
          <div className={cn("flex flex-col text-gray-500")}>
            <h1 className="pb-2">PREFERENCE</h1>
            <Links links={preferenceLinks} />
          </div> */}
        </section>
      </article>
    </div>
  );
};

export default LeftSideBar;

type Props = {
  links: {
    route: string;
    label: string;
    component: IconType | LucideIcon;
  }[];
};

function Links({ links }: Props) {
  const pathname = usePathname();
  const lastPath = pathname.split("/").pop();

  return (
    <div className={cn("flex h-full flex-col justify-between gap-1")}>
      {links.map((link) => {
        const isActive =
          (lastPath &&
            lastPath.includes(link.route) &&
            link.route.length > 1) ||
          lastPath === link.route.split("/").pop();
        const Component = link.component;
        return (
          <Link
            href={link.route}
            key={link.label}
            className={`flex rounded-lg px-2 py-2 hover:text-secondary-foreground ${
              isActive && "bg-secondary-gradient shadow-inner shadow-gray-400"
            }`}
          >
            <div className={cn("pr-2", isActive && "text-primary-foreground")}>
              <Component />
            </div>
            <p
              className={clsx(
                "text-body-medium max-md:hidden",
                isActive && "text-secondary-foreground",
              )}
            >
              {link.label}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
