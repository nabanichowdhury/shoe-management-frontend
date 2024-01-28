import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import { filterByMonth, filterByWeek, filterByYear, setSales } from '../redux/features/sales/salesSlice';
import { useGetBuyerOfSellerQuery } from '../redux/features/sales/salesApi';
import SalesReportByDay from './SalesReportByDay';


const SalesReport = () => {

    const [selectedOption, setSelectedOption] = useState("");
    const { _id } = useAppSelector(state => state.user);
    const { data, isLoading } = useGetBuyerOfSellerQuery(_id);
    const { filteredSales } = useAppSelector((state) => state.sales);
    const dispatch = useAppDispatch();

    const options = [ "Yearly", "Monthly", "Weekly"];

    const handleSelectChange = (event: any) => {
        setSelectedOption(event.target.value);

    };


    const filterSales = () => {
        if (data) {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            

            switch (selectedOption) {
                case "Yearly":
                    dispatch(filterByYear({ year: currentYear }));
                    break;
                case "Monthly":
                    dispatch(filterByMonth({ year: currentYear, month: currentMonth }));
                    break;
                case "Weekly":
                    dispatch(filterByWeek());
                    break;
                default:
                    break;
            }
        }
    };

    useEffect(() => {
        if (!isLoading) {

            dispatch(setSales(data));

        }
        filterSales();


    }, [selectedOption]);

   
    if (isLoading) return <p>Loading...</p>;

    const totalEarned = filteredSales.reduce((total: number, sale: any) => total + sale.saleAmount, 0);


    return (
        <div>
            <h1 className='font-bold'>My sales reports</h1>
            <select value={selectedOption} onChange={handleSelectChange} className="select select-ghost w-full max-w-xs">
                <option value="" disabled>Monthly,Yearly,Weekly Report</option>
                {options.map((o) => (
                    <option key={o} value={o} >
                        {o}
                    </option>
                ))}
            </select>
            <div>
                <div>
                    <h1 className="font-bold mx-3">Sales</h1>
                    <div className="overflow-x-auto">
                        <table className="table table-xs">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Buyer Name</th>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Amount Received</th>
                                    <th>Date of sale</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredSales?.map((d: any, index: number) => <tr key={d._id}>
                                        <th>{index + 1}</th>
                                        <td>{d.buyer}</td>
                                        <td>{d.soldItem}</td>
                                        <td>{d.soldQuantity}</td>
                                        <td>{d.saleAmount}</td>
                                        <td>{d.dateOfSale}</td>


                                    </tr>)
                                }




                            </tbody>
                            <tfoot>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th>Total Earned:{totalEarned}</th>
                                    <th></th>

                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            <SalesReportByDay></SalesReportByDay>
           
        </div>
    );
};

export default SalesReport;
