import { toast } from "react-toastify";
import {
  ActionDeleteButton,
  ActionEditButton,
} from "../../components/form/Button";
import {
  configDeleteDialog,
  configModalForm,
  ConfirmationDialog,
  LoadingDialog,
} from "../../components/page/Dialog";
import { PAGE_CONFIG } from "../../components/PageConfig";
import useApi from "../../hooks/useApi";
import { useGridView } from "../../hooks/useGridView";
import useModal from "../../hooks/useModal";
import {
  ALIGNMENT,
  BASIC_MESSAGES,
  ITEMS_PER_PAGE,
  TRUNCATE_LENGTH,
} from "../../services/constant";
import Sidebar from "../../components/page/Sidebar";
import { CreateButton, ToolBar } from "../../components/page/ToolBar";
import InputBox from "../../components/page/InputBox";
import { GridView } from "../../components/page/GridView";
import MyToastContainer from "../../components/page/MyToastContainer";
import CreateBranch from "./CreateBranch";
import UpdateBranch from "./UpdateBranch";
import { basicRender } from "../../components/ItemRender";
import { truncateString } from "../../services/utils";

const initQuery = {
  name: "",
  page: 0,
  size: ITEMS_PER_PAGE,
};

const Branch = () => {
  const {
    isModalVisible: createFormVisible,
    showModal: showCreateForm,
    hideModal: hideCreateForm,
    formConfig: createFormConfig,
  } = useModal();
  const {
    isModalVisible: updateFormVisible,
    showModal: showUpdateForm,
    hideModal: hideUpdateForm,
    formConfig: updateFormConfig,
  } = useModal();
  const {
    isModalVisible: deleteDialogVisible,
    showModal: showDeleteDialog,
    hideModal: hideDeleteDialog,
    formConfig: deleteDialogConfig,
  } = useModal();
  const { branch: branchForList } = useApi();
  const { branch, loading } = useApi();
  const {
    data,
    query,
    setQuery,
    totalPages,
    handlePageChange,
    handleSubmitQuery,
  } = useGridView({
    fetchListApi: branchForList.list,
    initQuery,
  });

  const columns = [
    {
      label: "Tên chi nhánh",
      accessor: "name",
      align: ALIGNMENT.LEFT,
    },
    {
      label: "Mô tả",
      accessor: "description",
      align: ALIGNMENT.LEFT,
      render: (item: any) => {
        return basicRender({
          align: ALIGNMENT.LEFT,
          content: truncateString(item.description, TRUNCATE_LENGTH),
        });
      },
    },
    {
      label: "Hành động",
      accessor: "action",
      align: ALIGNMENT.CENTER,
      render: (item: any) => {
        return (
          <span className="flex items-center text-center justify-center space-x-2">
            <ActionEditButton
              role={PAGE_CONFIG.UPDATE_BRANCH.role}
              onClick={() => onUpdateButtonClick(item.id)}
            />
            <ActionDeleteButton
              role={PAGE_CONFIG.DELETE_BRANCH.role}
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
        label: PAGE_CONFIG.DELETE_BRANCH.label,
        deleteApi: () => branch.del(id),
        refreshData: () => handleSubmitQuery(query),
        hideModal: hideDeleteDialog,
        toast,
      })
    );
  };

  const onCreateButtonClick = () => {
    showCreateForm(
      configModalForm({
        label: PAGE_CONFIG.CREATE_BRANCH.label,
        fetchApi: branch.create,
        refreshData: () => handleSubmitQuery(query),
        hideModal: hideCreateForm,
        toast,
        successMessage: BASIC_MESSAGES.CREATED,
        initForm: {
          name: "",
        },
      })
    );
  };

  const onUpdateButtonClick = (id: any) => {
    showUpdateForm(
      configModalForm({
        label: PAGE_CONFIG.UPDATE_BRANCH.label,
        fetchApi: branch.update,
        refreshData: () => handleSubmitQuery(query),
        hideModal: hideUpdateForm,
        toast,
        successMessage: BASIC_MESSAGES.UPDATED,
        initForm: {
          id,
          name: "",
        },
      })
    );
  };

  return (
    <Sidebar
      breadcrumbs={[
        {
          label: PAGE_CONFIG.BRANCH.label,
        },
      ]}
      activeItem={PAGE_CONFIG.BRANCH.name}
      renderContent={
        <>
          <MyToastContainer />
          <LoadingDialog isVisible={loading} />
          <ToolBar
            searchBoxes={
              <>
                <InputBox
                  value={query.name}
                  onChangeText={(value: any) =>
                    setQuery({ ...query, name: value })
                  }
                  placeholder="Tên chi nhánh..."
                />
              </>
            }
            onSearch={async () => await handleSubmitQuery(query)}
            onClear={async () => await handleSubmitQuery(initQuery)}
            actionButtons={
              <CreateButton
                role={PAGE_CONFIG.CREATE_BRANCH.role}
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
          <CreateBranch
            isVisible={createFormVisible}
            formConfig={createFormConfig}
          />
          <UpdateBranch
            isVisible={updateFormVisible}
            formConfig={updateFormConfig}
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
export default Branch;
