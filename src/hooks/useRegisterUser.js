import { useCallback } from "react";
import { v4 as uuid } from "uuid";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../graphql/mutations";

const useRegisterUser = () => {
  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);
  const handler = useCallback(
    async (input) => {
      try {
        await registerUser({
          variables: {
            input: { ...input, clientMutationId: uuid() },
          },
        });
      } catch (err) {}
    },
    [registerUser]
  );

  return { registerUser: handler, loading, data, error };
};

export default useRegisterUser;
