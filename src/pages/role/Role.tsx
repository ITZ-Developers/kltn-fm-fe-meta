import { GridView } from "../../components/page/GridView";
import Sidebar from "../../components/page/Sidebar";
import useApi from "../../hooks/useApi";
import { basicRender, renderEnum } from "../../components/ItemRender";
import { PAGE_CONFIG } from "../../components/PageConfig";
import { ToolBar } from "../../components/page/ToolBar";
import InputBox from "../../components/page/InputBox";
import {
  ALIGNMENT,
  GROUP_KIND_MAP,
  ITEMS_PER_PAGE,
  TRUNCATE_LENGTH,
} from "../../services/constant";
import { useGridView } from "../../hooks/useGridView";
import { ActionEditButton } from "../../components/form/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { convertUtcToVn, truncateString } from "../../services/utils";
import { StaticSelectBox } from "../../components/page/SelectBox";

const initQuery = { name: "", kind: "", page: 0, size: ITEMS_PER_PAGE };

const Role = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { role } = useApi();
  const {
    data,
    query,
    setQuery,
    totalPages,
    handlePageChange,
    handleSubmitQuery,
  } = useGridView({
    fetchListApi: role.list,
    initQuery: state?.query || initQuery,
  });

  const columns = [
    { label: "Tên vai trò", accessor: "name", align: ALIGNMENT.LEFT },
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
      label: "Lần cập nhật cuối",
      accessor: "modifiedDate",
      align: ALIGNMENT.LEFT,
      render: (item: any) => {
        return (
          <span
            className={`text-gray-300 p-4 text-${ALIGNMENT.LEFT} whitespace-nowrap`}
          >
            {convertUtcToVn(item.modifiedDate)}
          </span>
        );
      },
    },
    renderEnum({
      label: "Loại",
      accessor: "kind",
      align: ALIGNMENT.CENTER,
      dataMap: GROUP_KIND_MAP,
    }),
    {
      label: "Hành động",
      accessor: "action",
      align: ALIGNMENT.CENTER,
      render: (item: any) => {
        return (
          <span className="flex items-center text-center justify-center space-x-2">
            <ActionEditButton
              role={PAGE_CONFIG.UPDATE_ROLE.role}
              onClick={() =>
                navigate(`/role/update/${item.id}`, { state: { query } })
              }
            />
          </span>
        );
      },
    },
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
              <>
                <InputBox
                  value={query.name}
                  onChangeText={(value: any) =>
                    setQuery({ ...query, name: value })
                  }
                  placeholder="Tên vai trò..."
                />
                <StaticSelectBox
                  value={query.kind}
                  onChange={(value: any) => {
                    setQuery({ ...query, kind: value });
                  }}
                  dataMap={GROUP_KIND_MAP}
                  placeholder="Loại..."
                />
              </>
            }
            onSearch={async () => await handleSubmitQuery(query)}
            onClear={async () => await handleSubmitQuery(initQuery)}
          />
          <GridView
            data={data}
            columns={columns}
            currentPage={query.page}
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
