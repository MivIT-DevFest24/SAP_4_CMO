import { Users, Box, Newspaper } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import {
  useGetStatistics,
} from "@/hooks/react-query/useUser.js";
import loading_gif from "@/assets/images/Loading-icon-unscreen.gif";

export default function Dashboard() {
  const { data: statistics, isLoading } = useGetStatistics();
  if (isLoading)
    return (
      <div>
        <img src={loading_gif} alt="loading gif" />
      </div>
    );
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
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
                +32% from last month
              </p>
            </CardContent>
          </Card>
          <Card
            x-chunk="dashboard-01-chunk-1"
            className="dark:bg-black dark:border-neutral-800"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <Box className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.products}</div>
              <p className="text-xs text-muted-foreground">
                +80% from last month
              </p>
            </CardContent>
          </Card>
          <Card
            x-chunk="dashboard-01-chunk-1"
            className="dark:bg-black dark:border-neutral-800"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total News</CardTitle>
              <Newspaper className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics.news}</div>
              <p className="text-xs text-muted-foreground">
                +13% from last month
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
