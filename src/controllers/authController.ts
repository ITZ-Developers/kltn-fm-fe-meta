import { API_URL, AUTH_TYPE, METHOD } from "../services/constant.ts";

export const authController = (fetchApi: any) => {
  const login = (payload: {
    username: string;
    password: string;
    grant_type: string;
  }) =>
    fetchApi({
      apiUrl: API_URL.MASTER_API,
      endpoint: "/api/token",
      method: METHOD.POST,
      payload,
      authType: AUTH_TYPE.BASIC,
    });

  const profile = () =>
    fetchApi({
      apiUrl: API_URL.MASTER_API,
      endpoint: "/v1/account/profile",
      method: METHOD.GET,
      authType: AUTH_TYPE.BEARER,
    });

  return {
    login,
    profile,
  };
};
