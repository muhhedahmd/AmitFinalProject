import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import SingleProduct from './SingleProduct';
import { PATHS } from './PATHS';
import Login from './Login/index'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import { useAuth } from './Contexts/Authenticated';
import ProtectedRoute from './ProtectedRoute';
import SingleCatagory from './SingleCatagory';

const UseRouter = () => {
  const { isAuthenticated } = useAuth();
  const routes = useRoutes([
    { path: PATHS.Login, element: isAuthenticated ? <Navigate to={PATHS.home} /> : <Login /> },
    {
      path: PATHS.home,
      element: isAuthenticated ? <ProtectedRoute /> : <Navigate  to={PATHS.Login} />,
      children: [
        { index: true, element: <Home /> },
        { path: PATHS.cart, element: <Cart /> },
        { path: `${PATHS.SingleProduct}/:id`, element: <SingleProduct /> },
        { path: `${PATHS.SingleCatagory}/:id`, element: <SingleCatagory /> },
      ]
    },
    { path: "*", element: <h2>Page not found</h2> }
  ]);

  return routes ;
}

export default UseRouter;
