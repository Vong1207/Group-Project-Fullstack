import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store.js'
import './index.css'

// Pages
import Home from './pages/home/Home.jsx'
import NotFound from './pages/partials/NotFound.jsx'
import SignIn from './pages/signIn/SignIn.jsx'
import SignUp from './pages/signUp/SignUp.jsx'
import CustomerSignUp from './pages/signUp/CustomerSignUp.jsx'
import VendorSignUp from './pages/signUp/VendorSignUp.jsx'
import ShipperSignUp from './pages/signUp/ShipperSignUp.jsx'
import ShipperDashboard from './pages/shipper/ShipperDashboard.jsx';
import VendorDashboard from './pages/vendor/vendorDashboard.jsx';
import Customer from './pages/customer/Customer.jsx';
import Wallet from './pages/customer/Wallet.jsx';
import Cart from './pages/customer/Cart.jsx';
import Purchased from './pages/customer/Purchased.jsx';
import CustomerSettings from './pages/customer/CustomerSettings.jsx';

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
    path: "/signup/customer",
    element: <CustomerSignUp />,
    errorElement: <NotFound />
  },
  {
    path: "/signup/vendor",
    element: <VendorSignUp />,
    errorElement: <NotFound />
  },
  {
    path: "/signup/shipper",
    element: <ShipperSignUp />,
    errorElement: <NotFound />
  },
  {
    path: "/shipper",
    element: <ShipperDashboard />,
    errorElement: <NotFound />
  },
  {
    path: "/vendor",
    element: <VendorDashboard />,
    errorElement: <NotFound />
  },
  {
    path: "/customer",
    element: <Customer />,
    errorElement: <NotFound />,
    children: [
      {
        path: "wallet",
        element: <Wallet />,
        errorElement: <NotFound />
      },
      {
        path: "cart",
        element: <Cart />,
        errorElement: <NotFound />
      },
      {
        path: "purchased",
        element: <Purchased />,
        errorElement: <NotFound />
      },
      {
        path: "settings",
        element: <CustomerSettings />,
        errorElement: <NotFound />
      }
    ]
  }
])
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
