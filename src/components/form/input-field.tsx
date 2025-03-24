import { Input, Textarea } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { FieldError, UseFormRegister } from "react-hook-form";
import { forwardRef, Ref } from "react";

export type InputFieldProps = {
  type?: "text" | "password" | "textarea";
  label?: string;
  error?: FieldError;
} & Partial<ReturnType<UseFormRegister<Record<string, unknown>>>>;

export const InputField = forwardRef(
  ({
    type = "text",
    label,
    error,
    ...props
    }: InputFieldProps,
    ref: Ref<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const background = "white"; 
    return (
      <Field
        label={ label }
        helperText={ error?.message }
      >
        { type == "textarea" ? (
          <Textarea
            bg={ background }
            { ...props }
            ref={ ref as Ref<HTMLTextAreaElement> }
          />
        ) : 
        type == "password" ? (
          <PasswordInput 
            bg={ background }
            { ...props }
            ref={ ref as Ref<HTMLInputElement> }
          />
        ) : (
          <Input
            bg={ background }
            { ...props }
            ref={ ref as Ref<HTMLInputElement> }
          />
        ) }
      </Field>
    )
  }
);

InputField.displayName = "InputField";