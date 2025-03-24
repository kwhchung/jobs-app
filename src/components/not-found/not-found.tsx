import { CiNoWaitingSign } from "react-icons/ci";
import {
  Center,
  Heading,
  VStack,
} from '@chakra-ui/react';

export const NotFound = () => {
  return (
    <Center color="gray.500" h="96">
      <VStack>
        <CiNoWaitingSign size="3em" />
        <Heading>Not Found</Heading>
      </VStack>
    </Center>
  );
};