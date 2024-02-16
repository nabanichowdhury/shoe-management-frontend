import { useEffect, useState } from "react";
import { useGetBuyerOfSellerQuery } from "../redux/features/sales/salesApi";

import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const SalesReportByDay = () => {
  const [startDate, setStartDate] = useState(new Date());
  const user = JSON.parse(localStorage.getItem("user"));

  const { data, isLoading } = useGetBuyerOfSellerQuery(user._id);

  const [endDate, setEndDate] = useState(new Date());
  const [filter, setFilterdData] = useState<any[]>();

  const handleSelect = (date: any) => {
    let filtered = data?.filter((product: any) => {
      let dateString = product["dateOfSale"];

      const [day, month, year] = dateString.split("/");

      const prodDate = new Date(`${year}-${month}-${day}`);

      return (
        prodDate >= date.selection.startDate &&
        prodDate <= date.selection.endDate
      );
    });
    setStartDate(date.selection.startDate);
    setEndDate(date.selection.endDate);
    setFilterdData(filtered);
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  useEffect(() => {
    if (!isLoading) {
      setFilterdData(data);
    }
  }, [isLoading]);
  if (isLoading) return <p>Loading..</p>;

  return (
    <div className="flex">
      <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
      <div>
        <div>
          <h1 className="font-bold mx-3">My Buyers</h1>
          <div className="overflow-x-auto">
            <table className="table table-xs">
              <thead>
                <tr>
                  <th></th>

                  <th>Product Name</th>

                  <th>Amount Received</th>
                  <th>Date of sale</th>
                </tr>
              </thead>
              <tbody>
                {filter?.map((d: any, index: number) => (
                  <tr key={d._id}>
                    <th>{index + 1}</th>

                    <td>{d.soldItem}</td>

                    <td>{d.saleAmount}</td>
                    <td>{d.dateOfSale}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th></th>

                  <th></th>
                  <th>Total Earned: </th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReportByDay;
