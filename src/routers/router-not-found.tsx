import { createBrowserRouter } from "react-router-dom";
import NotFound from "../components/routes/not-found";

export const routerNotFound = createBrowserRouter([
  {
    errorElement: <NotFound />,
  },
]);
