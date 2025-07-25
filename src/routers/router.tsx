import { createBrowserRouter } from "react-router-dom";
import Private from "../routes/private";
import Root from "../routes/root";


export const router = createBrowserRouter([
  {
    element: <Private />,
    children: [
      {
        path: "/dashboard",
        element: <Root />,
        children: [
          {
            index: true,
            //element: <Dashboard />,
            element: <h1>Dashboard</h1>,
          },
          /*{
            path: "/lancamentos-fixos",
            element: <LancamentosFixos />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          */
        ],
      },
    ],
  },
  {
    path: "/",
    //element: <LandingPage />,
    element: <h1>LandingPage</h1>,
  },
]);
