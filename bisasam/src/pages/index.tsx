import { useRouter } from "next/router";
import { getToken, JWT } from "next-auth/jwt";
import { useEffect } from "react";
import Dash from "./dash";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
interface IndexProps {
  token: {
    sub: string;
    user: {
      displayName: string;
    };
  };
}
const Index: React.FC<IndexProps> = ({ token }) => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dash");
    window.sessionStorage.setItem("UID", token?.sub);
    if (
      window.sessionStorage.getItem("UNAME") === token?.user.displayName ||
      window.sessionStorage.getItem("UNAME") === null
    ) {
      window.sessionStorage.setItem("UNAME", token?.user.displayName);
    }
  });
  return <Dash />;
};

export default Index;

type Data = {
  token: JWT;
};

export const getServerSideProps = async (context: {
  req: NextApiRequest;
  res: NextApiResponse<Data>;
}): Promise<{
  props: {
    token: JWT | null;
  };
}> => {
  const req: NextApiRequest = context.req;

  const token = await getToken({ req, secret: process.env.SECRET });

  console.log(token);
  return {
    props: {
      token,
    },
  };
};
