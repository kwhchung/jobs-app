import { FiRefreshCcw } from "react-icons/fi";
import { Box, Button, VStack } from '@chakra-ui/react';
import { FactoryAPI } from '@mswjs/data/lib/glossary';

import { HttpHandler } from 'msw';
import * as React from 'react';
import { DataTable } from './data-table';

export type MSWDevToolsProps = {
  db?: FactoryAPI<Record<string, unknown>>;
  handlers?: HttpHandler[];
};

export function DataDevTools({ db }: { db: FactoryAPI<Record<string, unknown>> }) {
  const [data, setData] = React.useState<
    Record<string, Array<Record<string, unknown>>>
  >({});

  const loadDbs = React.useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = Object.entries(db).reduce<any>((acc, [k, v]) => {
      acc[k] = v.getAll();
      return acc;
    }, {});

    setData(result);
  }, [db, setData]);

  React.useEffect(() => {
    loadDbs();
  }, [loadDbs]);

  return (
    <VStack gap="12">
      <Box>
        <Button
          flex="1"
          type="button"
          variant="subtle"
          onClick={() => loadDbs()}
        >
          <FiRefreshCcw />
          Refresh Data
        </Button>
      </Box>
      {Object.entries(data).map(([k, v]) => (
        <DataTable key={k} name={k} data={v} />
      ))}
    </VStack>
  );
}
