import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import "../styles/globals.css";
import SessionLayout from "../components/layouts/SessionLayout";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import NavLayout from "../components/layouts/NavLayout";
import { SnackbarProvider } from "notistack";

function App({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <>
      <Head>
        <title>sociaty - the peoples network</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <NavLayout>
                <Component {...pageProps} />
              </NavLayout>
            </SnackbarProvider>
          </ApolloProvider>
        </SessionLayout>
      </Provider>
    </>
  );
}

export default App;
