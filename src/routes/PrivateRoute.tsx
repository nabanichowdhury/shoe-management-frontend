import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface IProps {
  children: ReactNode;
}
const PrivateRoute = ({ children }: IProps) => {
  const user = localStorage.getItem("user");

  const pathname = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }
  return children;
};

export default PrivateRoute;
