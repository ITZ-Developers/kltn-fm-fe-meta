import NoDataImage from "../../assets/no_content.png";

const NoData = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <img src={NoDataImage} className="w-32 opacity-50" />
      <h1 className="text-xl text-gray-600">No Data</h1>
    </div>
  );
};

export default NoData;
