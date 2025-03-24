import { Center, VStack, Heading, Text } from "@chakra-ui/react";
import { Seo } from "@/components/seo";
import { Link } from "@/components/link";

const LandingPage = () => (
  <>
    <Seo title="Jobs App"/>
    <Center h="full">
      <VStack gap="8">
        <Heading size="6xl">Jobs App</Heading>
        <Text>Manage your careers pages</Text>
        <Link
          href="/dashboard/jobs"
          variant="solid"
        >Get Started</Link>
      </VStack>
    </Center>
  </>
);

export default LandingPage;
