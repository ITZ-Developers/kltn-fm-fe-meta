import Sidebar from "../../components/page/Sidebar";
import { PAGE_CONFIG } from "../../components/PageConfig";

const Customer = () => {
  return (
    <Sidebar
      breadcrumbs={[
        {
          label: PAGE_CONFIG.CUSTOMER.label,
        },
      ]}
      activeItem={PAGE_CONFIG.CUSTOMER.name}
      renderContent={<></>}
    />
  );
};

export default Customer;
