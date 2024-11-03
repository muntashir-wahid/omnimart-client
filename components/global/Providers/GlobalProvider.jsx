"use client";

import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { store } from "@/store/store";
import FetchThunksWrapper from "./FetchThunksWrapper";

const queryClient = new QueryClient();

const GlobalProvider = ({ allChildren }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <FetchThunksWrapper>{allChildren}</FetchThunksWrapper>
      </Provider>
    </QueryClientProvider>
  );
};

export default GlobalProvider;
