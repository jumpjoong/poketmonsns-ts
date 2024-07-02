import React from "react";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "@/app/_store/store";
import { Props } from "@/app/_types/reactNode";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const AuthProvider = ({ children }: Props) => {
  const queryClient = new QueryClient();
  return (
    <SessionProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    </SessionProvider>
  );
};

export default AuthProvider;
