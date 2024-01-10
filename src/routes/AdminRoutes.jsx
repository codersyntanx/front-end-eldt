// function PrivateRoute({ component: Component, ...rest }) {
//   const isAuthenticated = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
//       }
//     />
//   );
// }
import { useSelector } from "react-redux";
import { Navigate, Outlet, Route } from "react-router-dom";

const useAuth = () => {
  const userState = useSelector((state) => state?.user);

  if (userState?.user) return userState?.user?.type === "INSTRUCTOR";
  else return false;
};

const InstructorRoutes = () => {
  const isAuth = useAuth();

  return <>{isAuth ? <Outlet /> : <Outlet /> }</>;
};
export default InstructorRoutes;
