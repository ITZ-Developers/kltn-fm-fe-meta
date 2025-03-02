import Sidebar from "../../components/page/Sidebar";
import { PAGE_CONFIG } from "../../components/PageConfig";

const CreateAdmin = () => {
  return (
    <Sidebar
      breadcrumbs={[
        {
          label: PAGE_CONFIG.ADMIN.label,
          path: PAGE_CONFIG.ADMIN.path,
        },
        {
          label: PAGE_CONFIG.CREATE_ADMIN.label,
        },
      ]}
      activeItem={PAGE_CONFIG.ADMIN.name}
      renderContent={<></>}
    />
  );
};

export default CreateAdmin;
