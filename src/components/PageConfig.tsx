import { BoltIcon, UserIcon } from "lucide-react";
import Admin from "../pages/admin/Admin";
import Customer from "../pages/customer/Customer";
import Role from "../pages/role/Role";
import CreateAdmin from "../pages/admin/CreateAdmin";

const PAGE_CONFIG = {
  ADMIN: {
    name: "admin",
    label: "Quản trị viên",
    path: "/admin",
    role: "ACC_L",
    element: <Admin />,
  },
  CREATE_ADMIN: {
    name: "create_admin",
    label: "Thêm quản trị viên",
    path: "/admin/create",
    role: "ACC_C_AD",
    element: <CreateAdmin />,
  },
  CUSTOMER: {
    name: "customer",
    label: "Khách hàng",
    path: "/customer",
    role: "CU_L",
    element: <Customer />,
  },
  ROLE: {
    name: "role",
    label: "Quyền hạn",
    path: "/role",
    role: "GR_L",
    element: <Role />,
  },
};

const SIDEBAR_MENUS = [
  {
    name: "Tài khoản",
    icon: <UserIcon size={20} />,
    items: [PAGE_CONFIG.ADMIN, PAGE_CONFIG.CUSTOMER],
  },
  {
    name: "Hệ thống",
    icon: <BoltIcon size={20} />,
    items: [PAGE_CONFIG.ROLE],
  },
];

export { PAGE_CONFIG, SIDEBAR_MENUS };
