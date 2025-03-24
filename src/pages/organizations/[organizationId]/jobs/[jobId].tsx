import { Stack } from "@chakra-ui/react";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { ReactNode } from "react";
import { Button } from "@/components/button";
import { NotFound } from "@/components/not-found";
import { Seo } from "@//components/seo";
import { PublicJobInfo, getJob } from "@/features/jobs";
import { getOrganization } from "@/features/organizations";
import { PublicLayout } from "@/layouts/public-layout";

type PublicJobPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const PublicJobPage = ({
  job,
  organization,
}: PublicJobPageProps) => {
  const isInvalid = !job || !organization || organization.id != job.organizationId;
  if(isInvalid){
    return (
      <NotFound />
    );
  }

  return (
    <>
      <Seo title={ `${ job.position } | ${ job.location }` } />
      <Stack w="full">
        <PublicJobInfo job={ job } />
        <a
          href={ `mailto:${ organization?.email }?subject=Application for ${ job.position } position` }
          target="_blank"
        >
          <Button w="full">
            Apply
          </Button>
        </a>
      </Stack>
    </>
  );
};

PublicJobPage.getLayout = (page: ReactNode) => (
  <PublicLayout>
    { page }
  </PublicLayout>
);

export default PublicJobPage;

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const organizationId = params?.organizationId as string;
  const jobId = params?.jobId as string;

  const [
    organization, job
  ] = await Promise.all([
    getOrganization({
      organizationId,
    }).catch(() => null),
    getJob({
      jobId,
    }).catch(() => null),
  ]);

  return {
    props: {
      job,
      organization,
    },
  };
};

