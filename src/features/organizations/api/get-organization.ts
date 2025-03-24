import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { Organization } from "@/features/organizations/types";

type GetOrganizationOptions = {
  organizationId: string;
}

export const getOrganization = ({
  organizationId,
}: GetOrganizationOptions): Promise<Organization> => (
  apiClient.get(`/organizations/${ organizationId }`)
);

export const useOrganization = ({
  organizationId,
}: GetOrganizationOptions) => {
  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: [
      "organizations",
      organizationId,
    ],
    queryFn: () => getOrganization({
      organizationId,
    }),
  });

  return {
    data,
    isLoading,
  };
};