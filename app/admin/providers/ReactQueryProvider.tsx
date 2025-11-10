"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export default function ReactQueryProvider({ children }: { children: ReactNode }) {
  // Create client once per component mount
  const [client] = useState(() => new QueryClient());
  
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
