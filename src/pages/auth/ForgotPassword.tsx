import useForm from "../../hooks/useForm";
import { toast } from "react-toastify";
import { InputField } from "../../components/form/InputField";
import { CancelButton, SubmitButton } from "../../components/form/Button";
import { LoadingDialog } from "../../components/page/Dialog";
import {
  BASIC_MESSAGES,
  BUTTON_TEXT,
  VALID_PATTERN,
} from "../../services/constant";
import MyToastContainer from "../../components/page/MyToastContainer";
import useApi from "../../hooks/useApi";
import { ActionSection, BasicCardForm } from "../../components/form/FormCard";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { auth, loading } = useApi();

  const validate = (form: any) => {
    const newErrors: any = {};
    if (!VALID_PATTERN.EMAIL.test(form.email)) {
      newErrors.email = "Địa chỉ email không hợp lệ";
    }
    return newErrors;
  };

  const { form, errors, handleChange, isValidForm } = useForm(
    { email: "" },
    validate
  );

  const handleSubmit = async () => {
    if (isValidForm()) {
      const res = await auth.requestForgetPassword(form.email);
      if (res.result) {
        toast.success(BASIC_MESSAGES.SUCCESS);
        navigate("/reset-password", { state: { userId: res.data.userId } });
      } else {
        toast.error(res.message || BASIC_MESSAGES.FAILED);
      }
    } else {
      toast.error(BASIC_MESSAGES.INVALID_FORM);
    }
  };

  return (
    <>
      <LoadingDialog isVisible={loading} />
      <MyToastContainer />
      <BasicCardForm title="Quên mật khẩu">
        <div className="space-y-4">
          <InputField
            title="Địa chỉ email"
            isRequired={true}
            placeholder="Nhập địa chỉ email"
            value={form.email}
            onChangeText={(value: any) => handleChange("email", value)}
            error={errors.email}
          />
          <ActionSection
            children={
              <>
                <CancelButton onClick={() => navigate("/")} />
                <SubmitButton
                  text={BUTTON_TEXT.CONTINUE}
                  onClick={handleSubmit}
                />
              </>
            }
          />
        </div>
      </BasicCardForm>
    </>
  );
};

export default ForgotPassword;
