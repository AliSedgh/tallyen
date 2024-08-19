import SortSelect from "./SortSelect";

const TableInfo = () => {
  return (
    <div className="flex items-center justify-between mb-5 pb-2 border-b">
      <p className="font-bold">تاریخچه‌ی خرید</p>
      <SortSelect />
    </div>
  );
};

export default TableInfo;
