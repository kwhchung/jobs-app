import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { system } from "@/config/theme";
import { queryClient } from "@/lib/react-query";
import { Notifications } from "@/components/notifications";

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => (
  <ChakraProvider value={ system }>
    <Notifications />
    <ErrorBoundary
      fallback={ <div>Something went wrong!</div> }
      onError={ console.error }
    >
      <QueryClientProvider client={ queryClient }>
        <ReactQueryDevtools initialIsOpen={ false } />
        { children }
      </QueryClientProvider>
    </ErrorBoundary>
  </ChakraProvider>
);