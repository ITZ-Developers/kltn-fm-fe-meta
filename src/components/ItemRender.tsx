import { UserIcon } from "lucide-react";
import { getEnumItem, getMediaImage, getNestedValue } from "../services/utils";
import { ALIGNMENT, STATUS_MAP } from "../services/constant";

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
        {item?.[`${accessor}`] ? (
          <img
            src={getMediaImage(item[`${accessor}`])}
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
  map = STATUS_MAP,
}: any) => {
  return {
    label,
    accessor,
    align,
    render: (item: any) => {
      const value: any = getEnumItem(map, item[`${accessor}`]);
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

const renderNestField = ({
  label = "Default",
  accessor = "group.name",
  align = ALIGNMENT.LEFT,
}) => {
  return {
    label,
    accessor,
    align,
    render: (item: any) => {
      return (
        <span className={`p-4 text-${align} whitespace-nowrap`}>
          {getNestedValue(item, accessor)}
        </span>
      );
    },
  };
};

export { renderImage, renderEnum, renderNestField };
