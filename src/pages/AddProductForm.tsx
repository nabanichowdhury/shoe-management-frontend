import { useState } from "react";
import shoe1 from "../assets/shoe.png";
import IShoe from "../types/globalTypes";

import { usePostProductMutation } from "../redux/features/products/productApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddProductForm = () => {
  const { name, _id } = JSON.parse(localStorage.getItem("user"));
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const dateString = currentDate.toLocaleDateString(undefined, options);
  const [postProduct] = usePostProductMutation();

  const [shoe, setShoe] = useState<IShoe>({
    name: "",
    productQuantity: 0,
    productPrice: 0,
    brand: "",
    size: "",
    color: "",
    releaseDate: dateString,
    model: "",
    sellerInfo: {
      sellerName: name,
      sellerId: _id,
    },
    sellingDetails: {
      sold: false,
      buyerId: null,
    },
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = parseFloat(value);
    const newValue = isNaN(parsedValue) ? value : Math.max(0, parsedValue);
    setShoe((prevShoe) => ({ ...prevShoe, [name]: newValue }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    postProduct(shoe)
      .unwrap()
      .then((result) => {
        if (result.status == "success") {
          toast.success(result.message);
        }
      });

    setShoe({
      name: "",
      productQuantity: 0,
      productPrice: 0,
      brand: "",
      size: "",
      color: "",
      releaseDate: "",
      model: "",
      sellerInfo: {
        sellerName: name,
        sellerId: _id,
      },
      sellingDetails: {
        sold: false,
        buyerId: null,
      },
    });
  };
  return (
    <div>
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img src={shoe1} alt="Album" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Fill the details of the shoe</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={shoe.name}
                placeholder="Product Name"
                className="input input-bordered w-full max-w-xs"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Brand</span>
              </label>
              <input
                type="text"
                name="brand"
                value={shoe.brand}
                placeholder="Brand"
                className="input input-bordered w-full max-w-xs"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Model</span>
              </label>
              <input
                type="text"
                name="model"
                value={shoe.model}
                placeholder="Model"
                className="input input-bordered w-full max-w-xs"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Size</span>
              </label>
              <input
                type="text"
                name="size"
                value={shoe.size}
                placeholder="Size"
                className="input input-bordered w-full max-w-xs"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Color</span>
              </label>
              <input
                type="text"
                name="color"
                value={shoe.color}
                placeholder="Color"
                className="input input-bordered w-full max-w-xs"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Quantity</span>
              </label>
              <input
                type="number"
                name="productQuantity"
                value={shoe.productQuantity}
                placeholder="Product Quantity"
                className="input input-bordered w-full max-w-xs"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Price</span>
              </label>
              <input
                type="number"
                name="productPrice"
                value={shoe.productPrice}
                placeholder="Product Price"
                className="input input-bordered w-full max-w-xs"
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Add more input fields for other shoe properties */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full max-w-xs">
                Submit
              </button>
            </div>
          </form>
          <ToastContainer></ToastContainer>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
