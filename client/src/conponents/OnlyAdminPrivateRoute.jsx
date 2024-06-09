import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function OnlyAdminPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.isAdmin ? (
    // Outlet相当于嵌套路由
    <Outlet />
  ) : (
    <Navigate to="/sign-in" />
  );
}
