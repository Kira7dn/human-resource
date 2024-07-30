import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut } from "@clerk/nextjs";
import { Spinner } from "@/components/spinner";
import { AlertDialogDemo } from "@/components/shared/SignedInAlert";
import LayoutContainer from "@/components/hocs/LayoutContainer";
import LeftSideBar from "@/components/shared/LeftSideBar";
import Topbar from "@/components/shared/TopBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ClerkLoading>
        <main className="flex h-screen items-center justify-center bg-background">
          <Spinner />
        </main>
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <LayoutContainer left={<LeftSideBar />} top={<Topbar />}>
            {children}
          </LayoutContainer>
        </SignedIn>
        <SignedOut>
          <AlertDialogDemo />
          <h1>You are not logged in</h1>
        </SignedOut>
      </ClerkLoaded>
    </>
  );
}
