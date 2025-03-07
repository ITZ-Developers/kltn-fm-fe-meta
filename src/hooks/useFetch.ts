import { useState, useCallback } from "react";
import { AUTH_TYPE, ENV, LOCAL_STORAGE, METHOD } from "../services/constant";
import { getStorageData } from "../services/storages";

interface FetchOptions {
  apiUrl: string;
  endpoint: string;
  method: string;
  payload?: any;
  authType: string;
  headers?: Record<string, string>;
}

const useFetch = () => {
  const [loading, setLoading] = useState(false);

  const handleFetch = useCallback(async (options: FetchOptions) => {
    setLoading(true);

    try {
      let url = `${options.apiUrl}${options.endpoint}`;
      const headers: Record<string, string> = {
        ...options.headers,
      };

      switch (options.authType) {
        case AUTH_TYPE.BEARER:
          const token = getStorageData(LOCAL_STORAGE.ACCESS_TOKEN);
          if (token) {
            headers["Authorization"] = `Bearer ${token}`;
          }
          break;
        case AUTH_TYPE.BASIC:
          const encodedCredentials = btoa(
            `${ENV.CLIENT_ID}:${ENV.CLIENT_SECRET}`
          );
          headers["Authorization"] = `Basic ${encodedCredentials}`;
          break;
        case AUTH_TYPE.NONE:
        default:
          break;
      }

      if (!(options.payload instanceof FormData)) {
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(url, {
        method: options.method,
        headers,
        body:
          options.method !== "GET" && options.payload
            ? options.payload instanceof FormData
              ? options.payload
              : JSON.stringify(options.payload)
            : undefined,
      });

      const contentType = response.headers.get("content-type");
      const data = contentType?.includes("application/json")
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        return response;
      }

      return data;
    } catch (err) {
      return err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchApi = (options: FetchOptions) => {
    if (options.method === METHOD.GET && options.payload) {
      const filteredPayload = Object.fromEntries(
        Object.entries(options.payload).filter(
          ([_, value]: any) =>
            (value !== null && value !== undefined) ||
            (typeof value === "string" && value.trim() !== "")
        )
      );
      const queryString = new URLSearchParams(
        filteredPayload as any
      ).toString();
      if (queryString) {
        options.endpoint += `?${queryString}`;
      }
    }

    return handleFetch(options);
  };

  return {
    fetchApi,
    loading,
  };
};

export default useFetch;
