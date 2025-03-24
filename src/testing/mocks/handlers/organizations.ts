import { http, delay } from "msw";
import { API_URL } from "@/config/constants";
import { db } from "@/testing/mocks/db";
import {
  getInvalidParameterResponse,
  getNotFoundResponse,
  getSuccessResponse,
} from "@/testing/mocks/handlers/responses";

const isValidParameter = (param: unknown): boolean => (
  typeof param === "string" && !!param
);

const getOrganizationHandler = http.get(
  `${ API_URL }/organizations/:organizationId`,
  async ({
    params: {
      organizationId
    }
  }) => {
    if(!isValidParameter(organizationId)){
      return getInvalidParameterResponse();
    }

    const organization = db.organization.findFirst({
      where: {
        id: {
          equals: organizationId as string,
        },
      },
    });

    await delay(300);
    if(!organization){
      return getNotFoundResponse();
    }
    return getSuccessResponse({
      data: organization,
    });
  },
);

export const organizationsHandlers = [
  getOrganizationHandler,
];
