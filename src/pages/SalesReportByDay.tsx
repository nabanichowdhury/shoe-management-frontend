import { useEffect, useState } from "react";
import { useGetBuyerOfSellerQuery } from "../redux/features/sales/salesApi";

import { useAppSelector } from "../redux/hooks";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const SalesReportByDay = () => {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [filter, setFilterdData] = useState()
    const { _id } = useAppSelector(state => state.user)
    const { data, isLoading } = useGetBuyerOfSellerQuery(_id);
    const handleSelect = (date) => {
        let filtered = data?.filter(product => {
            let dateString = product["dateOfSale"]
            

            // Split the date string into day, month, and year components
            const [day, month, year] = dateString.split('/');

            // Create a new Date object (months are 0-indexed, so subtract 1 from the month)
            const prodDate = new Date(`${year}-${month}-${day}`);
            
            return (
                prodDate >= date.selection.startDate &&
                prodDate <= date.selection.endDate
            )
        })
        setStartDate(date.selection.startDate)
        setEndDate(date.selection.endDate)
        setFilterdData(filtered)
    }
    if (isLoading) return <p>Loading..</p>
    // else{
    //     setFilterdData(data);
    // }

    // if(!isLoading){
    //     setFilterdData(data);
    // }
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection',
    }

    useEffect(() => {
        if (!isLoading) {
            setFilterdData(data)
        }



    }, [data]);
    // const totalEarned = filter.reduce((total: number, sale: any) => total + sale.saleAmount, 0);


    return (
        <div className="flex">
            <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
            />
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
                                {
                                    filter?.map((d: any, index: number) => <tr key={d._id}>
                                        <th>{index + 1}</th>
                                       
                                        <td>{d.soldItem}</td>
                                       
                                        <td>{d.saleAmount}</td>
                                        <td>{d.dateOfSale}</td>


                                    </tr>)
                                }




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