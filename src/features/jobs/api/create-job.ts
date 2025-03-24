import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { queryClient } from "@/lib/react-query";
import { Job, CreateJobData } from "@/features/jobs/types";

type CreateJobOptions = {
  data: CreateJobData;
};

export const createJob = ({
  data,
}: CreateJobOptions): Promise<Job> => (
  apiClient.post("jobs", data)
);

type UseCreateJobOptions = {
  onSuccess?: (job: Job) => void;
};

export const useCreateJob = ({
  onSuccess,
}: UseCreateJobOptions = {}) => {
  const {
    mutate: submit,
    isPending: isLoading,
  } = useMutation({
    mutationFn: createJob,
    onSuccess: job => {
      queryClient.invalidateQueries({
        queryKey: [
          "jobs",
        ],
      });
      onSuccess?.(job);
    },
    });
  
  return {
    submit,
    isLoading,
  };
};