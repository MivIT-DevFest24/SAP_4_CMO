import NavbarDashboard from "@/components/shared/NavbarDashboard.jsx";
import SidebarDashboard from "@/components/shared/SidebarDashboard.jsx";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <div className="hidden border-r bg-muted/40 md:block">
        <SidebarDashboard />
      </div>
      <div className="grow">
        <header className="mb-10">
          <NavbarDashboard />
        </header>
        <main className="2xl:px-16 xl:px-10 lg:px-8 px-2">{children}</main>
      </div>
    </div>
  );
}
