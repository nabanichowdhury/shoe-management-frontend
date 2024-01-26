import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";


const DashBoardlayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                <Outlet/>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-100 min-h-full bg-base-200 text-base-content">
                        <ul className="menu bg-base-200 w-56 rounded-box">
                            <li><Link to='/dashboard/products'>All products</Link></li>
                            <li><Link to='/dashboard/myProducts'>My Products</Link></li>
                            {/* <li>
                                <details>
                                    <summary>My inventory</summary>
                                    <ul>
                                        <li><a>Add a product </a></li>
                                        <li><a>Sell a product</a></li>
                                        <li><a>Delete a product</a></li>
                                        
                                    </ul>
                                </details>
                            </li> */}
                            <li><Link to='/dashboard/mySoldProducts'>My Sold Products</Link></li>
                            <li><Link to='/dashboard/myBuyers'>Buyers</Link></li>
                        </ul>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBoardlayout;