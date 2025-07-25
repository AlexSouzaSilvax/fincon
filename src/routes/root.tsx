//import Header from "../../components/routes/root/Header";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="relative">
      {/**<Header /> */}
      <Outlet />
    </div>
  );
}
