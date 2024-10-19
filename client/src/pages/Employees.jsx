import { Users, Box, Newspaper, PersonStanding, Percent, SquareUserRound } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import UserTable from "@/components/dashboard/UserTable.jsx";
import { useGetStatistics } from "@/hooks/react-query/useUser.js";
import loading_gif from "@/assets/images/Loading-icon-unscreen.gif";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Employees() {
  const { data: statistics, isLoading } = useGetStatistics();
  const Navigate = useNavigate();
  if (isLoading)
    return (
      <div>
        <img src={loading_gif} alt="loading gif" />
      </div>
    );
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 md:gap-6">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card
            x-chunk="dashboard-01-chunk-1"
            className="dark:bg-black dark:border-neutral-800"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.users}</div>
              <p className="text-xs text-muted-foreground">
                {statistics.userPercentageLastMoth}% from last month
              </p>
            </CardContent>
          </Card>
          <Card
            x-chunk="dashboard-01-chunk-1"
            className="dark:bg-black dark:border-neutral-800"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Managers
              </CardTitle>
              <SquareUserRound className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.managers}</div>
              <p className="text-xs text-muted-foreground">
                {statistics.managersPercentageLastMoth}% from last month
              </p>
            </CardContent>
          </Card>
          <Card
            x-chunk="dashboard-01-chunk-1"
            className="dark:bg-black dark:border-neutral-800"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Operators
              </CardTitle>
              <PersonStanding className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.operators}</div>
              <p className="text-xs text-muted-foreground">
                {statistics.operatorsPercentageLastMoth}% from last month
              </p>
            </CardContent>
          </Card>
          <Card
            x-chunk="dashboard-01-chunk-1"
            className="dark:bg-black dark:border-neutral-800"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Percentage of Users
              </CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">
                {statistics.managersPercentage}%{" "}
                <span className="font-normal text-base">Managers</span>
              </div>
              <div className="text-xl font-bold">
                {statistics.operatorsPercentage}%{" "}
                <span className="font-normal text-base">Operators</span>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 grid-cols-1 xl:grid-cols-1">
          <Card
            className="xl:col-span-2 dark:bg-black dark:border-neutral-800"
            x-chunk="dashboard-01-chunk-4"
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="grid gap-2">
                <CardTitle>All Users</CardTitle>
                <CardDescription>
                  All users in the system and their details. (except you)
                </CardDescription>
              </div>
              <Button
                className=" bg-orange-500 hover:bg-orange-700"
                onClick={() => Navigate("/employees/add")}
              >
                Add User
              </Button>
            </CardHeader>
            <CardContent>
              <UserTable />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
