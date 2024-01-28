
import {ReactNode} from "react"
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
interface IProps{
    children:ReactNode
}
const PrivateRoute = ({children}:IProps) => {
    const {email}=useAppSelector(state=>state.user);
   
    const pathname=useLocation()
    
    if(!email ){
        return <Navigate to="/login" state={{path:pathname}}/>
    }
    return children;
};

export default PrivateRoute;