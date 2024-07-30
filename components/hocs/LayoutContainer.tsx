import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  top?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  bottom?: React.ReactNode;
  children: React.ReactNode;
};

function LayoutContainer({ left, top, children }: Props) {
  return (
    <main className="flex h-screen w-full justify-center bg-background">
      <aside className={cn("w-3/12")}>{left}</aside>
      <div className="relative flex w-full flex-col justify-between">
        <div className={cn("h-14 w-full bg-background")}>{top}</div>
        <div className="container flex w-full">{children}</div>
      </div>
    </main>
  );
}

export default LayoutContainer;
