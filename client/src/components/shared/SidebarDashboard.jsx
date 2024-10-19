import React from "react";
import Logo from "@/components/custom/Logo.jsx";
import { Button } from "../ui/button.jsx";
import {
  LogOut,
  User,
  LayoutDashboard,
  PackagePlus,
  Store,
  RectangleEllipsis,
  FileText,
  Tractor,
  ScrollText,
  CalendarClock,
  Users,
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
            ${path == "dashboard" ? "bg-orange-100 font-bold " : ""}
            `}
            onClick={() => navigate("/dashboard")}
          >
            <LayoutDashboard
              className={path == "dashboard" ? "text-orange-500 " : ""}
            />
            Dashboard
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className={`flex gap-2 text-base justify-start items-center w-full
                ${path == "machines" ? "bg-orange-100 font-bold " : ""}
                `}
            onClick={() => navigate("/machines")}
          >
            <Tractor
              className={path == "machines" ? "text-orange-500 " : ""}
            />
            Machines
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className={`flex gap-2 text-base justify-start items-center w-full
                ${path == "rapports" ? "bg-orange-100 font-bold " : ""}
                `}
            onClick={() => navigate("/rapports")}
          >
            <ScrollText className={path == "rapports" ? "text-orange-500 " : ""} />
            Error rapports
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className={`flex gap-2 text-base justify-start items-center w-full
                ${path == "scheduler" ? "bg-orange-100 font-bold " : ""}
                `}
            onClick={() => navigate("/scheduler")}
          >
            <CalendarClock
              className={path == "scheduler" ? "text-orange-500 " : ""}
            />
            Maintining scheduler
          </Button>
          {role === "manager" && (
            <Button
              size="lg"
              variant="ghost"
              className={`flex gap-2 text-base justify-start items-center w-full
            ${path == "employees" ? "bg-orange-100 font-bold " : ""}
            `}
              onClick={() => navigate("/employees")}
            >
              <Users
                className={path == "employees" ? "text-orange-500 " : ""}
              />
              Employees
            </Button>
          )}
          <Button
            size="lg"
            variant="ghost"
            className={`flex gap-2 text-base justify-start items-center w-full
            ${path == "profile" ? "bg-orange-100 font-bold " : ""}`}
            onClick={() => navigate("/profile")}
          >
            <User
              className={
                path == "profile" ? "fill-orange-500 text-orange-500" : ""
              }
            />
            Profile
          </Button>
        </ul>
      </div>
      <Button
        className="font-bold flex gap-2 text-base justify-center items-center mb-6
        bg-orange-500 hover:bg-orange-700 text-white hover:text-white"
        variant="ghost"
        onClick={logout}
      >
        <LogOut />
        Logout
      </Button>
    </div>
  );
}
