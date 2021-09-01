import { useRouter } from "next/router";
import jwt, { JWT } from "next-auth/jwt";
import { useEffect } from "react";
import Dash from "./dash";

const secret = process.env.SECRET;
interface IndexProps {
  token?: JWT;
}
const Index: React.FC<IndexProps> = ({ token }) => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dash");
    window.sessionStorage.setItem("UID", token?.sub);
    if (
      window.sessionStorage.getItem("UNAME") === token?.user?.displayName ||
      window.sessionStorage.getItem("UNAME") === null
    ) {
      window.sessionStorage.setItem("UNAME", token?.user?.displayName);
    }
  });
  return <Dash />;
};

export default Index;

export async function getServerSideProps(context) {
  const req = context.req;

  const token = await jwt.getToken({ req, secret, encryption: true });

  return {
    props: {
      token,
    },
  };
}
