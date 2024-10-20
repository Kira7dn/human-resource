import ButtonLink from "./ButtonLink";
import { Logo } from "./Logo";
import { GaugeCircle } from "lucide-react";

export default function NavBar() {
  return (
    <nav className="md-:py-6 px-4 py-4 md:px-6" aria-label="Main">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <Logo expanded size={40} />
          <ButtonLink
            href="/?admin=true"
            className="border-0 bg-transparent text-green-500 md:hidden"
          >
            <GaugeCircle size={24} />
          </ButtonLink>
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
