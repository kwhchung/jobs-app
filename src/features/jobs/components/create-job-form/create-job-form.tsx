import { Box, Stack } from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import { Button } from '@/components/button';
import { InputField } from '@/components/form';
import { useCreateJob } from "@/features/jobs/api/create-job";
import { CreateJobData } from "@/features/jobs/types";

export type CreateJobFormProps = {
  onSuccess: () => void;
};

export const CreateJobForm = ({
  onSuccess,
}: CreateJobFormProps) => {
  const {
    submit,
    isLoading
  } = useCreateJob({
    onSuccess,
  });

  const {
    register,
    handleSubmit,
    formState,
  } = useForm<CreateJobData>();

  const onSubmit = (data: CreateJobData) => {
    submit({
      data,
    });
  };

  return (
    <Box w="full">
      <Stack
        as="form"
        onSubmit={ handleSubmit(onSubmit) }
        w="full"
        gap="8"
      >
        <InputField
          label="Position"
          { ...register("position", {
            required: "Required",
          }) }
          error={ formState.errors["position"] }
        />
        <InputField
          label="Department"
          { ...register("department", {
            required: "Required",
          }) }
          error={ formState.errors["department"] }
        />
        <InputField
          label="Location"
          { ...register("location", {
            required: "Required",
          }) }
          error={ formState.errors["location"] }
        />

        <InputField
          type="textarea"
          label="Info"
          { ...register("info", {
            required: "Required",
          }) }
          error={ formState.errors["info"] }
        />

        <Button
          isDisabled={ isLoading }
          isLoading={ isLoading }
          type="submit"
        >
          Create
        </Button>
      </Stack>
    </Box>
  );
};
