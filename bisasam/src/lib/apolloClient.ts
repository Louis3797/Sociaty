import { useMemo } from "react";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: "http://localhost:3000/api/graphql",
    }),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null | undefined = null
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(
  initialState: NormalizedCacheObject | null | undefined
) {
  const store: ApolloClient<NormalizedCacheObject> = useMemo(
    () => initializeApollo(initialState),
    [initialState]
  );
  return store;
}
