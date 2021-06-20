import { useCallback } from "react";
import { v4 as uuid } from "uuid";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphql/mutations";

const useLoginUser = () => {
  const [login, { data, loading, error }] = useMutation(LOGIN_USER);
  const handler = useCallback(
    async (username, password) => {
      try {
        await login({
          variables: {
            username,
            password,
            clientMutationId: uuid(),
          },
        });
      } catch (err) {}
    },
    [login]
  );

  return { login: handler, loading, data, error };
};

export default useLoginUser;
