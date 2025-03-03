const VALID_PATTERN = {
  EMAIL: /^(?!.*[.]{2,})[a-zA-Z0-9.%]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /^0[35789][0-9]{8}$/,
};

const API_URL = {
  MASTER_API: "https://finance-master-jmdi.onrender.com",
  TENANT_API: "https://finance-tenant.onrender.com",
  MEDIA_API: "https://finance-media.onrender.com",
};

const AUTH_TYPE = {
  NONE: "none",
  BEARER: "bearer",
  BASIC: "basic",
};

const GRANT_TYPE = {
  PASSWORD: "password",
  CUSTOMER: "customer",
  EMPLOYEE: "employee",
};

const ENV = {
  CLIENT_ID: import.meta.env.VITE_CLIENT_ID,
  CLIENT_SECRET: import.meta.env.VITE_CLIENT_SECRET,
  STORAGE_KEY: import.meta.env.VITE_STORAGE_KEY,
};

const LOCAL_STORAGE = {
  ACCESS_TOKEN: "meta_access_token",
  COLLAPSED_GROUPS: "meta_collapsed_groups",
};

const METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const ALIGNMENT = {
  LEFT: "left",
  RIGHT: "right",
  CENTER: "center",
};

const STATUS_MAP = {
  ACTIVE: {
    value: 1,
    label: "Hoạt động",
    className: "bg-green-900 text-green-300",
  },
  PENDING: {
    value: 0,
    label: "Chờ",
    className: "bg-yellow-900 text-yellow-300",
  },
  LOCKED: { value: -1, label: "Khóa", className: "bg-gray-900 text-gray-300" },
  DELETED: { value: -2, label: "Xóa", className: "bg-red-900 text-red-300" },
};

const GROUP_KIND_MAP = {
  ADMIN: {
    value: 1,
    label: "Quản trị viên",
    className: "bg-blue-900 text-blue-300",
  },
  CUSTOMER: {
    value: 2,
    label: "Khách hàng",
    className: "bg-yellow-900 text-yellow-300",
  },
};

const ITEMS_PER_PAGE = 10;

export {
  VALID_PATTERN,
  ALIGNMENT,
  API_URL,
  ENV,
  AUTH_TYPE,
  LOCAL_STORAGE,
  METHOD,
  GRANT_TYPE,
  STATUS_MAP,
  ITEMS_PER_PAGE,
  GROUP_KIND_MAP,
};
