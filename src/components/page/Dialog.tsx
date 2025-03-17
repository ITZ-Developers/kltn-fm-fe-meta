import { BASIC_MESSAGES, BUTTON_TEXT } from "../../services/constant";
import { CancelButton, SubmitButton } from "../form/Button";

const ModalForm = ({ children, isVisible, color, title, message }: any) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h2 className="text-xl font-bold mb-2 text-gray-200" style={{ color }}>
          {title}
        </h2>
        <p className="text-base text-gray-300 mb-6">{message}</p>
        <div className="flex-grow flex items-center justify-center w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

const ConfirmationDialog = ({
  isVisible,
  formConfig = {
    title: "Title",
    message: "Message",
    color: "#22c55e",
    onConfirm: () => {},
    confirmText: "Accept",
    onCancel: () => {},
  },
}: any) => {
  return (
    <ModalForm
      isVisible={isVisible}
      title={formConfig.title}
      message={formConfig.message}
      color={formConfig.color}
    >
      <div className="flex flex-col w-full min-w-[20rem]">
        <div className="flex items-center justify-end">
          <div className="flex flex-row space-x-2">
            <CancelButton
              onClick={formConfig.onCancel}
              text={BUTTON_TEXT.CANCEL}
            />
            <SubmitButton
              onClick={formConfig.onConfirm}
              text={formConfig.confirmText}
              color={formConfig.color}
            />
          </div>
        </div>
      </div>
    </ModalForm>
  );
};

const AlertDialog = ({
  isVisible,
  title = "Information",
  message,
  color = "#22c55e",
  onAccept,
}: any) => {
  return (
    <ModalForm
      isVisible={isVisible}
      title={title}
      message={message}
      color={color}
    >
      <div className="flex">
        <button
          onClick={onAccept}
          className="p-3 rounded-md flex-1 text-gray-200 text-center text-lg font-semibold hover:opacity-90"
          style={{ backgroundColor: color }}
        >
          OK
        </button>
      </div>
    </ModalForm>
  );
};

const LoadingDialog = ({
  isVisible,
  title = "Đang xử lý",
  message = "Vui lòng chờ trong giây lát...",
  color = "#4169e1",
}: any) => {
  return (
    <ModalForm
      isVisible={isVisible}
      color={color}
      title={title}
      message={message}
    >
      <div className="bg-gray-900 rounded-lg items-center">
        <div className="w-10 h-10 border-4 border-t-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      </div>
    </ModalForm>
  );
};

const configResetMfaDialog = ({
  label,
  resetApi,
  refreshData,
  hideModal,
  toast,
}: any) => {
  return {
    title: label,
    message: "Bạn có muốn đặt lại mã xác thực không?",
    color: "mediumseagreen",
    onConfirm: async () => {
      hideModal();
      const res = await resetApi();
      if (res.result) {
        toast.success(BASIC_MESSAGES.RESETED);
        await refreshData();
      } else {
        toast.error(res.message || BASIC_MESSAGES.FAILED);
      }
    },
    confirmText: BUTTON_TEXT.SUBMIT,
    onCancel: hideModal,
  };
};

const configDeleteDialog = ({
  label,
  deleteApi,
  refreshData,
  hideModal,
  toast,
}: any) => {
  return {
    title: label,
    message: "Bạn có chắc chắn muốn xóa?",
    color: "crimson",
    onConfirm: async () => {
      hideModal();
      const res = await deleteApi();
      if (res.result) {
        toast.success(BASIC_MESSAGES.DELETED);
        await refreshData();
      } else {
        toast.error(res.message || BASIC_MESSAGES.FAILED);
      }
    },
    confirmText: BUTTON_TEXT.DELETE,
    onCancel: hideModal,
  };
};

const configModalForm = ({
  label,
  fetchApi,
  refreshData,
  hideModal,
  successMessage,
  toast,
  initForm,
}: any) => {
  return {
    title: label,
    onButtonClick: async (form: any) => {
      const res = await fetchApi(form);
      if (res.result) {
        hideModal();
        toast.success(successMessage);
        await refreshData();
      } else {
        toast.error(res.message || BASIC_MESSAGES.FAILED);
      }
    },
    hideModal,
    initForm,
  };
};

export {
  ConfirmationDialog,
  AlertDialog,
  LoadingDialog,
  configDeleteDialog,
  configModalForm,
  configResetMfaDialog,
};
