import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { getSession, useSession } from "next-auth/client";
import React, { ReactNode } from "react";
import AccessDenied from "../templates/AccessDenied/AccessDenied";
import Loading from "../templates/Loading/Loading";

export interface SessionLayoutProps {
  children: ReactNode;
}

const SessionLayout: React.FC<SessionLayoutProps> = ({
  children,
}: SessionLayoutProps) => {
  const [session, loading] = useSession();

  if (typeof window !== "undefined" && loading) return null;

  if (session) {
    return <>{children}</>;
  }
  return <AccessDenied />;
};

export default SessionLayout;

export const getServerSideProps = async (context: {
  req: NextApiRequest;
  res: NextApiResponse;
  query: { name: string };
}) => {
  return {
    props: { session: await getSession(context) },
  };
};
