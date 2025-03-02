import useFetch from "./useFetch.ts";
import { authController } from "../controllers/authController.ts";
import mediaController from "../controllers/mediaController.ts";
import { adminController } from "../controllers/adminController.ts";

const useApi = () => {
  const { fetchApi, loading } = useFetch();

  const auth = authController(fetchApi);
  const media = mediaController(fetchApi);
  const admin = adminController(fetchApi);

  return {
    auth,
    media,
    loading,
    admin,
  };
};

export default useApi;
