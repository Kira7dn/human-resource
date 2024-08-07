import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type props = {
  expanded: boolean;
  size: number;
};
export const Logo = ({ expanded, size }: props) => {
  return (
    <Link className="flex items-center justify-start gap-x-4" href="/dashboard">
      <Image
        src="/assets/logo.svg"
        height={size}
        width={size}
        alt="Logo"
        className="dark:hidden"
        priority
      />
      <Image
        src="/assets/logo-dark.svg"
        height={size}
        width={size}
        alt="Logo"
        className="hidden dark:block"
        priority
      />
      <p
        className={clsx(
          "overflow-hidden text-heading4-bold transition-all duration-300 ease-out",
          !expanded && "opacity-0",
        )}
      >
        Human Resource Management
      </p>
    </Link>
  );
};
