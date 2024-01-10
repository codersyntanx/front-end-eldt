import { useSelector } from "react-redux";
import { Navigate, Outlet, Route } from "react-router-dom";
import { USER_TYPE } from "./PrivateRoutes";

const useAuth = () => {
  const userState = useSelector((state) => state?.user);
  if (userState?.user) return userState?.user?.type === USER_TYPE.STUDENT;
  else return false;
};

const StudentRoutes = () => {
  const isAuth = useAuth();

  return <>{isAuth ? <Outlet /> : <Outlet />}</>;
};
export default StudentRoutes;
