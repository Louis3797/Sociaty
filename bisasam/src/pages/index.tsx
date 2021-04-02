import { signIn, signOut, useSession } from "next-auth/client";
import Dashboard from "../components/templates/Dashboard/Dashboard";

export const Page = () => {
  const [session, loading] = useSession();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!session) {
    return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  } else {
    return Promise.resolve("/dash");
  }
};

export default Page;
