import { useEffect } from "react";
import useApi from "../../hooks/useApi";
import useForm from "../../hooks/useForm";
import {
  BASIC_MESSAGES,
  BUTTON_TEXT,
  VALID_PATTERN,
} from "../../services/constant";
import { toast } from "react-toastify";
import Sidebar from "../../components/page/Sidebar";
import { PAGE_CONFIG } from "../../components/PageConfig";
import { ActionSection, FormCard } from "../../components/form/FormCard";
import { InputField } from "../../components/form/InputField";
import { SubmitButton } from "../../components/form/Button";
import MyToastContainer from "../../components/page/MyToastContainer";
import { LoadingDialog } from "../../components/page/Dialog";

const ChangePassword = () => {
  const { auth, loading } = useApi();

  const validate = (form: any) => {
    const newErrors: any = {};
    if (!VALID_PATTERN.PASSWORD.test(form.oldPassword)) {
      newErrors.oldPassword = "Mật khẩu không hợp lệ";
    }
    if (!VALID_PATTERN.PASSWORD.test(form.newPassword)) {
      newErrors.newPassword = "Mật khẩu không hợp lệ";
    }
    if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không trùng khớp";
    }
    return newErrors;
  };

  const { form, errors, resetForm, handleChange, isValidForm } = useForm(
    { oldPassword: "", newPassword: "", confirmPassword: "" },
    validate
  );

  useEffect(() => {
    resetForm();
  }, []);

  const handleSubmit = async () => {
    if (!isValidForm()) {
      toast.error(BASIC_MESSAGES.INVALID_FORM);
      return;
    }
    const res = await auth.changePassword(form);
    if (!res.result) {
      toast.error(res.message);
      return;
    }
    resetForm();
    toast.success(BASIC_MESSAGES.UPDATED);
  };

  return (
    <Sidebar
      breadcrumbs={[
        {
          label: PAGE_CONFIG.CHANGE_PASSWORD.label,
        },
      ]}
      renderContent={
        <>
          <LoadingDialog isVisible={loading} />
          <FormCard
            title={PAGE_CONFIG.CHANGE_PASSWORD.label}
            children={
              <div className="flex flex-col space-y-4">
                <div className="flex flex-row space-x-2">
                  <InputField
                    isRequired={true}
                    title="Mật khẩu hiện tại"
                    placeholder="Nhập mật khẩu hiện tại"
                    value={form.oldPassword}
                    onChangeText={(value: any) =>
                      handleChange("oldPassword", value)
                    }
                    type="password"
                    error={errors.oldPassword}
                  />
                  <span className="flex-1" />
                </div>
                <div className="flex flex-row space-x-2">
                  <InputField
                    isRequired={true}
                    title="Mật khẩu mới"
                    placeholder="Nhập mật khẩu mới"
                    value={form.newPassword}
                    onChangeText={(value: any) =>
                      handleChange("newPassword", value)
                    }
                    type="password"
                    error={errors.newPassword}
                  />
                  <InputField
                    isRequired={true}
                    title="Mật khẩu xác nhận"
                    placeholder="Nhập mật khẩu xác nhận"
                    value={form.confirmPassword}
                    onChangeText={(value: any) =>
                      handleChange("confirmPassword", value)
                    }
                    type="password"
                    error={errors.confirmPassword}
                  />
                </div>
                <ActionSection
                  children={
                    <>
                      <SubmitButton
                        text={BUTTON_TEXT.UPDATE}
                        onClick={handleSubmit}
                      />
                    </>
                  }
                />
                <MyToastContainer />
              </div>
            }
          />
        </>
      }
    />
  );
};

export default ChangePassword;
