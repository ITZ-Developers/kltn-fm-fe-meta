import {
  createContext,
  SetStateAction,
  useContext,
  Dispatch,
  useState,
  useEffect,
} from "react";
import banner from "../assets/cms.png";
import { LOCAL_STORAGE } from "../services/constant";
import { getStorageData, setStorageData } from "../services/storages";
import { PAGE_CONFIG, SIDEBAR_MENUS } from "./PageConfig";
import { jwtDecode } from "jwt-decode";
import { getRoles } from "../services/utils";

const GlobalContext = createContext<{
  authorities: any;
  imgSrc: any;
  setImgSrc: Dispatch<SetStateAction<any>>;
  collapsedGroups: { [key: string]: boolean };
  setCollapsedGroups: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
  profile: any;
  setProfile: Dispatch<SetStateAction<any>>;
  getRouters: () => any[];
  getSidebarMenus: () => any[];
  hasRole: (role: string) => boolean;
}>({
  authorities: [],
  imgSrc: null,
  setImgSrc: () => {},
  collapsedGroups: {},
  setCollapsedGroups: () => {},
  profile: null,
  setProfile: () => {},
  getRouters: () => [],
  getSidebarMenus: () => [],
  hasRole: () => false,
});

export const GlobalProvider = ({ children }: any) => {
  const [authorities, setAuthorities] = useState<any>([]);
  const [imgSrc, setImgSrc] = useState<any>(banner);
  const [collapsedGroups, setCollapsedGroups] = useState(
    getStorageData(LOCAL_STORAGE.COLLAPSED_GROUPS, {})
  );
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    setStorageData(LOCAL_STORAGE.COLLAPSED_GROUPS, collapsedGroups);
  }, [collapsedGroups]);

  useEffect(() => {
    if (profile) {
      const data: any = jwtDecode(getStorageData(LOCAL_STORAGE.ACCESS_TOKEN));
      setAuthorities(getRoles(data?.authorities));
    }
  }, [profile]);

  const getRouters = () => {
    return Object.values(PAGE_CONFIG).filter((route) =>
      authorities.some((auth: string) => auth === route.role)
    );
  };

  const getSidebarMenus = () => {
    const allowedRoutes = new Set(getRouters().map((route) => route.name));
    return SIDEBAR_MENUS.map((group) => ({
      ...group,
      items: group.items.filter((item) => allowedRoutes.has(item.name)),
    })).filter((group) => group.items.length > 0);
  };

  const hasRole = (role: any) => {
    return authorities.some((auth: any) => auth === role);
  };

  return (
    <GlobalContext.Provider
      value={{
        authorities,
        imgSrc,
        setImgSrc,
        collapsedGroups,
        setCollapsedGroups,
        profile,
        setProfile,
        getRouters,
        getSidebarMenus,
        hasRole,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
