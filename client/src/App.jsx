import Router from "./routes/Router.jsx";
import { Toaster } from "@/components/ui/toaster.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext.jsx";
import { useState } from "react";
import ScrollToTop from "./lib/ScrollToTop.js";

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
        <ScrollToTop />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
