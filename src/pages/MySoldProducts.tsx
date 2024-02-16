import { useGetSingleUserQuery } from "../redux/features/users/userApi";
import { useAppDispatch } from "../redux/hooks";
import shoe1 from "../assets/shoe1.webp";
import { Link } from "react-router-dom";
import { shoeAdd } from "../redux/features/products/productSlice";

const MySoldProducts = () => {
  const dispatch = useAppDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  const { data, isLoading } = useGetSingleUserQuery(user._id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });
  if (isLoading) return <p>Loading...</p>;
  const soldData = data.filter((d: any) => d.productQuantity == 0);
  return (
    <div className="overflow-x-auto">
      <div className="flex items-center">
        <div className="font-bold ">My Out of Stock Products</div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th></th>

            <th>Name</th>
            <th>Product Details</th>
            <th>Availability</th>
            <th>Seller name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {soldData.map((shoe: any) => (
            <tr key={shoe._id}>
              <th></th>

              <td>
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
                <br />
                <span className="badge badge-ghost badge-sm">{shoe.color}</span>
              </td>
              <td>
                {shoe.productQuantity == 0 ? (
                  <span className="badge badge-warning badge-sm">
                    Out of stock
                  </span>
                ) : (
                  <span className="badge badge-success badge-sm">
                    Available
                  </span>
                )}
              </td>

              <td>{shoe.sellerInfo.sellerName}</td>
              <th>
                <button
                  onClick={() => dispatch(shoeAdd(shoe))}
                  className="btn btn-warning btn-xs"
                >
                  <Link to="/dashboard/UpdateProduct">Restock</Link>
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MySoldProducts;
