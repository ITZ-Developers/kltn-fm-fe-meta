import { useGlobalContext } from "../GlobalProvider";
import NoData from "./NoData";
import Pagination from "./Pagination";

const ActionButton = ({
  onClick,
  Icon,
  color,
  role,
  title = "Sample",
}: any) => {
  const { hasRole } = useGlobalContext();

  if (role && !hasRole(role)) {
    return null;
  }

  return (
    <button
      className={`p-1 hover:opacity-90`}
      onClick={onClick}
      title={title}
      style={{ color }}
    >
      <Icon size={16} />
    </button>
  );
};

const GridView = ({
  data,
  columns,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
}: any) => {
  return (
    <div className="w-full">
      {!data || data?.length === 0 ? (
        <NoData />
      ) : (
        <>
          <div className="overflow-x-auto">
            <div className="min-w-[768px]">
              <table className="w-full bg-gray-800 shadow-lg rounded-lg">
                <thead className="bg-gray-700 text-gray-200">
                  <tr className="text-sm leading-normal">
                    <th className="p-4 text-left rounded-tl-lg">#</th>
                    {columns.map((col: any, index: number) => (
                      <th
                        key={col.accessor}
                        className={`p-4 text-${
                          col.align
                        } whitespace-nowrap font-semibold ${
                          index === columns.length - 1 ? "rounded-tr-lg" : ""
                        }`}
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {data.map((item: any, index: any) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="p-4 text-left">
                        {index + 1 + currentPage * itemsPerPage}
                      </td>
                      {columns.map((col: any) => (
                        <td key={col.accessor}>
                          {col.render ? (
                            col.render(item)
                          ) : (
                            <span
                              className={`p-4 text-${col.align} whitespace-nowrap`}
                            >
                              {item[col.accessor]}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export { GridView, ActionButton };
