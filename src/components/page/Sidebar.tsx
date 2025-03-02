import { ChevronDownIcon, ChevronUpIcon, UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../GlobalProvider";
import { useEffect } from "react";
import { LOCAL_STORAGE } from "../../services/constant";
import { getStorageData } from "../../services/storages";
import MainHeader from "./MainHeader";

const Sidebar = ({ activeItem, breadcrumbs, renderContent }: any) => {
  const { imgSrc, collapsedGroups, setCollapsedGroups, getSidebarMenus } =
    useGlobalContext();
  const navigate = useNavigate();
  const menuGroups = getSidebarMenus();

  const handleMenuItemClick = (itemName: string) => {
    const selectedItem = menuGroups
      .flatMap((group) => group.items)
      .find((item) => item.name === itemName);
    if (selectedItem) {
      navigate(selectedItem.path);
    }
  };

  useEffect(() => {
    setCollapsedGroups(getStorageData(LOCAL_STORAGE.COLLAPSED_GROUPS, {}));
  }, []);

  const toggleGroupCollapse = (groupName: string) => {
    setCollapsedGroups((prev) => {
      const updatedGroups = { ...prev, [groupName]: !prev[groupName] };
      getStorageData(LOCAL_STORAGE.COLLAPSED_GROUPS, updatedGroups);
      return updatedGroups;
    });
  };

  return (
    <div className="flex min-h-screen">
      <div
        className={`
          translate-x-full
          w-[20rem]
          fixed left-0 top-0
          transition-all duration-300 ease-in-out
          h-screen
          z-40
          md:translate-x-0
          overflow-hidden
        `}
      >
        <div className="h-full flex flex-col bg-gray-900 text-white overflow-y-auto">
          <div className="flex flex-col items-center m-2">
            <img
              src={imgSrc}
              className={`w-[20rem] rounded-lg transition-all duration-300`}
            />
          </div>
          <nav className="flex-grow overflow-y-auto">
            {menuGroups.map((group) => (
              <div key={group.name} className="mb-2">
                <div
                  className="flex justify-between items-center p-3 mx-2 mb-2 bg-gray-800 cursor-pointer rounded-lg"
                  onClick={() => toggleGroupCollapse(group.name)}
                >
                  {group.icon}
                  <span className="ml-2">{group.name}</span>
                  {collapsedGroups[group.name] ? (
                    <ChevronDownIcon size={20} />
                  ) : (
                    <ChevronUpIcon size={20} />
                  )}
                </div>
                <ul>
                  {!collapsedGroups[group.name]
                    ? group.items.map((item: any) => (
                        <li key={item.name} className="mb-2">
                          <div
                            className={`flex items-center p-3 mx-2 rounded-lg cursor-pointer transition-colors
                            ${
                              activeItem === item.name
                                ? "bg-blue-500"
                                : "hover:bg-blue-700"
                            }
                          `}
                            onClick={() => handleMenuItemClick(item.name)}
                          >
                            <span className="ml-2">{item.label}</span>
                          </div>
                        </li>
                      ))
                    : null}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>
      <div className={`flex-1 transition-all duration-300 ml-[20rem]`}>
        <div className="min-h-screen flex flex-col bg-gray-900">
          <div className="p-4">
            <MainHeader breadcrumbs={breadcrumbs} />
          </div>
          <div className="p-4 bg-gray-800 flex-1 overflow-auto">
            {renderContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
