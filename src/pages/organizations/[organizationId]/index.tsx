import { Heading, Stack } from "@chakra-ui/react";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { ReactNode } from "react";
import { NotFound } from "@/components/not-found";
import { Seo } from "@/components/seo";
import { JobsList, Job, getJobs } from "@/features/jobs"
import {
  OrganizationInfo,
  getOrganization,
} from "@/features/organizations";
import { PublicLayout } from "@/layouts/public-layout";

type PublicOrganizationPageProps = 
  InferGetServerSidePropsType<typeof getServerSideProps>;

const PublicOrganizationPage = ({
  organization,
  jobs,
}: PublicOrganizationPageProps) => {
  if(!organization){
    return (
      <NotFound />
    );
  }

  return (
    <>
      <Seo title={ organization.name } />
      <Stack
        gap="4"
        w="full"
        maxW="container.lg"
        mx="auto"
        mt="12"
        p="4"
      >
        <OrganizationInfo organization={ organization } />
        <Heading
          size="md"
          my="6"
        >
          Open Jobs
        </Heading>
        <JobsList
          jobs={ jobs }
          organizationId={ organization.id }
          type="public"
        />
      </Stack>
    </>
  );
};

PublicOrganizationPage.getLayout = (page: ReactNode) => (
  <PublicLayout>
    { page }
  </PublicLayout>
);

export default PublicOrganizationPage;

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const organizationId = params?.organizationId as string;

  const [
    organization,
    jobs,
  ] = await Promise.all([
    getOrganization({
      organizationId,
    }).catch(() => null),
    getJobs({
      params: {
        organizationId,
      }
    }).catch(() => [] as Job[]),
  ]);

  return {
    props: {
      organization,
      jobs,
    },
  };
};