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

  if (typeof window !== "undefined" && loading) return <Loading />;

  if (session) {
    return <div>{children}</div>;
  }
  return <AccessDenied />;
};

export default SessionLayout;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
