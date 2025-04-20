import "@/src/base/util/globals.css";
import { ProfileGuard } from "@/src/user/providers/profile-guard";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ProfileGuard>{children}</ProfileGuard>
      </body>
    </html>
  );
}
