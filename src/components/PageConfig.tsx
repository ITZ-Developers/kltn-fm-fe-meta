import { BoltIcon, UserIcon } from "lucide-react";
import Admin from "../pages/admin/Admin";
import Customer from "../pages/customer/Customer";
import Role from "../pages/role/Role";
import CreateAdmin from "../pages/admin/CreateAdmin";
import UpdateAdmin from "../pages/admin/UpdateAdmin";
import UpdateRole from "../pages/role/UpdateRole";
import Profile from "../pages/profile/Profile";
import ChangePassword from "../pages/profile/ChangePassword";
import AccountBranch from "../pages/branch/AccountBranch";
import Branch from "../pages/branch/Branch";

const ADMIN_CONFIG = {
  ADMIN: {
    name: "admin",
    label: "Quản trị viên",
    path: "/admin",
    role: "ACC_L",
    element: <Admin />,
  },
  CREATE_ADMIN: {
    label: "Thêm quản trị viên",
    path: "/admin/create",
    role: "ACC_C_AD",
    element: <CreateAdmin />,
  },
  UPDATE_ADMIN: {
    label: "Cập nhật quản trị viên",
    path: "/admin/update/:id",
    role: "ACC_U_AD",
    element: <UpdateAdmin />,
  },
  DELETE_ADMIN: {
    label: "Xóa quản trị viên",
    role: "ACC_D",
  },
};

const ACCOUNT_BRANCH_CONFIG = {
  ACCOUNT_BRANCH: {
    name: "account_branch",
    label: "Phân chi nhánh",
    path: "/admin/account-branch/:adminId",
    role: "ACC_B_L",
    element: <AccountBranch />,
  },
  CREATE_ACCOUNT_BRANCH: {
    label: "Thêm chi nhánh",
    role: "ACC_B_C",
  },
  DELETE_ACCOUNT_BRANCH: {
    label: "Xóa chi nhánh",
    role: "ACC_B_D",
  },
};

const ROLE_CONFIG = {
  ROLE: {
    name: "role",
    label: "Quyền hạn",
    path: "/role",
    role: "GR_L",
    element: <Role />,
  },
  UPDATE_ROLE: {
    name: "update_role",
    label: "Cập nhật quyền hạn",
    path: "/role/update/:id",
    role: "GR_U",
    element: <UpdateRole />,
  },
};

const PROFILE_CONFIG = {
  PROFILE: {
    name: "profile",
    label: "Hồ sơ",
    path: "/profile",
    element: <Profile />,
  },
  CHANGE_PASSWORD: {
    name: "change_password",
    label: "Đổi mật khẩu",
    path: "/change-password",
    element: <ChangePassword />,
  },
};

const CUSTOMER_CONFIG = {
  CUSTOMER: {
    name: "customer",
    label: "Khách hàng",
    path: "/customer",
    role: "CU_L",
    element: <Customer />,
  },
};

const BRANCH_CONFIG = {
  BRANCH: {
    name: "branch",
    label: "Chi nhánh",
    path: "/branch",
    role: "BR_L",
    element: <Branch />,
  },
  CREATE_BRANCH: {
    label: "Thêm mới chi nhánh",
    role: "BR_C",
  },
  UPDATE_BRANCH: {
    label: "Cập nhật chi nhánh",
    role: "BR_U",
  },
  DELETE_BRANCH: {
    label: "Xóa chi nhánh",
    role: "BR_D",
  },
};

const PAGE_CONFIG = {
  ...ADMIN_CONFIG,
  ...ACCOUNT_BRANCH_CONFIG,
  ...ROLE_CONFIG,
  ...PROFILE_CONFIG,
  ...CUSTOMER_CONFIG,
  ...BRANCH_CONFIG,
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
    items: [PAGE_CONFIG.BRANCH, PAGE_CONFIG.ROLE],
  },
];

export { PAGE_CONFIG, SIDEBAR_MENUS };
