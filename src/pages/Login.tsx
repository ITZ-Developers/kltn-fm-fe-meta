import { useState } from "react";
import useForm from "../hooks/useForm";
import { toast } from "react-toastify";
import { InputField } from "../components/form/InputField";
import { Button } from "../components/form/Button";
import { LoadingDialog } from "../components/page/Dialog";
import {
  BASIC_MESSAGES,
  BUTTON_TEXT,
  GRANT_TYPE,
  LOCAL_STORAGE,
} from "../services/constant";
import { setStorageData } from "../services/storages";
import MyToastContainer from "../components/page/MyToastContainer";
import useApi from "../hooks/useApi";

const Login = () => {
  const { auth, loading } = useApi();
  const [showPassword, setShowPassword] = useState(false);

  const validate = (form: any) => {
    const newErrors: any = {};
    if (!form.username.trim()) {
      newErrors.username = "Tài khoản không được bỏ trống";
    }
    if (!form.password) {
      newErrors.password = "Mật khẩu không được bỏ trống";
    }
    return newErrors;
  };

  const { form, errors, handleChange, isValidForm } = useForm(
    { username: "", password: "", grant_type: GRANT_TYPE.PASSWORD },
    validate
  );

  const handleSubmit = async () => {
    if (isValidForm()) {
      const res = await auth.login(form);
      if (res?.access_token) {
        toast.success("Đăng nhập thành công");
        setStorageData(LOCAL_STORAGE.ACCESS_TOKEN, res?.access_token);
        window.location.href = "/";
      } else {
        toast.error("Đăng nhập thất bại");
      }
    } else {
      toast.error(BASIC_MESSAGES.INVALID_FORM);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-4 text-blue-500">
          Đăng nhập
        </h2>
        <div className="space-y-3">
          <InputField
            title="Tên đăng nhập"
            isRequired={true}
            placeholder="Nhập tên đăng nhập"
            onChangeText={(value: any) => handleChange("username", value)}
            value={form.username}
            error={errors.username}
          />
          <InputField
            title="Mật khẩu"
            isRequired={true}
            placeholder="Nhập mật khẩu"
            onChangeText={(value: any) => handleChange("password", value)}
            value={form.password}
            secureTextEntry={!showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
            showPassword={showPassword}
            error={errors.password}
            type="password"
          />
          <Button
            title={BUTTON_TEXT.LOGIN}
            color="royalblue"
            onPress={handleSubmit}
          />
        </div>
      </div>
      <LoadingDialog isVisible={loading} />
      <MyToastContainer />
    </div>
  );
};

export default Login;
