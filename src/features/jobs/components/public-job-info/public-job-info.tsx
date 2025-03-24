import { IoMdEye } from "react-icons/io";
import {
  Heading,
  HStack,
  VStack,
  Text,
} from '@chakra-ui/react';

import { Content } from '@/components/content';
import { Link } from '@/components/link';

import { Job } from '../../types';

export const PublicJobInfo = ({ job }: { job: Job }) => {
  return (
    <>
      <VStack pt="16" pb="4" gap="8">
        <Heading size="2xl">{job?.position}</Heading>
        <HStack gap="12">
          <Text>{job?.department}</Text>
          <Text>{job?.location}</Text>
        </HStack>
        <Link
          href={`/organizations/${job?.organizationId}`}
          variant="outline"
          icon={<IoMdEye />}
        >
          View More Jobs
        </Link>
      </VStack>
      <Content>{job.info}</Content>
    </>
  );
};
