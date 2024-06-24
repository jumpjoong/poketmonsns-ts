import React from "react";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "@/app/_store/store";
interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
};

export default AuthProvider;
