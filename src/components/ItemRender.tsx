import { UserIcon } from "lucide-react";
import { getEnumItem, getMediaImage, getNestedValue } from "../services/utils";
import { ALIGNMENT, STATUS_MAP } from "../services/constant";
import { useGlobalContext } from "./GlobalProvider";

const basicRender = ({ content, align = ALIGNMENT.LEFT }: any) => {
  return (
    <span className={`text-gray-300 p-4 text-${align} whitespace-nowrap`}>
      {content}
    </span>
  );
};

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
            className={`px-2 py-1 rounded-md font-semibold whitespace-nowrap text-sm ${value.className}`}
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
  const { hasRoles } = useGlobalContext();

  return {
    label,
    accessor,
    align,
    render: (item: any) => {
      if (!onClick || (role && !hasRoles(role))) {
        return basicRender({
          content: getNestedValue(item, accessor),
          align,
        });
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

const renderActionButton = ({
  label = "Hành động",
  accessor = "action",
  align = ALIGNMENT.CENTER,
  role,
  renderChildren,
}: any) => {
  const { hasAnyRoles } = useGlobalContext();

  if (role && !hasAnyRoles(role)) {
    return null;
  }

  return {
    label,
    accessor,
    align,
    render: (item: any) => {
      return (
        <span className="flex items-center text-center justify-center space-x-2">
          {renderChildren?.(item)}
        </span>
      );
    },
  };
};

export {
  basicRender,
  renderImage,
  renderEnum,
  renderHrefLink,
  renderActionButton,
};
