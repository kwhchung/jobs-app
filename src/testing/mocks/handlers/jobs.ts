import { http, delay } from "msw";
import { API_URL } from "@/config/constants";
import { db } from "@/testing/mocks/db";
import {
  getInvalidParameterResponse,
  getNotAuthorizedResponse,
  getNotFoundResponse,
  getSuccessResponse,
} from "@/testing/mocks/handlers/responses";
import { requireAuth } from "@/testing/mocks/utils";

type RawJobData = {
  position: string;
  info: string;
  location: string;
  department: string;
};

type ValidJobData = RawJobData & {
  id: string;
  date: Date;
};

const isValidJobData = (jobData: RawJobData): boolean => (
  typeof jobData.position === "string" && typeof jobData.info === "string" && 
  typeof jobData.location === "string" && typeof jobData.department === "string"
);

const isValidParameter = (param: unknown): boolean => (
  typeof param === "string" && !!param
);

const getJobsHandler = http.get(
  `${ API_URL }/jobs`,
  async ({ request }) => {
    const url = new URL(request.url);
    const organizationId = url.searchParams.get("organizationId");
    
    if(!isValidParameter(organizationId)){
      return getInvalidParameterResponse();
    }

    const jobs = db.job.findMany({
      where: {
        organizationId: {
          equals: organizationId as string,
        },
      },
    });

    await delay(300);
    return getSuccessResponse({
      data: jobs,
    });
  },
);

const getJobHandler = http.get(
  `${ API_URL }/jobs/:jobId`,
  async ({
    params: {
      jobId
    }
  }) => {
    if(!isValidParameter(jobId)){
      return getInvalidParameterResponse();
    }

    const job = db.job.findFirst({
      where: {
        id: {
          equals: jobId as string,
        },
      },
    });

    await delay(300);
    if(!job){
      return getNotFoundResponse();
    }
    return getSuccessResponse({
      data: job,
    });
  },
);

const createJobHandler = http.post(
  `${ API_URL }/jobs`,
  async ({ request, cookies }) => {
    const user = requireAuth({
      cookies,
      shouldThrow: false,
    });
    if(!user){
      return getNotAuthorizedResponse();
    }

    const jobData = await request.json() as RawJobData;
    if(!isValidJobData(jobData)){
      return getInvalidParameterResponse();
    }

    const job = db.job.create({
      ...jobData as ValidJobData,
      organizationId: user?.organizationId,
    });
    return getSuccessResponse({
      data: job,
    });
  },
);

export const jobsHandlers = [
  getJobsHandler,
  getJobHandler,
  createJobHandler,
];
