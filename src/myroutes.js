// External Import
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// User Pages Import
import AuthPage from './pages/AuthPage'
import OTPPage from './pages/OTPPage'
import NotFoundPage from './pages/NotFoundPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ForgotPasswordConfirmationPage from './pages/ForgotPasswordConfirmationPage'
import ChangePasswordPage from './pages/ChangePasswordPage'
import ProductsByCategoryPage from './pages/ProductsByCategoryPage'
import ProductsBySubCategoryPage from './pages/ProductsBySubCategoryPage'
import SearchResultsPage from './pages/SearchResultPage'
import ProductPage from './pages/ProductPage'
import WishlistPage from './pages/wishlistPage'
import CartPage from './pages/cartPage'
import ProfilePage from './pages/ProfilePage'
import ProfileSettingsPage from './pages/ProfileSettingsPage'
import HomePage from './pages/HomePage'
import CheckoutPage from './pages/CheckoutPage'
import Messenger from './pages/Messenger'
import Messaging from './pages/Messaging'

// Seller Pages Import
import SellerLoginPage from './pages/seller/SellerLoginPage'
import SellerRegistrationPage from './pages/seller/SellerRegistrationPage'
import SellerForgotPasswordRequestPage from './pages/seller/SellerForgotPasswordRequestPage'
import SellerResetPasswordPage from './pages/seller/SellerResetPasswordPage'
import AddProductPage from './pages/seller/AddProductPage'
import AllProductsPage from './pages/seller/AllProductsPage'
import ProductActionsPage from './pages/seller/ProductActionsPage'
import SellerProfilePage from './pages/seller/SellerProfilePage'
import AllOrdersPage from './pages/seller/allOrdersPage'
import CancelledOrdersPage from './pages/seller/CancelledOrdersPage'
import CancelRequestOrdersPage from './pages/seller/CancelRequestOrdersPage'

// Router Helper
import NormalRoute from './helperRoutes/NormalRoute'
import PrivateRoute from './helperRoutes/privateRoute'
import PrivateLogin from './helperRoutes/privateLogin'
import SellerChangePasswordPageRoute from './helperRoutes/sellerChangePasswordPageRoute'
import ChangePasswordRoute from './helperRoutes/changePasswordRoute'
import PasswordResetRoute from './helperRoutes/passwordResetRoutes'
import SellerRoute from './helperRoutes/sellerRoutes'

const MyRoutes = () => {
  const User = useSelector(state => state.Auth)
  const Seller = useSelector(state => state.Seller)

  return (
    <Routes>
      {/* User Public Routes Starts Here */}

      <Route exact path='' element={<NormalRoute />}>
        <Route exact path='' element={<HomePage />} />
      </Route>

      <Route exact path='/cart' element={<NormalRoute />}>
        <Route exact path='/cart' element={<CartPage />} />
      </Route>

      <Route exact path='/user' element={<NormalRoute />}>
        <Route exact path='/user' element={<ProfilePage />} />
      </Route>

      <Route exact path='/product/:id' element={<NormalRoute />}>
        <Route exact path='/product/:id' element={<ProductPage />} />
      </Route>

      <Route exact path='/verification' element={<NormalRoute />}>
        <Route exact path='/verification' element={<OTPPage />} />
      </Route>

      <Route exact path='/search/:query/:brand' element={<NormalRoute />}>
        <Route exact path='/search/:query/:brand' element={<SearchResultsPage />} />
      </Route>

      <Route exact path='/category/:category' element={<NormalRoute />}>
        <Route exact path='/category/:category' element={<ProductsByCategoryPage />} />
      </Route>

      <Route exact path='/category/:category/:subcategory' element={<NormalRoute />}>
        <Route exact path='/category/:category/:subcategory' element={<ProductsBySubCategoryPage />} />
      </Route>

      {/* User Public Routes Ends Here */}

      {/* Private Login Routes Starts Here */}

      <Route exact path='/auth' element={<PrivateLogin auth={User.isAuthenticated} />}>
        <Route exact path='/auth' element={<AuthPage />} />
      </Route>

      <Route exact path='/seller/login' element={<PrivateLogin auth={Seller.isAuthenticated} isSeller={true} />}>
        <Route exact path='/seller/login' element={<SellerLoginPage />} />
      </Route>

      <Route exact path='/seller/register' element={<PrivateLogin auth={User.isAuthenticated} isSeller={true} />}>
        <Route exact path='/seller/register' element={<SellerRegistrationPage />} />
      </Route>

      <Route exact path='/account/forgot_password' element={<PrivateLogin auth={User.isAuthenticated} />}>
        <Route exact path='/account/forgot_password' element={<ForgotPasswordPage />} />
      </Route>

      <Route exact path='/seller/forgot_password' element={<PrivateLogin auth={Seller.isAuthenticated} isSeller={true} />}>
        <Route exact path='/seller/forgot_password' element={<SellerForgotPasswordRequestPage />} />
      </Route>

      {/* Private Login Routes Ends Here */}

      {/*  User Private Routes Starts Here */}
      <Route exact path='/user/:param' element={<PrivateRoute auth={User.isAuthenticated} />}>
        <Route exact path='/user/:param' element={<ProfilePage />} />
      </Route>

      <Route exact path='/account/settings' element={<PrivateRoute auth={User.isAuthenticated} />}>
        <Route exact path='/account/settings' element={<ProfileSettingsPage />} />
      </Route>

      <Route exact path='/wishlist' element={<PrivateRoute auth={User.isAuthenticated} />}>
        <Route exact path='/wishlist' element={<WishlistPage />} />
      </Route>

      <Route exact path='/checkout' element={<PrivateRoute auth={User.isAuthenticated} />}>
        <Route exact path='/checkout' element={<CheckoutPage />} />
      </Route>

      {/* <Route exact path='/chat' element={<PrivateRoute auth={User.isAuthenticated} />}>
        <Route exact path='/chat' element={<Messenger />} />
      </Route> */}

      {/* <Route
        exact
        path='/chat/message/:roomId'
        element={<PrivateRoute auth={User.isAuthenticated} />}
      >
        <Route exact path='/chat/message/:roomId' element={<Messaging />} />
      </Route> */}
      {/*  User Private Routes Ends Here */}

      {/* Change Password Route Starts Here */}

      <Route
        exact
        path='/account/forgot_password/change_password'
        element={
          <ChangePasswordRoute
            isPasswordReset={User.forgotPassword.isPasswordReset}
            confirmationCode={User.forgotPassword.confirmationCode}
            confirmationSuccess={User.forgotPassword.confirmationCodeSuccess}
            isAuthenticated={User.isAuthenticated}
            emailOrUsername={User.forgotPassword.emailOrUsername}
          />
        }
      >
        <Route exact path='/account/forgot_password/change_password' element={<ChangePasswordPage />} />
      </Route>

      <Route
        exact
        path='/account/forgot_password/confirmation'
        element={<PasswordResetRoute auth={User.isAuthenticated} isPasswordReset={User.forgotPassword.isPasswordReset} />}
      >
        <Route exact path='/account/forgot_password/confirmation' element={<ForgotPasswordConfirmationPage />} />
      </Route>

      <Route
        exact
        path='/seller/forgot_password/reset_password/:token'
        element={<SellerChangePasswordPageRoute isResetPasswordSuccess={Seller.forgotPassword.resetPasswordError} />}
      >
        <Route exact path='/seller/forgot_password/reset_password/:token' element={<SellerResetPasswordPage />} />
      </Route>

      {/* Changes Password Routes END Here */}

      {/* Seller Routes Starts Here */}
      <Route
        exact
        path='/seller/login'
        element={
          Seller.isAuthenticated || User.isAuthenticated ? (
            Seller.isAuthenticated ? (
              <Navigate to='/seller/home' />
            ) : (
              <Navigate to='/' />
            )
          ) : (
            <SellerLoginPage />
          )
        }
      />

      <Route exact path='/seller/home' element={<SellerRoute isAuth={Seller.isAuthenticated} />}>
        <Route exact path='/seller/home' element={<AllProductsPage />} />
      </Route>

      <Route exact path='/seller/products/add' element={<SellerRoute isAuth={Seller.isAuthenticated} />}>
        <Route exact path='/seller/products/add' element={<AddProductPage />} />
      </Route>

      <Route exact path='/seller/profile' element={<SellerRoute isAuth={Seller.isAuthenticated} />}>
        <Route exact path='/seller/profile' element={<SellerProfilePage />} />
      </Route>

      <Route exact path='/seller/orders/list' element={<SellerRoute isAuth={Seller.isAuthenticated} />}>
        <Route exact path='/seller/orders/list' element={<AllOrdersPage />} />
      </Route>
      <Route exact path='/seller/orders/cancelled' element={<SellerRoute isAuth={Seller.isAuthenticated} />}>
        <Route exact path='/seller/orders/cancelled' element={<CancelledOrdersPage />} />
      </Route>
      <Route exact path='/seller/orders/cancel_request' element={<SellerRoute isAuth={Seller.isAuthenticated} />}>
        <Route exact path='/seller/orders/cancel_request' element={<CancelRequestOrdersPage />} />
      </Route>

      <Route exact path='/seller/products/actions' element={<SellerRoute isAuth={Seller.isAuthenticated} />}>
        <Route exact path='/seller/products/actions' element={<ProductActionsPage />} />
      </Route>

      <Route exact path='/seller/products/all' element={<SellerRoute isAuth={Seller.isAuthenticated} />}>
        <Route exact path='/seller/products/all' element={<AllProductsPage />} />
      </Route>

      {/* <Route exact path='/chat/seller' element={<SellerRoute isAuth={Seller.isAuthenticated} />}>
        <Route exact path='/chat/seller' element={<Messenger />} />
      </Route>

      <Route
        exact
        path='/chat/seller/message/:roomId'
        element={<SellerRoute isAuth={Seller.isAuthenticated} />}
      >
        <Route exact path='/chat/seller/message/:roomId' element={<Messaging />} />
      </Route> */}

      {/* Seller Routes Ends Here */}

      {/* Page Not Found Route */}
      <Route exact path='*' element={<NormalRoute />}>
        <Route exact path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default MyRoutes
