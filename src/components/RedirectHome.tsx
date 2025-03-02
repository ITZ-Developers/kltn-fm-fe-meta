import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE_CONFIG } from "./PageConfig";
import { useGlobalContext } from "./GlobalProvider";

const RedirectHome = () => {
  const { profile } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (profile?.isSuperAdmin) {
      navigate(PAGE_CONFIG.ADMIN.path);
    } else {
      navigate(PAGE_CONFIG.CUSTOMER.path);
    }
  }, [profile]);

  return null;
};

export default RedirectHome;
