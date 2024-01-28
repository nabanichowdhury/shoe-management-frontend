import { useGetBuyerOfSellerQuery } from "../redux/features/sales/salesApi";
import { useAppSelector } from "../redux/hooks";


const MyBuyers = () => {
    const {_id}=useAppSelector(state=>state.user)
    const {data,isLoading}=useGetBuyerOfSellerQuery(_id)
    if(isLoading)return <p>Loading...</p>
    const totalEarned = data.reduce((total:number, sale:any) => total + sale.saleAmount, 0);
    return (
        <div>
            <h1 className="font-bold mx-3">My Buyers</h1>
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
            data.map((d:any,index:number)=> <tr>
                <th>{index+1}</th> 
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
    );
};

export default MyBuyers;