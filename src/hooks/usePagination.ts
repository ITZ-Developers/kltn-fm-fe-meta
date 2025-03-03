import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../services/constant";

const useGridView = ({
  size = ITEMS_PER_PAGE,
  fetchListApi,
  initQuery,
}: any) => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState({ ...initQuery, page: 0, size });

  const getData = async () => {
    const res = await fetchListApi(query);
    setData(res?.data?.content);
    setTotalPages(res?.data?.totalPages);
  };

  useEffect(() => {
    getData();
  }, [query]);

  const handlePageChange = (page: any) => {
    setQuery({ ...query, page, size });
  };

  const handleClearQuery = () => {
    setQuery({ ...initQuery, page: 0, size });
  };

  const handleSubmitQuery = (newQuery: any) => {
    setQuery({ ...newQuery, page: 0, size });
  };

  return {
    data,
    totalPages,
    currentPage: query.page,
    handlePageChange,
    handleClearQuery,
    handleSubmitQuery,
  };
};

export { useGridView };
