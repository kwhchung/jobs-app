import Head from "next/head";

export type SeoProps = {
  title: string;
};

export const Seo = ({
  title
}: SeoProps) => (
  <Head>
    <title>
      { title }
    </title>
  </Head>
);