import Navbar from "../layout/Navbar";
import shoe1 from "../assets/shoe.png"
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { ChangeEvent, useState } from "react";
import { useLoginUserMutation } from "../redux/features/users/userApi";
import { userAdd } from "../redux/features/users/userSlice";
import { useDispatch } from "react-redux";


const Login = () => {
    const [loginUser,{isLoading,isError,isSuccess}]=useLoginUserMutation()
    const navigate=useNavigate()
    const dispatch=useAppDispatch()
    const [password,setPassword]=useState('');
    const [email,setEmail]=useState('');
    const handleEmailChange = (event:ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
      };
    
      let error="";
      let user;
      const handlePasswordChange = (event:ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
      };
      const  handleSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const data={
          email:email,
          password:password
        }
       loginUser(data).unwrap().then((result:any)=>{
        console.log(result.user)
        localStorage.setItem('token',result.token) 
        if (result.user.email) {
            console.log('Redirecting to dashboard');
            
            dispatch(userAdd(result.user));
            navigate(`/dashboard`)
          }

       }).catch((error: any) => {
        // Handle any errors that might occur during the login process
        console.error('Login failed:', error);
      });
      }
    return (
        <div>
            <Navbar></Navbar>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center ">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <img src={shoe1} className="max-w-xl rounded-lg " />
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit} className="card-body">
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
                                    <span className="label-text-alt">Donot have a Account? <Link to='/signUp' className="font-bold">Signup</Link></span>
                                </label>
                                {isError && <span className="text-red-800">{error}</span>}
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;