import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import React, { ReactNode } from "react";
import AccessDenied from "../templates/AccessDenied/AccessDenied";
import Loading from "../templates/Loading/Loading";

export interface SessionLayoutProps {
  children: ReactNode;
}

const SessionLayout: React.FC<SessionLayoutProps> = ({ children }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <AccessDenied />;
  }

  return <>{children}</>;
};

export default SessionLayout;
