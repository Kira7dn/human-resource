import LayoutContainer from "@/components/hocs/LayoutContainer";
import LeftSideBar from "@/components/shared/LeftSideBar";
import Topbar from "@/components/shared/TopBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutContainer left={<LeftSideBar />} top={<Topbar />}>
      {children}
    </LayoutContainer>
  );
}
