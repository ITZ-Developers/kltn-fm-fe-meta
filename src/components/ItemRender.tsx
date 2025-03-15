import { UserIcon } from "lucide-react";
import { getEnumItem, getMediaImage, getNestedValue } from "../services/utils";
import { ALIGNMENT, STATUS_MAP } from "../services/constant";
import { useGlobalContext } from "./GlobalProvider";

const renderImage = ({
  label = "Ảnh",
  accessor = "avatarPath",
  Icon = UserIcon,
  align = ALIGNMENT.LEFT,
  className = "ml-2",
}) => {
  return {
    label,
    accessor,
    align,
    render: (item: any) => (
      <div
        className={`${className} flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-700`}
      >
        {getNestedValue(item, accessor) ? (
          <img
            src={getMediaImage(getNestedValue(item, accessor))}
            className="object-cover"
          />
        ) : (
          <Icon size={20} className={`text-white`} />
        )}
      </div>
    ),
  };
};

const renderEnum = ({
  label = "Trạng thái",
  accessor = "status",
  align = ALIGNMENT.CENTER,
  dataMap = STATUS_MAP,
}: any) => {
  return {
    label,
    accessor,
    align,
    render: (item: any) => {
      const value: any = getEnumItem(dataMap, getNestedValue(item, accessor));
      return (
        <div className={`text-${align}`}>
          <span
            className={`px-2 py-1 rounded-md font-semibold text-sm ${value.className}`}
          >
            {value.label}
          </span>
        </div>
      );
    },
  };
};

const renderHrefLink = ({
  label = "Họ và tên",
  accessor = "fullName",
  align = ALIGNMENT.LEFT,
  onClick,
  role,
}: any) => {
  const { hasRole } = useGlobalContext();

  return {
    label,
    accessor,
    align,
    render: (item: any) => {
      if (!onClick || (role && !hasRole(role))) {
        return (
          <span className={`text-gray-300 p-4 text-${align} whitespace-nowrap`}>
            {getNestedValue(item, accessor)}
          </span>
        );
      }
      return (
        <a
          className={`text-blue-600 hover:underline p-4 text-${align} whitespace-nowrap hover:cursor-pointer`}
          onClick={() => onClick(item)}
        >
          {getNestedValue(item, accessor)}
        </a>
      );
    },
  };
};

export { renderImage, renderEnum, renderHrefLink };
