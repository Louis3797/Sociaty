import { useSession } from "next-auth/client";
import { ApolloError, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_USER_ID } from "../graphql/querys";

interface ID {
  id: string;
}

interface ID_DATA {
  getUserID: ID;
  loading: boolean;
  error: ApolloError;
}

export const useSetSessionID = () => {
  const [session] = useSession();

  // Get the email of the current User
  const userEmail: string = session?.user.email.toString();

  // Query with the current User email
  const { loading, error, data } = useQuery<ID_DATA>(GET_USER_ID, {
    variables: { email: userEmail },
  });

  useEffect(() => {
    // If the data is loading
    if (loading) console.log("loading uid...");

    // If an error occurs
    if (error) console.log("uid error...");

    // If the Query data is undefined
    if (data == undefined) console.log("undefined uid data");
    // If the session is true than setItem UID in SessionStorage , The item is the User_ID
    else if (session) {
      console.log(data);
      window.sessionStorage.setItem("UID", data?.getUserID.id);
    }
  }, [session, data]);
};
