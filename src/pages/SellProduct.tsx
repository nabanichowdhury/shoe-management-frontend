import { ToastContainer, toast } from "react-toastify";
import shoe1 from '../assets/shoe.png'
import { useAppSelector } from "../redux/hooks";
import { useState } from "react";
import { usePostSaleMutation } from "../redux/features/sales/salesApi";
import { useUpdateProductMutation } from "../redux/features/products/productApi";
import { useNavigate } from "react-router-dom";
const SellProduct = () => {
    const shoeDetails=useAppSelector(state=>state.shoe)
    const userDetails=useAppSelector(state=>state.user)
    const navigate=useNavigate()
    const [count,setCount]=useState(shoeDetails.productQuantity)

    const [buyerName,setBuyerName]=useState('');
    const [postSale,others]=usePostSaleMutation()
    const [updateProduct,otherupdate]=useUpdateProductMutation()
    
    const handleAdd=()=>{
        setCount(count+1)

    }
    const handleSubs=()=>{
        setCount(count-1)

    }
    const handleBuyerNameChange=(e:any)=>{
        setBuyerName(e.target.value)
    }
    const currentDate = new Date();
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const dateString = currentDate.toLocaleDateString(undefined, options);
    const handleSubmit=(e:any)=>{
        e.preventDefault()
        const q=shoeDetails.productQuantity-count
        const amount=count*shoeDetails.productPrice
        const id=shoeDetails._id
        const shoe={
            productQuantity:q,
        }
        const buyerDetails={
            sellerId:userDetails._id,
            buyer:buyerName,
            soldQuantity:count,
            soldItem:shoeDetails.brand,
            saleAmount:amount,
            dateOfSale:dateString
        }
        postSale(buyerDetails)

        updateProduct({id,shoe}).unwrap().then((res)=>{
            if(res.success){
                toast.success(res.message)
                navigate('/dashboard/myProducts')
            }else{
                toast.error(res.message)
            }
        })

        
        

    }
    return (
        <div >
            
            <div className="card lg:card-side bg-base-100 ">
                <figure><img src={shoe1} alt="Album" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Fill shoe selling for {shoeDetails.brand}</h2>


                    <form  onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Buyer Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                onChange={handleBuyerNameChange}
                                placeholder="Buyer Name"
                                className="input input-bordered w-full max-w-xs"
                                value={buyerName}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Quantity</span>
                            </label>
                            
                        </div>
                        <div className="flex items-center">
                                <button type="button"  onClick={handleSubs} disabled={count==0} className="btn btn-circle btn-primary">-</button>
                                <div className="font-bold mx-4">{count}</div>
                                <button type="button" onClick={handleAdd} disabled={count==shoeDetails.productQuantity} className="btn btn-circle btn-primary">+</button>
                            </div>
                            <label className="label">
                                <span className="label-text font-bold">Total Amount:{shoeDetails.productPrice*count}</span>
                            </label>
                       
                        
                        <div className="form-control mt-6">
                            <button  type="submit" disabled={count==0} className="btn btn-primary w-full max-w-xs">
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

export default SellProduct;