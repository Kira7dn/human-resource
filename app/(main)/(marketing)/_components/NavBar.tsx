"use client";

import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import clsx from "clsx";
import ButtonLink from "./ButtonLink";
import { Logo } from "./Logo";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="md-:py-6 px-4 py-4 md:px-6" aria-label="Main">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <Logo expanded size={40} />
          <button
            type="button"
            className="text-3xl block p-2 text-white md:hidden"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <MdMenu />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
        {/* Mobile Nav */}
        <div
          className={clsx(
            "ga-4 fixed bottom-0 left-0 right-0 top-0 z-40 flex flex-col items-end bg-[#070815] pr-4 pt-14 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden",
            open ? "translate-x-0" : "translate-x-[100%]",
          )}
        >
          <button
            type="button"
            className="text-3xl fixed right-4 top-4 mb-4 block p-2 text-white md:hidden"
            aria-expanded={open}
            onClick={() => setOpen(false)}
          >
            <MdClose />
            <span className="sr-only">Close menu</span>
          </button>

          <div className="grid justify-items-end gap-8">
            <ButtonLink href="/?admin=true" className="text-green-500">
              Dashboard
            </ButtonLink>{" "}
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="z-40 hidden gap-6 md:flex">
          <ButtonLink href="/?admin=true" className="text-green-500">
            Dashboard
          </ButtonLink>
        </div>
      </div>
    </nav>
  );
}
