import "@/src/base/util/globals.css";
import { ProfileGuard } from "@/src/user/providers/profile-guard";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProfileGuard>{children}</ProfileGuard>
        <Toaster />
      </body>
    </html>
  );
}
