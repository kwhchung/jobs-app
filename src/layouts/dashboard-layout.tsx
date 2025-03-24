import { CiCircleInfo } from "react-icons/ci";
import {
  Box,
  Container,
  Flex,
  HStack,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useRouter } from "next/router";
import { Button } from '@/components/button';
import { Link } from '@/components/link';
import { useLogout, useUser, Protected } from "@/features/auth";

type DashboardLayoutProps = {
  children: ReactNode;
};

export const DashboardLayout = ({
  children,
}: DashboardLayoutProps) => {
  const user = useUser();

  return (
    <Protected>
      <Box as="section" h="100vh" overflowY="auto">
        <Navbar />
        <Container as="main" maxW="container.lg" py="12">
          {children}
        </Container>
        <Box py="8" textAlign="center">
          <Link
            href={`/organizations/${user.data?.organizationId}`}
          >
            View Public Organization Page
          </Link>
        </Box>
      </Box>
    </Protected>
  );
};

const Navbar = () => {
  const router = useRouter();
  const {
    submit,
    isLoading,
  } = useLogout({
    onSuccess: () => {
      router.push("/auth/login");
    },
  });

  return (
    <Box as="nav" bg="primary" color="primaryAccent">
      <Container maxW="container.lg" py="3">
        <Flex justify="space-between">
          <HStack>
            <Link variant="solid" href="/">
              Jobs App
            </Link>
            <HStack gap="1">
              <Link
                icon={<CiCircleInfo />}
                variant="solid"
                href="/dashboard/jobs"
              >
                Jobs
              </Link>
            </HStack>
          </HStack>
          <HStack>
            <Button
              isLoading={ isLoading }
              isDisabled={ isLoading }
              variant="outline"
              onClick={ () => {
                submit();
              } }
            >
              Log Out
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};
