//import { useIsAuth } from "@/services/auth/hooks/use-is-auth";
import { Navigate, Outlet } from "react-router-dom";

export default function Private() {
  //const isAuth = useIsAuth();
  const isAuth = true;

  return isAuth ? <Outlet /> : <Navigate to="/" />;
}
