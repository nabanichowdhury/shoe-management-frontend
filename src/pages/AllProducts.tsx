import { useGetAllProductsQuery } from "../redux/features/products/productApi";
import shoe1 from "../assets/shoe1.webp"


const AllProducts = () => {
    
    const {data,isLoading}=useGetAllProductsQuery(undefined,{
        refetchOnMountOrArgChange: true,
        pollingInterval: 30000,
      })
    if(isLoading)return <p>Loading...</p>
    
    return (
        <div className="overflow-x-auto">
            <div className="font-bold">All Products</div>
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        
        <th>Name</th>
        <th>Product Details</th>
        <th>Availability</th>
        <th>Seller name</th>
        {/* <th></th> */}
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        data?.map((shoe:any)=><tr>
        
            <td key={shoe._id}>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={shoe1} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{shoe.brand}</div>
                  <div className="text-sm opacity-50">{shoe.model}</div>
                </div>
              </div>
            </td>
            <td className="font-bold">
              Quantity:{shoe.productQuantity},Price:${shoe.productPrice}
              <br/>
              <span className="badge badge-ghost badge-sm">{shoe.color}</span>
            </td>
            <td>{shoe.productQuantity==0 ?<span className="badge badge-warning badge-sm">Out of stock</span>:<span className="badge badge-success badge-sm">Available</span>}</td>
            
            <td>{shoe.sellerInfo.sellerName}</td>
            {/* <th>
              <button className="btn btn-ghost btn-xs">Show Product</button>
            </th> */}
          </tr>)
      }
      
      
    </tbody>
    
    
  </table>
</div>
    );
};

export default AllProducts;