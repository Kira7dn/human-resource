"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { UserItem } from "./UserItem";
import SearchBar from "./SearchBar";
import { Logo } from "../Logo";

const Topbar = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex h-full w-full items-center justify-between border-b border-gray-500 px-6">
      <Logo expanded size={40} name={false} className="md:hidden" />
      <div className="flex w-1/2 justify-start gap-8">
        <div className="hidden text-large-semibold text-secondary md:block">
          {formattedDate}
        </div>
        <div className="w-1/2">
          <SearchBar />
        </div>
      </div>
      <div className="flex items-center justify-end gap-x-8">
        <UserItem />
      </div>
    </div>
  );
};

export default Topbar;
