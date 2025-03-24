import { http, HttpResponse } from "msw";
import { API_URL } from "@/config/constants";
import { authHandlers } from "@/testing/mocks/handlers/auth";
import { jobsHandlers } from "@/testing/mocks/handlers/jobs";
import { organizationsHandlers } from "@/testing/mocks/handlers/organizations";

export const handlers = [
  ...authHandlers,
  ...jobsHandlers,
  ...organizationsHandlers,
  http.get(`${ API_URL }/healthcheck`, () => (
    HttpResponse.json({
      healthy: true,
    }, {
      status: 200,
    })
  )),
];