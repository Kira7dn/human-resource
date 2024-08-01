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
      <aside className="w-1/6">{left}</aside>
      <div className="flex w-9/12 grow flex-col overflow-hidden">
        <div className={cn("h-14 w-full bg-background")}>{top}</div>
        <div className="relative mx-auto w-full flex-1 overflow-y-auto px-[3%]">
          {children}
        </div>
      </div>
    </main>
  );
}

export default LayoutContainer;
