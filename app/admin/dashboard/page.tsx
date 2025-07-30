import { requireAdminSession } from "@/lib/authGuard";
import UploadForm from "@/components/admin/UploadForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const user = await requireAdminSession();

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Unauthorized. Please log in.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-6 p-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Logged in as: <span className="font-medium text-primary">{user.email}</span>
        </p>
      </div>

      <div className="w-full max-w-md p-8 rounded-lg shadow-md space-y-6">
        <h2 className="text-xl font-semibold text-center">Photo Upload</h2>
        {/* Client-side UploadForm with preview and alerts */}
        <UploadForm userId={user.id} />
      </div>

      <div className="flex gap-4 mt-4">
        <Link href="/home">
          <Button variant="outline">👤 View User Profile</Button>
        </Link>
      </div>
    </div>
  );
}
