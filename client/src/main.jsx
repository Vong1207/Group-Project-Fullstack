import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store.js'
import './index.css'
import SessionProvider from './SessionProvider.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

// Pages

import Home from './pages/home/Home.jsx'
import NotFound from './pages/partials/NotFound.jsx'
import SignIn from './pages/signIn/SignIn.jsx'
import SignUp from './pages/signUp/SignUp.jsx'
import CustomerSignUp from './pages/signUp/CustomerSignUp.jsx'
import VendorSignUp from './pages/signUp/VendorSignUp.jsx'
import ShipperSignUp from './pages/signUp/ShipperSignUp.jsx'
import MyAccount from './pages/myAccount/MyAccount.jsx';
import CustomerCart from './pages/myAccount/CustomerCart.jsx';
import CustomerPurchased from './pages/myAccount/CustomerPurchased.jsx';
import Wallet from './pages/myAccount/Wallet.jsx';
import Account from './pages/myAccount/Account.jsx';
import MyProducts from './pages/myAccount/MyProducts.jsx';
import AddNewProduct from './pages/myAccount/AddNewProduct.jsx';
import CategoryPage  from './pages/home/CategoryPages.jsx';
import SearchResult from './pages/search/SearchResult.jsx';
import ProductDetails from './pages/productDetails/ProductDetails.jsx';
import Orders from './pages/myAccount/Orders.jsx';

const router = createBrowserRouter([
  {
    path: "/search",
    element: <SearchResult />,
    errorElement: <NotFound />
  },
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
    path: "/home/:categoryName",
    element: <CategoryPage />,
    errorElement: <NotFound />
  },
  {
    path: "/product/:productId",
    element: <ProductDetails />,
    errorElement: <NotFound />
  },
  {
    path: '/myAccount',
    element: (
      <ProtectedRoute>
        <MyAccount />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      // This is to redirect to the account page
      {
        path: '',
        element: <Navigate to="account" replace />
      },
      {
        path: 'account',
        element: <Account />,
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
      },
      {
        path: 'myProducts',
        element: <MyProducts />,
        errorElement: <NotFound />
      },
      {
        path: 'addNewProduct',
        element: <AddNewProduct />,
        errorElement: <NotFound />
      },
      {
        path: 'orders',
        element: <Orders />,
        errorElement: <NotFound />
      },
    ]
  }
])
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Provider store={store}>
      <SessionProvider>
        <RouterProvider router={router} />
      </SessionProvider>
    </Provider>
  </StrictMode>
);
