import { useState, useRef, useEffect } from "react";
import { UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import { useGlobalContext } from "../GlobalProvider";
import { ConfirmationDialog } from "./Dialog";
import useModal from "../../hooks/useModal";
import { removeSessionCache } from "../../services/storages";
import { getMediaImage } from "../../services/utils";
import { PAGE_CONFIG } from "../PageConfig";

const OptionButton = ({ label, onClick }: any) => {
  return (
    <button
      className="flex w-full items-center px-4 py-2 text-left text-sm text-white hover:bg-gray-600"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const MainHeader = ({ breadcrumbs }: any) => {
  const { profile } = useGlobalContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isModalVisible, showModal, hideModal, formConfig } = useModal();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickButton = (path: string) => {
    setIsDropdownOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    showModal({
      title: "Đăng xuất",
      message: "Bạn có chắc chắn muốn đăng xuất không?",
      confirmText: "Đăng xuất",
      color: "crimson",
      onConfirm: () => {
        hideModal();
        removeSessionCache();
        window.location.href = "/";
      },
      onCancel: () => {
        hideModal();
      },
    });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div>
      <header className="flex items-center">
        <div className="flex items-center justify-between w-full">
          <Breadcrumb items={breadcrumbs} />
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center space-x-2 focus:outline-none"
              onClick={toggleDropdown}
            >
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-700">
                {profile?.avatarPath ? (
                  <img
                    src={getMediaImage(profile.avatarPath)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserIcon size={20} className="text-white" />
                )}
              </div>
              <span className="text-sm text-white">{profile.fullName}</span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-700 py-2 shadow-lg transition-opacity duration-200">
                <OptionButton
                  label="Hồ sơ"
                  onClick={() => handleClickButton(PAGE_CONFIG.PROFILE.path)}
                />
                <OptionButton
                  label="Đổi mật khẩu"
                  onClick={() =>
                    handleClickButton(PAGE_CONFIG.CHANGE_PASSWORD.path)
                  }
                />
                <OptionButton label="Đăng xuất" onClick={handleLogout} />
              </div>
            )}
          </div>
        </div>
      </header>
      <ConfirmationDialog isVisible={isModalVisible} formConfig={formConfig} />
    </div>
  );
};

export default MainHeader;
