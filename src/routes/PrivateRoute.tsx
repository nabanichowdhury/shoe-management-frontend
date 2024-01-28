
import {ReactNode} from "react"
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { userAdd } from "../redux/features/users/userSlice";
interface IProps{
    children:ReactNode
}
const PrivateRoute = ({children}:IProps) => {
    const dispatch=useAppDispatch()
    const {email}=useAppSelector(state=>state.user);
    const token=localStorage.getItem('token');
    const user=localStorage.getItem('userInfo');
    if(user){
        dispatch(userAdd(JSON.parse(user)))

    }
    
    const pathname=useLocation()
    console.log(token)
    
    if(!user ){
        return <Navigate to="/login" state={{path:pathname}}/>
    }
    return children;
};

export default PrivateRoute;