import { RecruitDialog } from "@/components/dialog/RecruitDialog";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruitment",
  description: "",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/assets/logo.svg",
        href: "/assets/logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/assets/logo-dark.svg",
        href: "/assets/logo-dark.svg",
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className=" flex-col justify-start space-y-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-large-semibold tracking-tight">
            Recruit Announcement
          </div>
          <RecruitDialog>
            <Button size="sm">Create Recruit</Button>
          </RecruitDialog>
        </div>
        {children}
      </div>
    </div>
  );
}
