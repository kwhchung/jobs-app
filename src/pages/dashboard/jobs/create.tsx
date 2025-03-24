import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { Seo } from "@/components/seo";
import { CreateJobForm } from "@/features/jobs";
import { DashboardLayout } from "@/layouts/dashboard-layout";
import { useNotifications } from "@/stores/notifications";

const DashboardCreateJobPage = () => {
  const router = useRouter();
  const {
    showNotification,
  } = useNotifications();

  const onSuccess = () => {
    showNotification({
      type: "success",
      title: "Success",
      duration: 5000,
      message: "Job Created!",
    });

    router.push("/dashboard/jobs");
  }

  return (
    <>
      <Seo title="Create Job" />
      <Heading mb="8">Create Job</Heading>
      <CreateJobForm onSuccess={ onSuccess } />
    </>
  );
};

DashboardCreateJobPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    { page }
  </DashboardLayout>
);

export default DashboardCreateJobPage;