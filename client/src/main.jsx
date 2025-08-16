import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

// Pages
import Home from './pages/home/Home.jsx'
import NotFound from './pages/partials/NotFound.jsx'
import SignIn from './pages/signIn/SignIn.jsx'
import SignUp from './pages/signUp/SignUp.jsx'
import ShipperDashboard from './pages/shipper/ShipperDashboard.jsx';
import VendorDashboard from './pages/vendor/vendorDashboard.jsx';

const router = createBrowserRouter([
  {
    path : "/",
    element: <Home />,
    errorElement: <NotFound />
  },
  {
    path: "/signin",
    element: <SignIn />,
    errorElement: <NotFound />
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <NotFound />
  },
  {
    path: "/shipperDashboard",
    element: <ShipperDashboard />,
    errorElement: <NotFound />
  },
  {
    path: "/VendorDashboard",
    element: <VendorDashboard />,
    errorElement: <NotFound />
  }
])
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
