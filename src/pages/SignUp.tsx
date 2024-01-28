import Navbar from "../layout/Navbar";
import shoe1 from "../assets/shoe.png"
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../redux/features/users/userApi";
import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { userAdd } from "../redux/features/users/userSlice";


const SignUp = () => {
    const [createUser]=useCreateUserMutation()
    const navigate=useNavigate()
    const dispatch=useAppDispatch();
    const [error,setError]=useState('')
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const handleSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
      event.preventDefault();
      const data={
        
        name:name,
        email:email,
        password:password
      }
      
      createUser(data)
      .unwrap()
      .then((result) => {
        console.log(result);
    
        dispatch(userAdd(result.user));
        localStorage.setItem('token', result.token);
        navigate(`/dashboard/products`);
      })
      .catch((error) => {
        setError(error.data.error);
    
      });

      
      
    }
    
    const handleNameChange = (event:ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    };
  
    const handleEmailChange = (event:ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event:ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    };
    return (
        <div>
            <Navbar></Navbar>
            <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <div className="text-center ">
      <h1 className="text-5xl font-bold">Create an Account</h1>
      <img src={shoe1} className="max-w-xl rounded-lg " />
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input onChange={handleNameChange} value={name} type="name" placeholder="name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input onChange={handleEmailChange} value={email} type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input onChange={handlePasswordChange} value={password} type="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            <span className="label-text-alt">Already Have an Account? <Link to='/login' className="font-bold">Login</Link></span>

            
          </label>
          <label className="label text-red-800">
            {error}
            <span className="label-text-alt"></span>

            
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  </div>
</div>
        </div>
    );
};

export default SignUp;