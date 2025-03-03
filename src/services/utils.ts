import * as CryptoJS from "crypto-js";
import { v4 as uuidv4 } from "uuid";
import { API_URL } from "./constant";

const getCurrentDate = () => {
  const now = new Date();
  const formatter = now
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(/\//g, "/");
  return formatter.replace(",", "");
};

const getCurrentDate_2 = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${day}${month}${year}.${hours}${minutes}${seconds}`;
};

const encrypt = (value: any, secretKey: any) => {
  return CryptoJS.AES.encrypt(value, secretKey).toString();
};

const decrypt = (encryptedValue: any, secretKey: any) => {
  const decrypted = CryptoJS.AES.decrypt(encryptedValue, secretKey);
  return decrypted.toString(CryptoJS.enc.Utf8);
};

const generateUniqueId = () => {
  return uuidv4();
};

const truncateString = (str: any, limit: any) => {
  if (str.length > limit) {
    return str.slice(0, limit) + "...";
  }
  return str;
};

const isValidURL = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

const getMediaImage = (url: string) => {
  return `${API_URL.MEDIA_API}/v1/file/download${url}`;
};

const getRoles = (authorities: string[]) => {
  return authorities.map((role) => role.replace(/^ROLE_/, ""));
};

const getEnumItem = (map: any, value: number) =>
  Object.values(map).find((item: any) => item.value === value) ?? {
    label: "Không xác định",
    className: "bg-gray-700 text-gray-300",
  };

const getNestedValue = (obj: any, path: string, defaultValue = "") => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj) ?? defaultValue;
};

export {
  encrypt,
  decrypt,
  getCurrentDate,
  generateUniqueId,
  truncateString,
  getCurrentDate_2,
  isValidURL,
  getMediaImage,
  getRoles,
  getEnumItem,
  getNestedValue,
};
