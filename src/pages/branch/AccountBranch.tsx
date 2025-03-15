// import { useNavigate, useParams } from "react-router-dom";
// import { ALIGNMENT, ITEMS_PER_PAGE } from "../../services/constant";
// import { useGlobalContext } from "../../components/GlobalProvider";
// import useModal from "../../hooks/useModal";
// import useApi from "../../hooks/useApi";
// import { useGridView } from "../../hooks/useGridView";
// import { renderNestField } from "../../components/ItemRender";
// import { ActionDeleteButton } from "../../components/form/Button";
// import { PAGE_CONFIG } from "../../components/PageConfig";
// import { configDeleteDialog } from "../../components/page/Dialog";
// import { toast } from "react-toastify";
// import Sidebar from "../../components/page/Sidebar";
// import { ToolBar } from "../../components/page/ToolBar";
// import InputBox from "../../components/page/InputBox";

// const initQuery = {
//   fullName: "",
//   groupId: "",
//   status: "",
//   page: 0,
//   size: ITEMS_PER_PAGE,
// };

// const AccountBranch = () => {
//   const { adminId } = useParams();
//   const { profile } = useGlobalContext();
//   const { isModalVisible, showModal, hideModal, formConfig } = useModal();
//   const navigate = useNavigate();
//   const { admin, role } = useApi();
//   const {
//     data,
//     query,
//     setQuery,
//     totalPages,
//     handlePageChange,
//     handleSubmitQuery,
//   } = useGridView({
//     fetchListApi: admin.list,
//     initQuery,
//   });

//   const columns = [
//     renderNestField({
//       label: "Tên chi nhánh",
//       accessor: "branch.name",
//       align: ALIGNMENT.LEFT,
//     }),
//     {
//       label: "Hành động",
//       accessor: "action",
//       align: ALIGNMENT.CENTER,
//       render: (item: any) => {
//         return (
//           <span className="flex items-center text-center justify-center space-x-2">
//             <ActionDeleteButton
//               role={PAGE_CONFIG.DELETE_ADMIN.role}
//               onClick={() =>
//                 showModal(
//                   configDeleteDialog({
//                     label: PAGE_CONFIG.DELETE_ADMIN.label,
//                     deleteApi: () => admin.del(item.id),
//                     refreshData: () => handleSubmitQuery(query),
//                     hideModal,
//                     toast,
//                   })
//                 )
//               }
//             />
//           </span>
//         );
//       },
//     },
//   ];

//   return (
//     <Sidebar
//       breadcrumbs={[
//         {
//           label: PAGE_CONFIG.ADMIN.label,
//         },
//       ]}
//       activeItem={PAGE_CONFIG.ADMIN.name}
//       renderContent={
//         <>
//           <ToolBar
//             searchBoxes={
//               <>
//                 <InputBox
//                   value={query.fullName}
//                   onChangeText={(value: any) =>
//                     setQuery({ ...query, fullName: value })
//                   }
//                   placeholder="Họ và tên..."
//                 />
//                 <SelectBox
//                   value={query.groupId}
//                   onChange={(value: any) => {
//                     setQuery({ ...query, groupId: value });
//                   }}
//                   queryParams={{
//                     kind: GROUP_KIND_MAP.ADMIN.value,
//                   }}
//                   fetchListApi={role.list}
//                   placeholder="Vai trò..."
//                 />
//                 <StaticSelectBox
//                   value={query.status}
//                   onChange={(value: any) => {
//                     setQuery({ ...query, status: value });
//                   }}
//                   dataMap={STATUS_MAP}
//                   placeholder="Trạng thái..."
//                 />
//               </>
//             }
//             onSearch={async () => await handleSubmitQuery(query)}
//             onClear={async () => await handleSubmitQuery(initQuery)}
//             actionButtons={
//               <CreateButton
//                 role={PAGE_CONFIG.CREATE_ADMIN.role}
//                 onClick={() =>
//                   navigate(PAGE_CONFIG.CREATE_ADMIN.path, { state: { query } })
//                 }
//               />
//             }
//           />
//           <GridView
//             data={data}
//             columns={columns}
//             currentPage={query.page}
//             itemsPerPage={ITEMS_PER_PAGE}
//             onPageChange={handlePageChange}
//             totalPages={totalPages}
//           />
//           <MyToastContainer />
//           <ConfirmationDialog
//             isVisible={isModalVisible}
//             formConfig={formConfig}
//           />
//         </>
//       }
//     ></Sidebar>
//   );
// };

// export default AccountBranch;

import React from "react";

function AccountBranch() {
  return <div>AccountBranch</div>;
}

export default AccountBranch;
