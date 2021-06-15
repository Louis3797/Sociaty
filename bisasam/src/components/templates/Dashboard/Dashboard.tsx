import Feed from "../../modules/Feed";
import { useSession } from "next-auth/client";
import { ApolloError, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_USER_ID } from "../../../graphql/querys";
import MainLayout from "../../layouts/MainLayout";
interface ID {
  id: Number;
}

interface ID_DATA {
  findUserWithEmail: ID;
  loading: boolean;
  error: ApolloError;
}

export const Dashboard: React.FC = () => {
  const [session] = useSession();

  // Get the email of the current User
  const userEmail: string = session?.user.email.toString();

  // Query with the current User email
  const { loading, error, data } = useQuery<ID_DATA>(GET_USER_ID, {
    variables: { email: userEmail.toString() },
  });

  useEffect(() => {
    // If the data is loading
    if (loading) console.log("loading...");

    // If an error occurs
    if (error) console.log("error...");

    // If the Query data is undefined
    if (data == undefined) console.log("undefined data");
    // If the session is true than setItem UID in SessionStorage , The item is the User_ID
    else if (session) {
      window.sessionStorage.setItem(
        "UID",
        data?.findUserWithEmail.id.toString()
      );
    }
  }, [session, data]);

  return (
    <MainLayout rightPanel={<h1>Hallooooo</h1>}>
      <Feed>
        <h1>Hallooooo</h1>
      </Feed>
    </MainLayout>
  );
};
export default Dashboard;
