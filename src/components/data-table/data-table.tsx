import {
  Box,
  Center,
  Table,
  Text,
} from '@chakra-ui/react';
import { ReactNode } from "react";
import { Entity } from '@/types';
import { Loading } from '../loading';

type DataTableColumn<Entry> = {
  title: string;
  field: keyof Entry;
  render?: ({ entry }: { entry: Entry }) => ReactNode;
};

export type DataTableProps<Entry> = {
  isLoading: boolean;
  data?: Entry[];
  columns: DataTableColumn<Entry>[];
};

export const DataTable = <Entry extends Entity>({
  data,
  columns,
  isLoading,
}: DataTableProps<Entry>) => {
  if (isLoading) {
    return <Loading />;
  }

  if (data?.length === 0) {
    return (
      <Center
        h="56"
        p="4"
        bg="gray.100"
        borderRadius="md"
      >
        No Data
      </Center>
    );
  }

  return (
    <Box
      h="full"
      rounded="md"
      borderWidth="1px"
      bg="whiteAlpha.400"
    >
      <Box overflowX="auto">
        <Table.Root w="full" striped>
          <Table.Header>
            <Table.Row>
              {columns.map((column, index) => (
                <Table.ColumnHeader key={column.title + index}>
                  {column.title}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data?.map((entry, entryIndex) => (
              <Table.Row
                data-testid={`table-row-${entryIndex}`}
                key={entry.id || entryIndex}
              >
                {columns.map(
                  (
                    { field, title, render },
                    columnIndex
                  ) => (
                    <Table.Cell key={title + columnIndex}>
                      <Text>
                        {render
                          ? render({ entry })
                          : `${entry[field]}`}
                      </Text>
                    </Table.Cell>
                  )
                )}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
};
