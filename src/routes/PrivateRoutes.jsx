import { useSelector } from "react-redux";
import { Navigate, Outlet, Route } from "react-router-dom";
export const USER_TYPE = {
  SUPER_ADMIN: "SUPER_ADMIN",
  INSTRUCTOR: "INSTRUCTOR",
  STUDENT: "STUDENT",
};

const useAuth = () => {
  const userState = useSelector((state) => state?.user);
  if (userState?.user) {
    return (
      userState?.user?.type === USER_TYPE.SUPER_ADMIN ||
      userState?.user?.type === USER_TYPE.STUDENT ||
      userState?.user?.type === USER_TYPE.INSTRUCTOR
    );
  } else return false;
};

const ProtectedRoute = () => {
  const isAuth = useAuth();

  return <>{isAuth ? <Outlet /> :<Outlet />}</>;
};
export default ProtectedRoute;
