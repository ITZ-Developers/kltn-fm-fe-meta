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
import {
  ALIGNMENT,
  GROUP_KIND_MAP,
  ITEMS_PER_PAGE,
  STATUS_MAP,
} from "../../services/constant";
import Sidebar from "../../components/page/Sidebar";
import { CreateButton, ToolBar } from "../../components/page/ToolBar";
import { GridView } from "../../components/page/GridView";
import MyToastContainer from "../../components/page/MyToastContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { SelectBox, StaticSelectBox } from "../../components/page/SelectBox";
import {
  renderEnum,
  renderHrefLink,
  renderImage,
} from "../../components/ItemRender";

const initQuery = {
  accountId: "",
  branchId: "",
  status: "",
  page: 0,
  size: ITEMS_PER_PAGE,
};

const Customer = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    isModalVisible: deleteDialogVisible,
    showModal: showDeleteDialog,
    hideModal: hideDeleteDialog,
    formConfig: deleteDialogConfig,
  } = useModal();
  const { customer, admin, branch } = useApi();
  const {
    data,
    query,
    setQuery,
    totalPages,
    handlePageChange,
    handleSubmitQuery,
  } = useGridView({
    fetchListApi: customer.list,
    initQuery: state?.query || initQuery,
  });

  const columns = [
    renderImage({
      label: "Ảnh",
      accessor: "account.avatarPath",
    }),
    renderHrefLink({
      label: "Họ và tên",
      accessor: "account.fullName",
      align: ALIGNMENT.LEFT,
      role: PAGE_CONFIG.LOCATION.role,
      onClick: (item: any) => {
        navigate(`/customer/location/${item.id}`, { state: { query } });
      },
    }),
    { label: "Tài khoản", accessor: "account.username", align: ALIGNMENT.LEFT },
    {
      label: "Email",
      accessor: "account.email",
      align: ALIGNMENT.LEFT,
    },
    {
      label: "Chi nhánh",
      accessor: "branch.name",
      align: ALIGNMENT.LEFT,
    },
    renderEnum({}),
    {
      label: "Hành động",
      accessor: "action",
      align: ALIGNMENT.CENTER,
      render: (item: any) => {
        return (
          <span className="flex items-center text-center justify-center space-x-2">
            <ActionEditButton
              role={PAGE_CONFIG.UPDATE_CUSTOMER.role}
              onClick={() => onUpdateButtonClick(item.id)}
            />
            <ActionDeleteButton
              role={PAGE_CONFIG.DELETE_CUSTOMER.role}
              onClick={() => onDeleteButtonClick(item.id)}
            />
          </span>
        );
      },
    },
  ];

  const onDeleteButtonClick = (id: any) => {
    showDeleteDialog(
      configDeleteDialog({
        label: PAGE_CONFIG.DELETE_CUSTOMER.label,
        deleteApi: () => customer.del(id),
        refreshData: () => handleSubmitQuery(query),
        hideModal: hideDeleteDialog,
        toast,
      })
    );
  };

  const onCreateButtonClick = () => {
    navigate(PAGE_CONFIG.CREATE_CUSTOMER.path, { state: { query } });
  };

  const onUpdateButtonClick = (id: any) => {
    navigate(`/customer/update/${id}`, { state: { query } });
  };

  return (
    <Sidebar
      breadcrumbs={[
        {
          label: PAGE_CONFIG.CUSTOMER.label,
        },
      ]}
      activeItem={PAGE_CONFIG.CUSTOMER.name}
      renderContent={
        <>
          <MyToastContainer />
          <ToolBar
            searchBoxes={
              <>
                <SelectBox
                  value={query.accountId}
                  onChange={(value: any) => {
                    setQuery({ ...query, accountId: value });
                  }}
                  queryParams={{
                    kind: GROUP_KIND_MAP.CUSTOMER.value,
                  }}
                  fetchListApi={admin.autoComplete}
                  placeholder="Họ và tên..."
                  labelKey="fullName"
                />
                <SelectBox
                  value={query.branchId}
                  onChange={(value: any) => {
                    setQuery({ ...query, branchId: value });
                  }}
                  fetchListApi={branch.autoComplete}
                  placeholder="Chi nhánh..."
                />
                <StaticSelectBox
                  value={query.status}
                  onChange={(value: any) => {
                    setQuery({ ...query, status: value });
                  }}
                  dataMap={STATUS_MAP}
                  placeholder="Trạng thái..."
                />
              </>
            }
            onSearch={async () => await handleSubmitQuery(query)}
            onClear={async () => await handleSubmitQuery(initQuery)}
            actionButtons={
              <CreateButton
                role={PAGE_CONFIG.CREATE_CUSTOMER.role}
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

export default Customer;
