import { API_URL, AUTH_TYPE, METHOD } from "../services/constant.ts";

export const adminController = (fetchApi: any) => {
  const list = (payload: any) =>
    fetchApi({
      apiUrl: API_URL.MASTER_API,
      endpoint: "/v1/account/list",
      method: METHOD.GET,
      payload,
      authType: AUTH_TYPE.BEARER,
    });

  const get = (id: any) =>
    fetchApi({
      apiUrl: API_URL.MASTER_API,
      endpoint: `/v1/account/get${id}`,
      method: METHOD.GET,
      authType: AUTH_TYPE.BEARER,
    });

  return {
    list,
    get,
  };
};
