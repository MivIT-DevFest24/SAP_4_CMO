import { useAuth } from "@/context/AuthContext.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";
import { Avatar, AvatarFallback } from "@/components/ui/avatar.jsx";

import { useNavigate } from "react-router-dom";
import { Bell, User } from "lucide-react";

export default function ProfilAvatar() {
  const navigate = useNavigate();
  const { firstName, role } = useAuth();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Bell className=" text-orange-600" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            Profile
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <hr className="border-r-2 border-neutral-400 h-6" />
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <p className="text-xl font-bold">{firstName}</p>
          <p className="text-xs text-muted/60">{role}</p>
        </div>
      </div>
    </>
  );
}
