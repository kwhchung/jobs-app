import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { AuthUser } from "@/features/auth/types";

export const getAuthUser = (): Promise<AuthUser> => (
  apiClient.get("auth/me")
);

export const useUser = () => {
  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: [
      "auth-user",
    ],
    queryFn: () => getAuthUser(),
  });
  
  return {
    data,
    isLoading,
  };
};
