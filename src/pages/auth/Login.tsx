import useForm from "../../hooks/useForm";
import { toast } from "react-toastify";
import { InputField } from "../../components/form/InputField";
import {
  Button,
  CancelButton,
  SubmitButton,
} from "../../components/form/Button";
import { LoadingDialog } from "../../components/page/Dialog";
import {
  BASIC_MESSAGES,
  BUTTON_TEXT,
  GRANT_TYPE,
  LOCAL_STORAGE,
} from "../../services/constant";
import { setStorageData } from "../../services/storages";
import MyToastContainer from "../../components/page/MyToastContainer";
import useApi from "../../hooks/useApi";
import { useState } from "react";
import {
  ActionSection,
  BasicCardForm,
  HrefLink,
  ImageBase64,
} from "../../components/form/FormCard";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { auth, loading } = useApi();
  const [isMfa, setIsMfa] = useState(false);
  const [qrUrl, setQrUrl] = useState<any>(null);

  const validate = (form: any) => {
    const newErrors: any = {};
    if (!isMfa) {
      if (!form.username.trim()) {
        newErrors.username = "Tài khoản không được bỏ trống";
      }
      if (!form.password) {
        newErrors.password = "Mật khẩu không được bỏ trống";
      }
    } else {
      if (!form.totp) {
        newErrors.totp = "Mã OTP không được bỏ trống";
      }
    }
    return newErrors;
  };

  const { form, errors, resetForm, handleChange, isValidForm } = useForm(
    { username: "", password: "", totp: "" },
    validate
  );

  const handleCallLogin = async () => {
    const res = await auth.login({
      username: form.username,
      password: form.password,
      grant_type: GRANT_TYPE.PASSWORD,
    });
    if (res?.access_token) {
      toast.success(BASIC_MESSAGES.LOGGED_IN);
      setStorageData(LOCAL_STORAGE.ACCESS_TOKEN, res?.access_token);
      window.location.href = "/";
    } else {
      toast.error(BASIC_MESSAGES.LOG_IN_FAILED);
    }
  };

  const handleSubmitLogin = async () => {
    if (isValidForm()) {
      const verify = await auth.verifyCreditial({
        username: form.username,
        password: form.password,
      });
      if (!verify?.result) {
        toast.error(BASIC_MESSAGES.LOG_IN_FAILED);
        return;
      }
      const data = verify.data;
      if (!data.isMfaEnable) {
        await handleCallLogin();
      } else {
        setIsMfa(true);
        if (data.qrUrl) {
          setQrUrl(data.qrUrl);
        }
      }
    } else {
      toast.error(BASIC_MESSAGES.INVALID_FORM);
    }
  };

  const handleSubmitTOTP = async () => {
    if (isValidForm()) {
      const res = await auth.login({
        username: form.username,
        password: form.password,
        totp: form.totp,
        grant_type: GRANT_TYPE.PASSWORD,
      });
      if (res?.access_token) {
        toast.success(BASIC_MESSAGES.LOGGED_IN);
        setStorageData(LOCAL_STORAGE.ACCESS_TOKEN, res?.access_token);
        window.location.href = "/";
      } else {
        toast.error(BASIC_MESSAGES.VERIFY_FAILED);
      }
    } else {
      toast.error(BASIC_MESSAGES.INVALID_FORM);
    }
  };

  const handleCancelSubmitOTP = () => {
    setIsMfa(false);
    setQrUrl(null);
    resetForm();
  };

  return (
    <>
      <LoadingDialog isVisible={loading} />
      <MyToastContainer />
      {!isMfa ? (
        <BasicCardForm title={BUTTON_TEXT.LOGIN}>
          <div className="space-y-4">
            <InputField
              title="Tên đăng nhập"
              isRequired
              placeholder="Nhập tên đăng nhập"
              value={form.username}
              onChangeText={(value: any) => handleChange("username", value)}
              error={errors.username}
            />
            <InputField
              title="Mật khẩu"
              isRequired
              placeholder="Nhập mật khẩu"
              value={form.password}
              onChangeText={(value: any) => handleChange("password", value)}
              error={errors.password}
              type="password"
            />
            <HrefLink
              label={"Quên mật khẩu?"}
              onClick={() => navigate("/forgot-password")}
            />
            <Button
              title={BUTTON_TEXT.LOGIN}
              color="royalblue"
              onPress={handleSubmitLogin}
            />
          </div>
        </BasicCardForm>
      ) : (
        <BasicCardForm title={BUTTON_TEXT.TWO_FACTOR}>
          <div className="space-y-4">
            {qrUrl && <ImageBase64 imgString={qrUrl} />}
            <InputField
              title="Mã OTP"
              isRequired
              placeholder="Nhập mã OTP"
              value={form.totp}
              onChangeText={(value: any) => handleChange("totp", value)}
              error={errors.totp}
            />
            <ActionSection
              children={
                <>
                  <CancelButton onClick={handleCancelSubmitOTP} />
                  <SubmitButton
                    text={BUTTON_TEXT.SUBMIT}
                    color="royalblue"
                    onClick={handleSubmitTOTP}
                  />
                </>
              }
            />
          </div>
        </BasicCardForm>
      )}
    </>
  );
};

export default Login;
