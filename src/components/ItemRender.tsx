import { UserIcon } from "lucide-react";
import { getEnumItem, getMediaImage } from "../services/utils";
import { STATUS_MAP } from "../services/constant";

const renderImage = ({
  label = "Ảnh",
  accessor = "avatarPath",
  align = "left",
  Icon = UserIcon,
}) => {
  return {
    label,
    accessor,
    align,
    render: (item: any) => (
      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-700">
        {item?.[`${accessor}`] ? (
          <img
            src={getMediaImage(item[`${accessor}`])}
            className="h-full w-full object-cover"
          />
        ) : (
          <Icon size={20} className="text-white" />
        )}
      </div>
    ),
  };
};

const renderEnum = ({
  label = "Trạng thái",
  accessor = "status",
  align = "center",
  map = STATUS_MAP,
}) => {
  return {
    label,
    accessor,
    align,
    render: (item: any) => {
      const value: any = getEnumItem(map, item.status);
      return (
        <span className={`px-2 py-1 rounded-md font-semibold text-sm ${value.className}`}>
          {value.label}
        </span>
      );
    },
  };
};

export { renderImage, renderEnum };
