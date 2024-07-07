import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="flex w-full max-w-7xl items-center justify-between p-2 md:px-10 lg:mx-auto xl:px-0">
        <Link href="/" className="w-36">
          <Image src="/assets/logo.svg" width={34} height={34} alt="Logo" />
        </Link>
        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full" size="sm">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
