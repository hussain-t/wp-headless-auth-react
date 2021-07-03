import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Router from "./components/Router";

const client = new ApolloClient({
  /**
   * `uri` specifies the URL of our GraphQL server
   */
  uri: "http://headless-wp-auth.local/graphql",
  /**
   * `cache` is an instance of InMemoryCache,
   * which Apollo Client uses to cache
   * query results after fetching them
   */
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  );
};

export default App;
