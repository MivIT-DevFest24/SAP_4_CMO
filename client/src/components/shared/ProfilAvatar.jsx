import { useAuth } from "@/context/AuthContext.jsx";
import { setAccessToken } from "@/context/accessToken.js";
import { axiosInstance, createAxiosInstance } from "@/services/apiConfig.js";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";

import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";

export default function ProfilAvatar() {
  const navigate = useNavigate();
  const { setConnected, firstName, image, role } = useAuth();

  const logout = async () => {
    try {
      // clear the access token
      navigate("/");
      setConnected(false);
      await axiosInstance.post("auth/logout");
      setAccessToken(null);
      createAxiosInstance();
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              src={image}
              className=" object-cover object-center"
              alt="profil pic"
            />
            <AvatarFallback>
              {firstName ? firstName.charAt(0).toUpperCase() : <User />}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => navigate("/bookmarks")}
          >
            Bookmarks
          </DropdownMenuItem>
          {role === "admin" && (
            <>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </DropdownMenuItem>
            </>
          )}
          {role === "admin" || role === "manager" ? (
            <>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/productsDashboard")}
              >
                Products
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/shopsDashboard")}
              >
                Shops
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/bannersDashboard")}
              >
                Banners
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/newsDashboard")}
              >
                News
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/newsletterDashboard")}
              >
                Newsletter
              </DropdownMenuItem>
            </>
          ) : null}
          <DropdownMenuItem
            className="cursor-pointer text-red-500"
            onClick={logout}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
