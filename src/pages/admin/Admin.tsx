import { GridView } from "../../components/page/GridView";
import Sidebar from "../../components/page/Sidebar";
import useApi from "../../hooks/useApi";
import {
  renderEnum,
  renderHrefLink,
  renderImage,
  renderNestField,
} from "../../components/ItemRender";
import { PAGE_CONFIG } from "../../components/PageConfig";
import { CreateButton, ToolBar } from "../../components/page/ToolBar";
import InputBox from "../../components/page/InputBox";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ALIGNMENT,
  GROUP_KIND_MAP,
  ITEMS_PER_PAGE,
  STATUS_MAP,
} from "../../services/constant";
import { useGridView } from "../../hooks/useGridView";
import {
  configDeleteDialog,
  ConfirmationDialog,
} from "../../components/page/Dialog";
import useModal from "../../hooks/useModal";
import { useGlobalContext } from "../../components/GlobalProvider";
import { SelectBox, StaticSelectBox } from "../../components/page/SelectBox";
import {
  ActionDeleteButton,
  ActionEditButton,
} from "../../components/form/Button";
import MyToastContainer from "../../components/page/MyToastContainer";
import { toast } from "react-toastify";

const initQuery = {
  fullName: "",
  groupId: "",
  status: "",
  page: 0,
  size: ITEMS_PER_PAGE,
};

const Admin = () => {
  const { state } = useLocation();
  const { profile } = useGlobalContext();
  const { isModalVisible, showModal, hideModal, formConfig } = useModal();
  const navigate = useNavigate();
  const { admin, role } = useApi();
  const {
    data,
    query,
    setQuery,
    totalPages,
    handlePageChange,
    handleSubmitQuery,
  } = useGridView({
    fetchListApi: admin.list,
    initQuery: state?.query || initQuery,
  });

  const columns = [
    renderImage({}),
    renderHrefLink({
      label: "Họ và tên",
      accessor: "fullName",
      align: ALIGNMENT.LEFT,
      role: PAGE_CONFIG.ACCOUNT_BRANCH.role,
    }),
    { label: "Tài khoản", accessor: "username", align: ALIGNMENT.LEFT },
    {
      label: "Email",
      accessor: "email",
      align: ALIGNMENT.LEFT,
    },
    renderNestField({
      label: "Vai trò",
      accessor: "group.name",
      align: ALIGNMENT.LEFT,
    }),
    renderEnum({}),
    {
      label: "Hành động",
      accessor: "action",
      align: ALIGNMENT.CENTER,
      render: (item: any) => {
        return (
          <span className="flex items-center text-center justify-center space-x-2">
            <ActionEditButton
              role={PAGE_CONFIG.UPDATE_ADMIN.role}
              onClick={() =>
                navigate(`/admin/update/${item.id}`, { state: { query } })
              }
            />
            {!item.isSuperAdmin && item.id !== profile.id && (
              <ActionDeleteButton
                role={PAGE_CONFIG.DELETE_ADMIN.role}
                onClick={() => onDeleteButtonClick(item.id)}
              />
            )}
          </span>
        );
      },
    },
  ];

  const onDeleteButtonClick = (id: any) => {
    showModal(
      configDeleteDialog({
        label: PAGE_CONFIG.DELETE_ADMIN.label,
        deleteApi: () => admin.del(id),
        refreshData: () => handleSubmitQuery(query),
        hideModal,
        toast,
      })
    );
  };

  return (
    <Sidebar
      breadcrumbs={[
        {
          label: PAGE_CONFIG.ADMIN.label,
        },
      ]}
      activeItem={PAGE_CONFIG.ADMIN.name}
      renderContent={
        <>
          <ToolBar
            searchBoxes={
              <>
                <InputBox
                  value={query.fullName}
                  onChangeText={(value: any) =>
                    setQuery({ ...query, fullName: value })
                  }
                  placeholder="Họ và tên..."
                />
                <SelectBox
                  value={query.groupId}
                  onChange={(value: any) => {
                    setQuery({ ...query, groupId: value });
                  }}
                  queryParams={{
                    kind: GROUP_KIND_MAP.ADMIN.value,
                  }}
                  fetchListApi={role.list}
                  placeholder="Vai trò..."
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
                role={PAGE_CONFIG.CREATE_ADMIN.role}
                onClick={() =>
                  navigate(PAGE_CONFIG.CREATE_ADMIN.path, { state: { query } })
                }
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
          <MyToastContainer />
          <ConfirmationDialog
            isVisible={isModalVisible}
            formConfig={formConfig}
          />
        </>
      }
    ></Sidebar>
  );
};

export default Admin;
