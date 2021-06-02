import React from "react";
import { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import "../styles/globals.css";
import SessionLayout from "../components/layouts/SessionLayout";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <Provider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      options={{
        // Client Max Age controls how often the useSession in the client should
        // contact the server to sync the session state. Value in seconds.
        // e.g.
        // * 0  - Disabled (always use cache value)
        // * 60 - Sync session state with server if it's older than 60 seconds
        clientMaxAge: 60,
        // Keep Alive tells windows / tabs that are signed in to keep sending
        // a keep alive request (which extends the current session expiry) to
        // prevent sessions in open windows from expiring. Value in seconds.
        //
        // Note: If a session has expired when keep alive is triggered, all open
        // windows / tabs will be updated to reflect the user is signed out.
        keepAlive: 0,
      }}
      session={pageProps.session}
    >
      <SessionLayout>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </SessionLayout>
    </Provider>
  );
}

export default App;
