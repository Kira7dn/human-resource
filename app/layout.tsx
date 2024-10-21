import type { Metadata } from "next";
import createLocalFont from "next/font/local";
import "./globals.css";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Viewport } from "next";

export const viewport: Viewport = {
  viewportFit: "cover",
};

const LGEI = createLocalFont({
  src: [
    {
      path: "./fonts/LGEIText-Light.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/LGEIText-Regular.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/LGEIText-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/LGEIText-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "HRM - Human Resource Management",
  description:
    "Manage human resources, employees, and more with our human resource management system.",
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
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${LGEI.className}`}>
      <body>
        <EdgeStoreProvider>
          <TooltipProvider>
            <Toaster position="bottom-center" />
            {children}
          </TooltipProvider>
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
