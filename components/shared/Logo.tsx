import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

type props = {
  expanded: boolean;
  name?: boolean;
  size: number;
  className?: string;
};
export const Logo = ({ expanded, name = true, size, className }: props) => {
  return (
    <Link
      className={clsx("flex items-center justify-start gap-x-4", className)}
      href="/dashboard"
    >
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
      {name && (
        <p
          className={clsx(
            "overflow-hidden text-large-bold text-secondary-foreground",
          )}
        >
          HR Management
        </p>
      )}
    </Link>
  );
};
