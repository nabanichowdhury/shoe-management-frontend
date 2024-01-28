import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";


const Navbar = () => {
  const user=useAppSelector(state=>state.user)
  const navigate =useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    navigate('/')
  }
    return (
        <div className="navbar bg-base-100">
  <div className="flex-1">
    <Link to='/' className="btn btn-ghost text-xl">Sneakers to Stilettos</Link>
  </div>
  <div className="flex-none gap-2">
    {
      user.email && <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        
        
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </div>
    }
    
  </div>
</div>
    );
};

export default Navbar;