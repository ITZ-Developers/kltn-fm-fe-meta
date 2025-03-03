import GridView from "../../components/page/GridView";
import Sidebar from "../../components/page/Sidebar";
import useApi from "../../hooks/useApi";
import {
  renderEnum,
  renderImage,
  renderNestField,
} from "../../components/ItemRender";
import { PAGE_CONFIG } from "../../components/PageConfig";
import { CreateButton, ToolBar } from "../../components/page/ToolBar";
import InputBox from "../../components/page/InputBox";
import { useNavigate } from "react-router-dom";
import { ALIGNMENT, ITEMS_PER_PAGE } from "../../services/constant";
import { useGridView } from "../../hooks/usePagination";
import { useState } from "react";

const initQuery = { fullName: "" };

const Admin = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initQuery);
  const { admin } = useApi();
  const {
    data,
    currentPage,
    totalPages,
    handlePageChange,
    handleClearQuery,
    handleSubmitQuery,
  } = useGridView({
    size: ITEMS_PER_PAGE,
    fetchListApi: admin.list,
    initQuery,
  });

  const columns = [
    renderImage({}),
    { label: "Họ và tên", accessor: "fullName", align: ALIGNMENT.LEFT },
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
  ];

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
              <InputBox
                value={query.fullName}
                onChangeText={(value: any) =>
                  setQuery({ ...query, fullName: value })
                }
                placeholder="Họ và tên..."
              />
            }
            onSearch={() => handleSubmitQuery(query)}
            onClear={() => {
              setQuery(initQuery);
              handleClearQuery();
            }}
            actionButtons={
              <CreateButton
                role={PAGE_CONFIG.CREATE_ADMIN.role}
                onClick={() => navigate(PAGE_CONFIG.CREATE_ADMIN.path)}
              />
            }
          />
          <GridView
            data={data}
            columns={columns}
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            onPageChange={handlePageChange}
            totalPages={totalPages}
          />
        </>
      }
    ></Sidebar>
  );
};

export default Admin;
