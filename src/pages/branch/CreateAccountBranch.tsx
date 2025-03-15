import { toast } from "react-toastify";
import { ActionSection, ModalForm } from "../../components/form/FormCard";
import useForm from "../../hooks/useForm";
import { useEffect } from "react";
import { CancelButton, SubmitButton } from "../../components/form/Button";
import { BASIC_MESSAGES, BUTTON_TEXT } from "../../services/constant";
import { SelectField } from "../../components/form/SelectField";
import useApi from "../../hooks/useApi";

const CreateAccountBranch = ({ isVisible, formConfig }: any) => {
  const { branch } = useApi();
  const validate = (form: any) => {
    const newErrors: any = {};
    if (!form.branchId) {
      newErrors.branchId = "Chi nhánh không hợp lệ";
    }
    return newErrors;
  };

  const { form, errors, resetForm, handleChange, isValidForm } = useForm(
    formConfig.initForm,
    validate
  );

  useEffect(() => {
    resetForm();
  }, [isVisible]);

  const handleSubmit = async () => {
    if (isValidForm()) {
      await formConfig.onButtonClick(form);
    } else {
      toast.error(BASIC_MESSAGES.INVALID_FORM);
    }
  };

  if (!isVisible) return null;
  return (
    <ModalForm
      isVisible={isVisible}
      onClose={formConfig.hideModal}
      title={formConfig.title}
      children={
        <>
          <div className="flex flex-col space-y-4">
            <SelectField
              title="Chi nhánh"
              isRequired={true}
              fetchListApi={branch.autoComplete}
              placeholder="Chọn chi nhánh"
              queryParams={{
                ignoreAccountId: form?.accountId,
              }}
              value={form?.branchId}
              onChange={(value: any) => handleChange("branchId", value)}
              error={errors?.branchId}
            />
            <ActionSection
              children={
                <>
                  <CancelButton onClick={formConfig.hideModal} />
                  <SubmitButton
                    text={BUTTON_TEXT.CREATE}
                    onClick={handleSubmit}
                  />
                </>
              }
            />
          </div>
        </>
      }
    />
  );
};

export default CreateAccountBranch;
