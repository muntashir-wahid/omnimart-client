"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const GlobalProvider = ({ allChildren }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {allChildren}
    </QueryClientProvider>
  );
};

export default GlobalProvider;
