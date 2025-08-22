import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
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
import MyAccount from './pages/myAccount/MyAccount.jsx';
import CustomerCart from './pages/myAccount/CustomerCart.jsx';
import CustomerPurchased from './pages/myAccount/CustomerPurchased.jsx';
import Wallet from './pages/myAccount/Wallet.jsx';

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
    path: '/myAccount',
    element: <MyAccount />,
    errorElement: <NotFound />,
    children: [
      // This is to redirect to the account page
      {
        path: '',
        element: <Navigate to="account" replace />
      },
      {
        path: 'account',
        element: <MyAccount />,
        errorElement: <NotFound />
      },
      {
        path: 'wallet',
        element: <Wallet />,
        errorElement: <NotFound />
      },
      {
        path: 'cart',
        element: <CustomerCart />,
        errorElement: <NotFound />
      },
      {
        path: 'purchased',
        element: <CustomerPurchased />,
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
