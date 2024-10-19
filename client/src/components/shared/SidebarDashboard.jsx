import React from "react";
import Logo from "@/components/custom/Logo.jsx";
import { Button } from "../ui/button.jsx";
import {
  Bookmark,
  LogOut,
  User,
  LayoutDashboard,
  PackagePlus,
  Store,
  RectangleEllipsis,
  Newspaper,
  FileText,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext.jsx";
import { setAccessToken } from "@/context/accessToken.js";
import { axiosInstance, createAxiosInstance } from "@/services/apiConfig.js";

export default function SidebarDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.slice(1).split("/")[0];
  const { setConnected, role } = useAuth();

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
    <div className="flex flex-col justify-between p-6 h-screen w-fit">
      <div className="flex flex-col gap-24">
        <Logo />
        <ul className="flex flex-col gap-4">
          <Button
            size="lg"
            variant="ghost"
            className={`flex gap-2 text-base justify-start items-center w-full
            ${
              path == "profile"
                ? "bg-slate-100 font-bold dark:bg-slate-800"
                : ""
            }`}
            onClick={() => navigate("/profile")}
          >
            <User className={path == "profile" ? "fill-black" : ""} />
            Profile
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className={`flex gap-2 text-base justify-start items-center w-full
            ${
              path == "bookmarks"
                ? "bg-slate-100 font-bold dark:bg-slate-800"
                : ""
            }
            `}
            onClick={() => navigate("/bookmarks")}
          >
            <Bookmark className={path == "bookmarks" ? "fill-black" : ""} />
            Bookmarks
          </Button>
          {role === "admin" && (
            <Button
              size="lg"
              variant="ghost"
              className={`flex gap-2 text-base justify-start items-center w-full
            ${
              path == "dashboard"
                ? "bg-slate-100 font-bold dark:bg-slate-800"
                : ""
            }
            `}
              onClick={() => navigate("/dashboard")}
            >
              <LayoutDashboard
                className={path == "dashboard" ? "fill-black" : ""}
              />
              Dashboard
            </Button>
          )}
          {role === "admin" || role === "manager" ? (
            <>
              <Button
                size="lg"
                variant="ghost"
                className={`flex gap-2 text-base justify-start items-center w-full
                ${
                  path == "productsDashboard"
                    ? "bg-slate-100 font-bold dark:bg-slate-800"
                    : ""
                }
                `}
                onClick={() => navigate("/productsDashboard")}
              >
                <PackagePlus />
                Products
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className={`flex gap-2 text-base justify-start items-center w-full
                ${
                  path == "shopsDashboard"
                    ? "bg-slate-100 font-bold dark:bg-slate-800"
                    : ""
                }
                `}
                onClick={() => navigate("/shopsDashboard")}
              >
                <Store />
                Shops
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className={`flex gap-2 text-base justify-start items-center w-full
                ${
                  path == "bannersDashboard"
                    ? "bg-slate-100 font-bold dark:bg-slate-800"
                    : ""
                }
                `}
                onClick={() => navigate("/bannersDashboard")}
              >
                <RectangleEllipsis />
                Banners
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className={`flex gap-2 text-base justify-start items-center w-full
                ${
                  path == "newsDashboard"
                    ? "bg-slate-100 font-bold dark:bg-slate-800"
                    : ""
                }
                `}
                onClick={() => navigate("/newsDashboard")}
              >
                <FileText />
                News
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className={`flex gap-2 text-base justify-start items-center w-full
                ${
                  path == "newsletterDashboard"
                    ? "bg-slate-100 font-bold dark:bg-slate-800"
                    : ""
                }
                `}
                onClick={() => navigate("/newsletterDashboard")}
              >
                <Newspaper />
                Newsletter
              </Button>
            </>
          ) : null}
        </ul>
      </div>
      <Button
        className="font-bold flex gap-2 text-base justify-center items-center mb-6
        text-red-500 hover:text-red-500 hover:bg-red-100 dark:hover:text-red-500 dark:hover:bg-red-900"
        variant="ghost"
        onClick={logout}
      >
        <LogOut />
        Logout
      </Button>
    </div>
  );
}
