import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Profile from "@/pages/Profile.jsx";
import NotFound from "@/pages/NotFound.jsx";
import DashboardLayout from "@/layouts/DashboardLayout.jsx";
import loading_gif from "@/assets/images/Loading-icon-unscreen.gif";

import { useAuth } from "@/context/AuthContext.jsx";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getAccessToken, setAccessToken } from "@/context/accessToken.js";
import { axiosInstance, createAxiosInstance } from "@/services/apiConfig.js";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../pages/Dashboard";
import axios from "axios";
import Home from "@/pages/Home";

const Router = () => {
  const { setConnected, setRole, setFirstName, connected, role } =
    useAuth();

  // check if the user is connected
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_SERVER_URL + "/auth/refresh",
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          if (data.accessToken) {
            const { accessToken, role, image, firstname } = data;
            setAccessToken(accessToken);
            setConnected(true);
            setRole(role);
            setFirstName(firstname);
          }
        } else if (response.status === 203) {
          setConnected(false);
          setRole(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        createAxiosInstance();
      }
    };

    fetchData();
  }, [setConnected, setFirstName, setRole]);

  // Intercept all requests to check if the access token is expired
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = getAccessToken();

      if (token) {
        // Check if the access token is expired or about to expire
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        const tokenExpiration = decodedToken.exp;

        if (tokenExpiration - currentTime < 60) {
          // Token is about to expire in less than 1 minute, refresh it
          try {
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_URL}/auth/refresh`,
              {},
              { withCredentials: true }
            );
            const newAccessToken = response.data.accessToken;
            if (newAccessToken) {
              setAccessToken(newAccessToken);
              config.headers.Authorization = `Bearer ${newAccessToken}`;
            } else {
              setConnected(false);
              setRole(null);
            }
          } catch (error) {
            // Handle refresh token failure, maybe redirect to login page
            setConnected(false);
            setRole(null);
            console.error("Failed to refresh access token:", error);
          }
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
            <Home />
        }
      />

      <Route
        path="/reset-password/:token"
        element={
            <ResetPassword />
        }
      />

      {connected == true && (
        <>
          <Route
            path="/profile"
            element={
              <DashboardLayout>
                <Profile />
              </DashboardLayout>
            }
          />

          {role === "admin" && (
            <Route
              path="/dashboard"
              element={
                <DashboardLayout>
                  <Suspense
                    fallback={
                      <div>
                        <img src={loading_gif} alt="loading gif" />
                      </div>
                    }
                  >
                    <Dashboard />
                  </Suspense>
                </DashboardLayout>
              }
            />
          )}
        </>
      )}

      <Route
        path="*"
        element={
            <NotFound />
        }
      />
    </Routes>
  );
};

export default Router;
