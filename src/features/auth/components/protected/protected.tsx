import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from 'react';
import { Loading } from "@/components/loading";
import { useUser } from "@/features/auth/api/get-auth-user";

export type ProtectedProps = {
  children: ReactNode;
};

export const Protected = ({
  children,
}: ProtectedProps) => {
  const {
    replace,
    asPath,
  } = useRouter();

  const user = useUser();
  const {
    data,
    isLoading,
  } = user;

  useEffect(() => {
    if(!data && !isLoading){
      replace(
        `/auth/login?redirect=${ asPath }`,
        undefined,
        {
          shallow: true,
        },
      );
    }
  }, [
    data,
    isLoading,
    asPath,
    replace,
  ]);

  if(isLoading){
    return (
      <Flex
        direction="column"
        justify="center"
        h="full"
      >
        <Loading />
      </Flex>
    );
  }
  if(!data && !isLoading){
    return null;
  }
  return (
    <>
      { children }
    </>
  );
};
