import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
  Table,
  VStack,
} from '@chakra-ui/react';
import * as React from 'react';

export function DataTable({
  name,
  data,
}: {
  name: string;
  data: Array<Record<string, unknown>>;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const onToggle = () => setIsOpen((v) => !v);
  const columns = Object.keys(data?.[0] || {});
  return (
    <VStack w="full" bg="gray.50" p="4">
      <Flex w="full" justifyContent="space-between" alignItems="center">
        <Heading size="sm" textTransform="capitalize" alignSelf="start">
          {name} ({data.length})
        </Heading>
        <Button
          onClick={onToggle}
          variant="subtle"
        >
          {isOpen ? 'Hide' : 'Show'}
        </Button>
      </Flex>

      {isOpen && (
        <Box overflow="auto" width="100%">
          <Table.Root minWidth="100%">
            <Table.Header bg="gray.200">
              <Table.Row>
                {columns.map((column) => (
                  <Table.ColumnHeader textTransform="initial" key={column}>
                    {column}
                  </Table.ColumnHeader>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map((entry) => (
                <Table.Row key={JSON.stringify(entry)}>
                  {columns.map((column) => (
                    <Table.Cell key={column}>
                      <Text maxWidth="250px" truncate>
                        {entry[column] as string}
                      </Text>
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
      )}
    </VStack>
  );
}
