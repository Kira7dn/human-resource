import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type props = {
  expanded: boolean;
  size: number;
};
export const Logo = ({ expanded, size }: props) => {
  return (
    <Link className="flex items-center justify-start gap-x-4" href="/">
      <img
        src="/assets/logo.svg"
        height={size}
        width={size}
        alt="Logo"
        className="dark:hidden"
      />
      <img
        src="/assets/logo-dark.svg"
        height={size}
        width={size}
        alt="Logo"
        className="hidden dark:block"
      />
      <p
        className={clsx(
          "hidden overflow-hidden text-heading4-bold transition-all duration-300 ease-out md:block",
          !expanded && "opacity-0",
        )}
      >
        Human Resource Management
      </p>
      <p
        className={clsx(
          "overflow-hidden text-heading4-bold transition-all duration-300 ease-out md:hidden",
          !expanded && "opacity-0",
        )}
      >
        HRM
      </p>
    </Link>
  );
};
