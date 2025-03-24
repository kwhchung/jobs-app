import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";
import { ReactNode, MouseEventHandler } from "react";

const variants = {
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
    bg: "white",
    color: "primary",
  },
};

type CustomButtonProps = {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: keyof typeof variants;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
}

export type ButtonProps = Omit<ChakraButtonProps, keyof CustomButtonProps> & 
  CustomButtonProps;

export const Button = ({
  variant = "solid",
  type = "button",
  children,
  icon,
  ...props
}: ButtonProps) =>
  <ChakraButton
    { ...props }
    { ...variants[variant] }
    type={ type }
  >
    { icon }
    { children }
  </ChakraButton>