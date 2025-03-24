import { Stack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/button';
import { InputField } from '@/components/form';

import { LoginData } from '../../types';
import { useLogin } from "@/features/auth/api/login";

export type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({
  onSuccess,
}: LoginFormProps) => {
  const {
    submit,
    isLoading,
  } = useLogin({
    onSuccess,
  });

  const {
    register,
    handleSubmit,
    formState,
  } = useForm<LoginData>();

  const onSubmit = (data: LoginData) => {
    submit(data);
  };

  return (
    <Stack
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      gap="5"
      w="full"
    >
      <InputField
        label="Email"
        {...register('email', {
          required: 'Required'
        })}
        error={formState.errors['email']}
      />
      <InputField
        label="Password"
        type="password"
        {...register('password', {
          required: 'Required',
        })}
        error={formState.errors['password']}
      />
      <Button
        isLoading={ isLoading }
        isDisabled={ isLoading }
        type="submit"
      >
        Log in
      </Button>
    </Stack>
  );
};
