import { useSelector } from "react-redux";
import { Navigate, Outlet, Route } from "react-router-dom";
// import Signin from "../Signin/Signin";

const useAuth = () => {
  const userState = useSelector((state) => state?.user);
  if (userState?.user) return userState.user?.type === "SUPER_ADMIN";
  else return false;
};

const SuperAdminRoutes = () => {
  const isAuth = useAuth();

  return <>{isAuth ? <Outlet /> :<Outlet />}</>;
};
export default SuperAdminRoutes;
