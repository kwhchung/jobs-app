import { http, delay, DefaultBodyType } from "msw";
import { API_URL } from "@/config/constants";
import {
  getInvalidParameterResponse,
  getNotAuthorizedResponse,
  getSuccessResponse,
} from "@/testing/mocks/handlers/responses";
import {
  authenticate,
  requireAuth,
  AUTH_COOKIE,
} from "@/testing/mocks/utils";

type ValidCredentials = {
  email: string;
  password: string;
};

type RawCredentials = DefaultBodyType & ValidCredentials

const isValidCredentials = (credentials: RawCredentials): boolean => (
  !!credentials.email && !!credentials.password
);

const loginHandler = http.post(
  `${ API_URL }/auth/login`,
  async ({ request }) => {
    const credentials = await request.json() as RawCredentials;
    if(!isValidCredentials(credentials)){
      return getInvalidParameterResponse();
    }

    const { user, jwt } = authenticate(credentials as ValidCredentials);
    const cookie = `${ AUTH_COOKIE }=${ jwt }; Path=/; HttpOnly`
    
    await delay(300);
    return getSuccessResponse({
      data: {
        user,
      },
      cookie
    });
  },
);

const logoutHandler = http.post(
  `${ API_URL }/auth/logout`,
  async () => {
    const cookie = `${ AUTH_COOKIE }=; Max-Age=0`
    await delay(300);
    return getSuccessResponse({
      data: {
        success: true,
      },
      cookie,
    });
  },
);

const meHandler = http.get(
  `${ API_URL }/auth/me`,
  async ({ cookies }) => {
    const user = requireAuth({
      cookies,
      shouldThrow: false,
    });

    await delay(300);
    if(!user){
      return getNotAuthorizedResponse();
    }
    return getSuccessResponse({
      data: user,
    });
  },
);

export const authHandlers = [
  loginHandler,
  logoutHandler,
  meHandler,
];
