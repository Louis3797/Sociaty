import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import SessionLayout from "../components/layouts/SessionLayout";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import NavLayout from "../components/layouts/NavLayout";
import { SnackbarProvider } from "notistack";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <>
      <Head>
        <title>sociaty - the peoples network</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <SessionProvider session={session} refetchInterval={5 * 60}>
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
      </SessionProvider>
    </>
  );
}

export default App;
