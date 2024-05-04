"use client"

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {FC, ReactNode, useState} from "react";

interface IQueryProviderProps {
  children: ReactNode
}

export const QueryProvider: FC<IQueryProviderProps> = ({children}) => {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};