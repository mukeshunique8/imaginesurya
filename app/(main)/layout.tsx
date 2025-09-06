import UserFooter from "@/components/user/shared/Footer";
import { UserNavbar } from "@/components/user/shared/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <UserNavbar />
      {children}
      <UserFooter />
    </>
  );
}
