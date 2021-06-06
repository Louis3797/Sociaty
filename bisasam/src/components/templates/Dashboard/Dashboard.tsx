import Feed from "../../modules/Feed";
import { useSession } from "next-auth/client";
import { ApolloError, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_USER_ID } from "../../../graphql/querys";
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
    <div className="flex flex-col w-full h-full justify-center items-center mt-15 bg-primary-900">
      <div className="flex flex-row 2xl:w-3/5 xl:w-3/4 lg:w-4/5 md:w-full sm:w-full h-full bg-primary-900 mt-12">
        <div className="flex w-2/3 h-full bg-transparent justify-center">
          <Feed>
            <h1>Hello World</h1>
          </Feed>
        </div>
        <div className="flex flex-grow h-full bg-transparent-300">
          <h1>test</h1>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
