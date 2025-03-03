import useFetch from "./useFetch.ts";
import { authController } from "../controllers/authController.ts";
import mediaController from "../controllers/mediaController.ts";
import { adminController } from "../controllers/adminController.ts";
import { roleController } from "../controllers/roleController.ts";

const useApi = () => {
  const { fetchApi, loading } = useFetch();

  const auth = authController(fetchApi);
  const media = mediaController(fetchApi);
  const admin = adminController(fetchApi);
  const role = roleController(fetchApi);

  return {
    auth,
    media,
    loading,
    admin,
    role,
  };
};

export default useApi;
