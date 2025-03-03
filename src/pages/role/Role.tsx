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
import { useGlobalContext } from "../../components/GlobalProvider";
import {
  ALIGNMENT,
  GROUP_KIND_MAP,
  ITEMS_PER_PAGE,
  STATUS_MAP,
} from "../../services/constant";
import { useGridView } from "../../hooks/usePagination";
import { useState } from "react";

const initQuery = { name: "" };

const Role = () => {
  const { hasRole } = useGlobalContext();
  const navigate = useNavigate();
  const [query, setQuery] = useState(initQuery);
  const { role } = useApi();
  const {
    data,
    currentPage,
    totalPages,
    handlePageChange,
    handleClearQuery,
    handleSubmitQuery,
  } = useGridView({
    size: ITEMS_PER_PAGE,
    fetchListApi: role.list,
    initQuery,
  });

  const columns = [
    { label: "Tên vai trò", accessor: "name", align: ALIGNMENT.LEFT },
    {
      label: "Lần cập nhật cuối",
      accessor: "modifiedDate",
      align: ALIGNMENT.LEFT,
    },
    renderEnum({
      label: "Loại",
      accessor: "kind",
      align: ALIGNMENT.CENTER,
      map: GROUP_KIND_MAP,
    }),
  ];

  return (
    <Sidebar
      breadcrumbs={[
        {
          label: PAGE_CONFIG.ROLE.label,
        },
      ]}
      activeItem={PAGE_CONFIG.ROLE.name}
      renderContent={
        <>
          <ToolBar
            searchBoxes={
              <InputBox
                value={query.name}
                onChangeText={(value: any) =>
                  setQuery({ ...query, name: value })
                }
                placeholder="Tên vai trò..."
              />
            }
            onSearch={() => handleSubmitQuery(query)}
            onClear={() => {
              setQuery(initQuery);
              handleClearQuery();
            }}
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

export default Role;
