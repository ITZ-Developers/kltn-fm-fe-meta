import { useEffect, useState } from "react";
import GridView from "../../components/page/GridView";
import Sidebar from "../../components/page/Sidebar";
import useApi from "../../hooks/useApi";
import { renderEnum, renderImage } from "../../components/ItemRender";
import { PAGE_CONFIG } from "../../components/PageConfig";
import { CreateButton, ToolBar } from "../../components/page/ToolBar";
import InputBox from "../../components/page/InputBox";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../components/GlobalProvider";
import { LoadingDialog } from "../../components/page/Dialog";

const Admin = () => {
  const { hasRole } = useGlobalContext();
  const navigate = useNavigate();
  const { admin, loading } = useApi();
  const [data, setData] = useState([]);

  const columns = [
    renderImage({}),
    { label: "Họ và tên", accessor: "fullName", align: "left" },
    { label: "Tài khoản", accessor: "username", align: "left" },
    {
      label: "Email",
      accessor: "email",
      align: "left",
    },
    renderEnum({}),
  ];

  const getData = async () => {
    // const query: any = {
    //   page: currentPage,
    //   size: itemsPerPage,
    // };
    // if (searchValues.displayName) {
    //   query.displayName = searchValues.displayName;
    // }
    // if (searchValues.email) {
    //   query.email = searchValues.email;
    // }
    // if (searchValues.phone) {
    //   query.phone = searchValues.phone;
    // }
    // if (searchValues.role) {
    //   query.role = searchValues.role;
    // }
    // if (searchValues.status) {
    //   query.status = searchValues.status;
    // }
    const userRes = await admin.list({ fullName: null });
    setData(userRes.data.content);
  };

  useEffect(() => {
    getData();
  }, []);

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
                // value={searchValues.displayName}
                // onChangeText={(value: any) =>
                //   setSearchValues({ ...searchValues, displayName: value })
                // }
                placeholder="Họ và tên..."
              />
            }
            onSearch={() => {}}
            onClear={() => {}}
            actionButtons={
              hasRole(PAGE_CONFIG.CREATE_ADMIN.role) ? (
                <CreateButton
                  onClick={() => navigate(PAGE_CONFIG.CREATE_ADMIN.path)}
                />
              ) : null
            }
          />
          <GridView
            data={data}
            columns={columns}
            currentPage={0}
            itemsPerPage={1}
            onPageChange={() => {}}
            totalPages={0}
          />
          {/* <Header
            onCreate={onCreateButtonClick}
            onDeleteAll={handleDeleteAllDialog}
            onImport={() => {
              setImportModalVisible(true);
            }}
            onExport={() => {
              onExportButtonClick(getStorageData(GORGEOUS_SWAGGER.name));
            }}
            SearchBoxes={
              <InputBox
                placeholder="Searching..."
                icon={SearchIcon}
                value={searchValue}
                onChangeText={handleSearch}
              />
            }
          />
          {data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((item) => (
                  <Card
                    key={item.id}
                    item={item}
                    onExport={(id: any) => {
                      onExportButtonClick([
                        getItemById(GORGEOUS_SWAGGER.name, id),
                      ]);
                    }}
                    onUpdate={(id: any) => {
                      onUpdateButtonClick(id);
                    }}
                    onDelete={(id: any) => {
                      handleDeleteDialog(id);
                    }}
                    onConvert={async (id: any) => {
                      await handleConvert(id);
                    }}
                  />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <NoData />
          )} */}
          {/* <ToastContainer
            position="bottom-right"
            style={{ width: "400px" }}
            theme="dark"
          /> */}
          {/* <LoadingDialog isVisible={isLoading} /> */}
          {/* <LoadingDialog isVisible={loading} /> */}
        </>
      }
    ></Sidebar>
  );
};

export default Admin;
