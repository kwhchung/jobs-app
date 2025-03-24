import { NextPage } from "next";
import dynamic from "next/dynamic";
import { AppProps } from "next/app";
import { ReactNode } from "react";
import { AppProvider } from "@/providers/app";
import { API_MOCKING } from "@/config/constants";
import { MSWWrapperProps } from "@/lib/msw";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
}

const MSWWrapper = dynamic<MSWWrapperProps>(() => (
  import("@/lib/msw").then(({ MSWWrapper }) => MSWWrapper)
));

const App = ({
  Component,
  pageProps,
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: ReactNode): ReactNode => page);
  const pageContent = getLayout(
    <Component { ...pageProps } />
  );

  return (
    <AppProvider>
      { API_MOCKING ? (
        <MSWWrapper>
          { pageContent }
        </MSWWrapper>
      ) : (
        pageContent
      ) }
    </AppProvider>
  );
};

export default App;