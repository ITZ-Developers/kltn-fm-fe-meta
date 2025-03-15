import { InputField } from "../../components/form/InputField";
import Sidebar from "../../components/page/Sidebar";
import { PAGE_CONFIG } from "../../components/PageConfig";
import useForm from "../../hooks/useForm";
import { CancelButton, SubmitButton } from "../../components/form/Button";
import { ActionSection, FormCard } from "../../components/form/FormCard";
import useApi from "../../hooks/useApi";
import {
  BASIC_MESSAGES,
  BUTTON_TEXT,
  STATUS_MAP,
  VALID_PATTERN,
} from "../../services/constant";
import { toast } from "react-toastify";
import MyToastContainer from "../../components/page/MyToastContainer";
import { LoadingDialog } from "../../components/page/Dialog";
import useQueryState from "../../hooks/useQueryState";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  DatePickerField,
  ImageUploadField,
} from "../../components/form/OtherField";
import { StaticSelectField } from "../../components/form/SelectField";

const CreateLocation = () => {
  const { customerId } = useParams();
  const { handleNavigateBack } = useQueryState({
    path: `/customer/location/${customerId}`,
  });
  const { location, customer } = useApi();
  const validate = (form: any) => {
    const newErrors: any = {};
    if (!VALID_PATTERN.NAME.test(form.name)) {
      newErrors.name = "Tên khu vực không hợp lệ";
    }
    if (!VALID_PATTERN.USERNAME.test(form.tenantId)) {
      newErrors.tenantId = "Mã thuê bao không hợp lệ";
    }
    if (form.hotline && !VALID_PATTERN.PHONE.test(form.hotline)) {
      newErrors.hotline = "Đường dây nóng không hợp lệ";
    }
    if (!form.status) {
      newErrors.status = "Trạng thái không hợp lệ";
    }
    return newErrors;
  };

  useEffect(() => {
    if (!customerId) {
      handleNavigateBack();
      return;
    }
    const fetchData = async () => {
      const res = await customer.get(customerId);
      if (!res.result) {
        handleNavigateBack();
      }
    };
    fetchData();
  }, [customerId]);

  const { form, errors, handleChange, isValidForm } = useForm(
    {
      logoPath: "",
      name: "",
      tenantId: "",
      hotline: "",
      status: "",
      startDate: "",
      expiredDate: "",
    },
    validate
  );

  const handleSubmit = async () => {
    if (isValidForm()) {
      const res = await location.create(form);
      if (res.result) {
        handleNavigateBack();
      } else {
        toast.error(res.message || BASIC_MESSAGES.FAILED);
      }
    } else {
      toast.error(BASIC_MESSAGES.INVALID_FORM);
    }
  };

  return (
    <Sidebar
      breadcrumbs={[
        {
          label: PAGE_CONFIG.LOCATION.label,
          onClick: handleNavigateBack,
        },
        {
          label: PAGE_CONFIG.CREATE_LOCATION.label,
        },
      ]}
      activeItem={PAGE_CONFIG.CUSTOMER.name}
      renderContent={
        <>
          <FormCard
            title={PAGE_CONFIG.CREATE_LOCATION.label}
            children={
              <div className="flex flex-col space-y-4">
                <ImageUploadField
                  title="Biểu trưng"
                  value={form.logoPath}
                  onChange={(value: any) => handleChange("logoPath", value)}
                />
                <div className="flex flex-row space-x-2">
                  <InputField
                    title="Tên khu vực"
                    isRequired={true}
                    placeholder="Nhập tên khu vực"
                    value={form.name}
                    onChangeText={(value: any) => handleChange("name", value)}
                    error={errors.name}
                  />
                  <InputField
                    title="Mã thuê bao"
                    isRequired={true}
                    placeholder="Nhập mã thuê bao"
                    value={form.tenantId}
                    onChangeText={(value: any) =>
                      handleChange("tenantId", value)
                    }
                    error={errors.tenantId}
                  />
                </div>
                <div className="flex flex-row space-x-2">
                  <InputField
                    title="Đường dây nóng"
                    placeholder="Nhập đường dây nóng"
                    value={form.hotline}
                    onChangeText={(value: any) =>
                      handleChange("hotline", value)
                    }
                    error={errors.hotline}
                  />
                  <StaticSelectField
                    title="Trạng thái"
                    isRequired={true}
                    placeholder="Chọn trạng thái"
                    dataMap={STATUS_MAP}
                    value={form.status}
                    onChange={(value: any) => handleChange("status", value)}
                    error={errors.status}
                  />
                </div>
                <div className="flex flex-row space-x-2">
                  <DatePickerField
                    title="Ngày bắt đầu"
                    isRequired={true}
                    placeholder="Chọn ngày bắt đầu"
                    value={form.startDate}
                    onChange={(value: any) => handleChange("startDate", value)}
                    error={errors.startDate}
                  />
                  <DatePickerField
                    title="Ngày kết thúc"
                    isRequired={true}
                    placeholder="Chọn ngày kết thúc"
                    value={form.expiredDate}
                    onChange={(value: any) =>
                      handleChange("expiredDate", value)
                    }
                    error={errors.expiredDate}
                  />
                </div>
                <ActionSection
                  children={
                    <>
                      <CancelButton onClick={handleNavigateBack} />
                      <SubmitButton
                        text={BUTTON_TEXT.CREATE}
                        color="royalblue"
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

export default CreateLocation;
