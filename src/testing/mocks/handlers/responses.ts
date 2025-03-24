import { HttpResponse } from "msw";
import { IS_SERVER } from "@/config/constants";

const headers = IS_SERVER ? undefined : {
  "Access-Control-Allow-Origin": window.location.origin,
};

export const getInvalidParameterResponse = () => HttpResponse.json({
  message: "Invalid parameter",
}, {
  status: 400,
  headers,
});

export const getNotAuthorizedResponse = () => HttpResponse.json({
  message: "Not authorized",
}, {
  status: 403,
  headers,
});

export const getNotFoundResponse = () => HttpResponse.json({
  message: "Not found",
}, {
  status: 404,
  headers,
});

export const getSuccessResponse = ({
  data = null,
  cookie,
}: {
  data?: object | null,
  cookie?: string,
}) => {
  if(cookie){
    return HttpResponse.json(data, {
      status: 200,
      headers: {
        ...headers,
        "Set-Cookie": cookie,
      },
    });
  }
  return HttpResponse.json(data, {
    status: 200,
    headers,
  });
}