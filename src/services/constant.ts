const VALID_PATTERN = {
  NAME: /^[\p{L}][\p{L} ]*[\p{L}]$/u,
  EMAIL: /^(?!.*[.]{2,})[a-zA-Z0-9.%]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /^0[35789][0-9]{8}$/,
  USERNAME: /^(?=.{3,20}$)(?!.*[_.]{2})[a-zA-Z][a-zA-Z0-9_]*[a-zA-Z0-9]$/,
  PASSWORD: /^[a-zA-Z0-9!@#$%^&*()_+\-=]{6,}$/,
  HOST: /^(localhost|(([a-z0-9\-]+\.)*[a-z]{2,})|(\d{1,3}\.){3}\d{1,3}|\[([0-9a-f:]+)\])$/,
  PORT: /^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/,
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
  EMPLOYEE: {
    value: 3,
    label: "Nhân viên",
    className: "bg-red-900 text-red-300",
  },
};

const ITEMS_PER_PAGE = 10;
const TRUNCATE_LENGTH = 150;
const FETCH_INTERVAL = 300;

const FILE_TYPES = {
  AVATAR: "AVATAR",
  DOCUMENT: "DOCUMENT",
};

const BASIC_MESSAGES = {
  INVALID_FORM: "Vui lòng kiểm tra lại thông tin",
  FAILED: "Yêu cầu thất bại",
  CREATED: "Thêm thành công",
  UPDATED: "Cập nhật thành công",
  DELETED: "Xóa thành công",
};

const BUTTON_TEXT = {
  DB_CONFIG: "Cấu hình CSDL",
  LOGIN: "Đăng nhập",
  SEARCH: "Tìm kiếm",
  CREATE: "Thêm mới",
  UPDATE: "Cập nhật",
  DELETE: "Xóa",
  CANCEL: "Hủy",
};

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
  FILE_TYPES,
  BASIC_MESSAGES,
  BUTTON_TEXT,
  FETCH_INTERVAL,
  TRUNCATE_LENGTH,
};
