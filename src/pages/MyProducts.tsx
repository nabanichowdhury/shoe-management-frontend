import { useGetSingleUserQuery } from "../redux/features/users/userApi";
import { useAppDispatch } from "../redux/hooks";
import shoe1 from "../assets/shoe1.webp";
import { useEffect, useState } from "react";

import CheckBox from "../components/CheckBox";
import { useDeleteProductsMutation } from "../redux/features/products/productApi";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { shoeAdd } from "../redux/features/products/productSlice";

const MyProducts = () => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [list, setList] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const id = user._id || localStorage.getItem("_id");
 
  const { data, isLoading } = useGetSingleUserQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });
  const [deleteProducts] = useDeleteProductsMutation();

  useEffect(() => {
    if (!isLoading) {
      setList(data);
    }
  }, [data, isLoading]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(list?.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e: { target: { id: any; checked: any } }) => {
    const { id, checked } = e.target;
    setIsCheck((prevCheck) => [...prevCheck, id]);
    if (!checked) {
      setIsCheckAll(!isCheckAll);
      setIsCheck((prevCheck) => prevCheck.filter((item) => item !== id));
    }
  };
  const handleDelete = () => {
    deleteProducts(isCheck)
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        navigate("/dashboard/myProducts");
      });
  };


  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="overflow-x-auto">
      <div className="flex items-center">
        <div className="font-bold ">My Products</div>
        {isCheck.length > 0 && (
          <label
            htmlFor="my_modal_1"
            className="btn bg-red-800 text-white btn-xs"
          >
            Delete Selected One
          </label>
        )}
      </div>
      {list.length == 0 ? (
        <p className="font-bold text-lg">You donot have any product</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>
                  <CheckBox
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    handleClick={handleSelectAll}
                    isChecked={list?.length == isCheck?.length}
                  />
                </th>

                <th>Name</th>
                <th>Product Details</th>
                <th>Availability</th>
                <th>Seller name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list?.map((shoe: any) => (
                <tr key={shoe._id}>
                  <th>
                    <CheckBox
                      key={shoe._id}
                      type="checkbox"
                      name={shoe.name}
                      id={shoe._id}
                      handleClick={handleClick}
                      isChecked={isCheck.includes(shoe._id)}
                    />
                  </th>

                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={shoe1}
                            alt="Avatar Tailwind CSS Component"
                          />
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
                    <span className="badge badge-ghost badge-sm">
                      {shoe.color}
                    </span>
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
                      disabled={shoe.productQuantity == 0}
                      className="btn btn-secondary btn-xs"
                    >
                      <Link to="/dashboard/sellProduct">Sell Product</Link>
                    </button>
                    <button
                      onClick={() => dispatch(shoeAdd(shoe))}
                      className="btn btn-warning btn-xs"
                    >
                      <Link to="/dashboard/UpdateProduct">
                        {shoe.productQuantity > 0 ? (
                          <p>Update</p>
                        ) : (
                          <p>Restock</p>
                        )}
                      </Link>
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          <ToastContainer></ToastContainer>
          <input type="checkbox" id="my_modal_1" className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Delete products</h3>
              <p className="py-4">Are you sure to delete the Items?</p>
              <div className="modal-action flex">
                <label
                  htmlFor="my_modal_1"
                  onClick={handleDelete}
                  className="btn  bg-red-800 text-white"
                >
                  Yes I want to delete
                </label>
                <label htmlFor="my_modal_1" className="btn">
                  No I don't
                </label>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyProducts;
