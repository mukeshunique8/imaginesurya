import EditBreadcrumb from "@/components/dashboard-elements/EditBreadcrumb";
import RouteLoader from "@/components/elements/RouteLoader";

export default function EditPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <RouteLoader />
      <EditBreadcrumb />
      <div>{children}</div>
    </div>
  );
}
