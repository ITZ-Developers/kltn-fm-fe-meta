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

  const updateProfile = (payload: any) =>
    fetchApi({
      apiUrl: API_URL.MASTER_API,
      endpoint: "/v1/account/update-profile-admin",
      method: METHOD.PUT,
      payload,
      authType: AUTH_TYPE.BEARER,
    });

  const changePassword = (payload: any) =>
    fetchApi({
      apiUrl: API_URL.MASTER_API,
      endpoint: "/v1/account/change-profile-password",
      method: METHOD.PUT,
      payload,
      authType: AUTH_TYPE.BEARER,
    });

  return {
    login,
    profile,
    updateProfile,
    changePassword,
  };
};
