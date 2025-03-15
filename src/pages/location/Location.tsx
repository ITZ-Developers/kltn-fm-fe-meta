import { toast } from "react-toastify";
import {
  ActionDeleteButton,
  ActionEditButton,
} from "../../components/form/Button";
import {
  configDeleteDialog,
  ConfirmationDialog,
} from "../../components/page/Dialog";
import { PAGE_CONFIG } from "../../components/PageConfig";
import useApi from "../../hooks/useApi";
import { useGridView } from "../../hooks/useGridView";
import useModal from "../../hooks/useModal";
import { ALIGNMENT, ITEMS_PER_PAGE } from "../../services/constant";
import Sidebar from "../../components/page/Sidebar";
import { CreateButton, ToolBar } from "../../components/page/ToolBar";
import { GridView } from "../../components/page/GridView";
import MyToastContainer from "../../components/page/MyToastContainer";
import { useNavigate, useParams } from "react-router-dom";
import useQueryState from "../../hooks/useQueryState";
import { useEffect, useState } from "react";
import InputBox from "../../components/page/InputBox";

const Location = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const initQuery = {
    customerId,
    name: "",
    page: 0,
    size: ITEMS_PER_PAGE,
  };
  const { handleNavigateBack } = useQueryState({
    path: PAGE_CONFIG.CUSTOMER.path,
  });
  const {
    isModalVisible: deleteDialogVisible,
    showModal: showDeleteDialog,
    hideModal: hideDeleteDialog,
    formConfig: deleteDialogConfig,
  } = useModal();
  const { location, customer } = useApi();
  const {
    data,
    query,
    setQuery,
    totalPages,
    handlePageChange,
    handleSubmitQuery,
  } = useGridView({
    fetchListApi: location.list,
    initQuery,
  });
  const [customerData, setCustomerData] = useState<any>(null);

  useEffect(() => {
    if (!customerId) {
      handleNavigateBack();
      return;
    }

    const fetchData = async () => {
      const res = await customer.get(customerId);
      if (res.result) {
        const data = res.data;
        setCustomerData(data);
      } else {
        handleNavigateBack();
      }
    };

    fetchData();
  }, [customerId]);

  const columns = [
    {
      label: "Tên khu vực",
      accessor: "name",
      align: ALIGNMENT.LEFT,
    },
    {
      label: "Hành động",
      accessor: "action",
      align: ALIGNMENT.CENTER,
      render: (item: any) => {
        return (
          <span className="flex items-center text-center justify-center space-x-2">
            <ActionEditButton
              role={PAGE_CONFIG.UPDATE_LOCATION.role}
              onClick={() => onUpdateButtonClick(item.id)}
            />
            <ActionDeleteButton
              role={PAGE_CONFIG.DELETE_LOCATION.role}
              onClick={() => onDeleteButtonClick(item.id)}
            />
          </span>
        );
      },
    },
  ];

  const onCreateButtonClick = () => {
    navigate(`/customer/location/create/${customerId}`, { state: { query } });
  };

  const onUpdateButtonClick = (id: any) => {
    navigate(`/customer/location/update/${id}`, { state: { query } });
  };

  const onDeleteButtonClick = (id: any) => {
    showDeleteDialog(
      configDeleteDialog({
        label: PAGE_CONFIG.DELETE_LOCATION.label,
        deleteApi: () => location.del(id),
        refreshData: () => handleSubmitQuery(query),
        hideModal: hideDeleteDialog,
        toast,
      })
    );
  };

  return (
    <Sidebar
      breadcrumbs={[
        {
          label: `${customerData?.account?.fullName}`,
          onClick: handleNavigateBack,
        },
        {
          label: PAGE_CONFIG.LOCATION.label,
        },
      ]}
      activeItem={PAGE_CONFIG.CUSTOMER.name}
      renderContent={
        <>
          <MyToastContainer />
          <ToolBar
            searchBoxes={
              <>
                <InputBox
                  value={query.name}
                  onChangeText={(value: any) =>
                    setQuery({ ...query, name: value })
                  }
                  placeholder="Tên khu vực..."
                />
              </>
            }
            onSearch={async () => await handleSubmitQuery(query)}
            onClear={async () => await handleSubmitQuery(initQuery)}
            actionButtons={
              <CreateButton
                role={PAGE_CONFIG.CREATE_ACCOUNT_BRANCH.role}
                onClick={onCreateButtonClick}
              />
            }
          />
          <GridView
            data={data}
            columns={columns}
            currentPage={query.page}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
          <ConfirmationDialog
            isVisible={deleteDialogVisible}
            formConfig={deleteDialogConfig}
          />
        </>
      }
    ></Sidebar>
  );
};
export default Location;
