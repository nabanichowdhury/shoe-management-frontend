import { useState } from "react";
import shoe1 from "../assets/shoe.png"
import IShoe from "../types/globalTypes";
import {  useAppSelector } from "../redux/hooks";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUpdateProductMutation } from "../redux/features/products/productApi";
import { useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const {_id,name}=useAppSelector(state=>state.user) 
    const [updateProduct]=useUpdateProductMutation()
    const shoeDetail=useAppSelector(state=>state.shoe)
    const navigate=useNavigate()
    const [shoe, setShoe] = useState<IShoe>({
        name: shoeDetail.name,
        productQuantity: shoeDetail.productQuantity,
        productPrice: shoeDetail.productPrice,
        brand: shoeDetail.brand,
        size: shoeDetail.size,
        color: shoeDetail.color,
        releaseDate: shoeDetail.releaseDate,
        model: shoeDetail.model,
        sellerInfo: {
          sellerName: name,
          sellerId: _id
        },
        sellingDetails: {
          sold: false,
          buyerId: null
        }
      });
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShoe((prevShoe) => ({ ...prevShoe, [name]: value }));
      };
    
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(shoe)
        const id=shoeDetail._id

        updateProduct({id,shoe}).unwrap().then((res)=>{
            if(res.success){
                toast.success(res.message)
                navigate('/dashboard/myProducts')
            }else{
                toast.error(res.message)
            }
        })
        
        
        
          
      };
    return (
        <div >
            
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure><img src={shoe1} alt="Album" /></figure>
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
                                Update your product
                            </button>
                        </div>
                    </form>
                    <ToastContainer></ToastContainer>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;