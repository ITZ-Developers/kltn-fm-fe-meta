import { EraserIcon, PlusIcon, SearchIcon } from "lucide-react";
import { useGlobalContext } from "../GlobalProvider";

const CreateButton = ({ role, onClick }: any) => {
  const { hasRole } = useGlobalContext();
  if (role && !hasRole(role)) {
    return null;
  }
  return (
    <button
      onClick={onClick}
      className="bg-gray-600 hover:bg-gray-700 text-gray-100 p-3 rounded-lg flex items-center transition-colors duration-200"
    >
      <PlusIcon size={20} className="mr-1" />
      Thêm mới
    </button>
  );
};

const ToolBar = ({ searchBoxes, onSearch, onClear, actionButtons }: any) => (
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center space-x-2">
      {searchBoxes}
      {onSearch && (
        <button
          onClick={onSearch}
          className="bg-blue-800 hover:bg-blue-900 text-gray-100 p-3 rounded-lg flex items-center mr-2 whitespace-nowrap transition-colors duration-200"
        >
          <SearchIcon size={20} />
          <span className="ml-1">Tìm kiếm</span>
        </button>
      )}
      {onClear && (
        <button
          onClick={onClear}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-3 rounded-lg flex items-center transition-colors duration-200"
        >
          <EraserIcon size={20} />
          <span className="ml-1">Xóa</span>
        </button>
      )}
    </div>
    {actionButtons}
  </div>
);

export { CreateButton, ToolBar };
