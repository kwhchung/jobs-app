import { CiSquarePlus } from "react-icons/ci";
import { Heading, HStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Link } from "@/components/link";
import { Seo } from "@/components/seo";
import { JobsList, useJobs } from "@/features/jobs";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import { useUser } from "@/features/auth";

const DashboardJobsPage = () => {
  const user = useUser();
  const jobs = useJobs({
    params: {
      organizationId: user.data?.organizationId ?? "",
    },
  });

  if(!user.data){
    return null;
  }

  return (
    <>
      <Seo title="Jobs" />
      <HStack
        mb="8"
        align="center"
        justify="space-between"
      >
        <Heading size="3xl">Jobs</Heading>
        <Link
          icon={ <CiSquarePlus /> }
          variant="solid"
          href="/dashboard/jobs/create"
        >
          Create Job
        </Link>
      </HStack>
      <JobsList
        jobs={ jobs.data || [] }
        isLoading={ jobs.isLoading }
        organizationId={ user.data.organizationId }
        type="dashboard"
      />
    </>
  );
};

DashboardJobsPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    { page }
  </DashboardLayout>
);

export default DashboardJobsPage;
