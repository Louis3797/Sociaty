import React from "react";
import { LoginContext } from "../context/LoginContext";

export interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
}: MainLayoutProps) => {
  return (
    <>
      <LoginContext.Provider value={null}>{children}</LoginContext.Provider>
    </>
  );
};

export default MainLayout;
