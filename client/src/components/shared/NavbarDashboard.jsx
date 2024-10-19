import { useLocation } from "react-router-dom";
import ProfilAvatar from "@/components/shared/ProfilAvatar.jsx";
import { Menu, CircleArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet.jsx";
import SidebarDashboard from "./SidebarDashboard.jsx";

export default function NavbarDashboard() {
  const location = useLocation();
  const path = location.pathname.slice(1).split("/")[0];
  return (
    <div className="border-b-2 flex justify-between md:px-8 px-4 py-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-fit">
          <SidebarDashboard />
        </SheetContent>
      </Sheet>
      <div className="flex gap-2 justify-center items-center">
        <CircleArrowLeft
          className="cursor-pointer hidden md:block"
          onClick={() => {
            window.history.back();
          }}
          size={42}
        />
        <h2 className="xl:text-2xl lg:text-xl font-bruno">{path}</h2>
      </div>
      <div className=" flex justify-center items-center gap-4 pr-6">
        <ProfilAvatar />
      </div>
    </div>
  );
}
