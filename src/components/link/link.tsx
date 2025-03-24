import { Button, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactNode } from "react";

const variants = {
  link: {
    color: "primary",
    bg: "transparent",
  },
  solid: {
    variant: "solid" as const,
    bg: "primary",
    color: "primaryAccent",
    _hover: {
      opacity: "0.9",
    },
  },
  outline: {
    variant: "outline" as const,
    color: "primary",
    bg: "white",
  },
};

export type LinkProps = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  icon?: ReactNode;
  shallow?: boolean;
}

export const Link = ({
  href,
  children,
  variant = "link",
  icon,
  shallow = false,
}: LinkProps) =>
  <ChakraLink
    asChild
    variant="plain"
  >
    <NextLink
      href={ href }
      shallow={ shallow }
    >
      <Button
        { ...variants[variant] }
      >
        { icon }
        { children }
      </Button>
    </NextLink>
  </ChakraLink>