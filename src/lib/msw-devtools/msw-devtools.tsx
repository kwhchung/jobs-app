import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  Button,
  Drawer,
  Tabs,
  IconButton,
  CloseButton
} from '@chakra-ui/react';
import { FactoryAPI } from '@mswjs/data/lib/glossary';
import { HttpHandler } from 'msw';
import * as React from 'react';
import { APIDevtools } from './api-devtools';
import { DataDevTools } from './data-devtools';

export type MSWDevToolsProps = {
  db?: FactoryAPI<Record<string, unknown>>;
  handlers?: HttpHandler[];
};

export function MSWDevTools({ db, handlers }: MSWDevToolsProps) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const onOpenChange = () => setIsOpen(open => !open);
  const [size, setSize] = React.useState<"xl" | "full">('xl');

  return (
    <div>
      <Drawer.Root
        size={size}
        placement="end"
        onOpenChange={onOpenChange}
        open={isOpen}
      >
        <Drawer.Trigger asChild>
          <Button
            zIndex="999"
            position="fixed"
            bottom="10px"
            right="10px"
            bg="blue.500"
            _hover={ {
              bg: "blue.600"
            } }
          >
            Dev Tools
          </Button>
        </Drawer.Trigger>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header borderBottomWidth="1px">
              <IconButton
                onClick={() => setSize((v) => (v === 'xl' ? 'full' : 'xl'))}
                aria-label="resize-drawer"
                mr="4"
                variant="subtle"
              >
                { size === 'xl' ? <FaChevronLeft /> : <FaChevronRight /> }
              </IconButton>
              Devtools
              <Drawer.CloseTrigger asChild>
                <CloseButton />
              </Drawer.CloseTrigger>
            </Drawer.Header>
            <Drawer.Body>
              <Tabs.Root defaultValue="api">
                <Tabs.List>
                  <Tabs.Trigger value="api">API</Tabs.Trigger>
                  {db && <Tabs.Trigger value="data">Data</Tabs.Trigger>}
                </Tabs.List>
                <Tabs.Content value="api">
                  <APIDevtools handlers={handlers} />
                </Tabs.Content>
                {db && (
                  <Tabs.Content value="data">
                    <DataDevTools db={db} />
                  </Tabs.Content>
                )}
              </Tabs.Root>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </div>
  );
}
