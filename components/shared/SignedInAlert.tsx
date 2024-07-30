"use client";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function AlertDialogDemo() {
  const router = useRouter();
  return (
    <AlertDialog defaultOpen>
      <AlertDialogPortal>
        <AlertDialogOverlay className="bg-black opacity-30" />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>You did not Sign In</AlertDialogTitle>
            <AlertDialogDescription className="flex items-center space-x-2">
              <AlertCircle size={24} />
              <span>You need to sign in to continue</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => router.push("/")}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  );
}
