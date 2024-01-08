// External Import
import axios from 'axios'

// Internal Import
import {
  GET_USER,
  RESET_AUTH,
  USER_LOGIN,
  LOGOUT_USER,
  LOADING,
  AUTH_ERROR,
  GET_USER_BY_USERNAME,
  SEND_FORGOT_PASSWORD_EMAIL,
  SEND_FORGOT_PASSWORD_EMAIL_ERROR,
  CANCEL_FORGOT_PASSWORD,
  CONFIRMATION_CODE_ERROR,
  CONFIRMATION_CODE_SUCCESS,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_ERROR,
  UPDATE_USER_DATA,
  USER_ADD_PROFILE_PHOTO,
  REMOVE_PROFILE_PHOTO,
  GET_USER_REVIEWS,
  USER_DELETE_REVIEW,
} from './types'
import { API_URL } from '../../keys'

// Loading
export const loading = () => dispatch => {
  dispatch({ type: LOADING })
}

// GET User Token from the local storage
const tokenConfig = () => {
  const token = localStorage.getItem('user-token')
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  if (token) config.headers['user-token'] = token
  return config
}

// Get User Data
export const getUser = () => dispatch => {
  dispatch({ type: LOADING })
  axios
    .get(`${API_URL}/user/current`, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({ type: GET_USER, payload: data })
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status,
        },
      })
    })
}

// User Login
export const userLogin = loginData => dispatch => {
  dispatch({ type: LOADING })
  axios
    .post(`${API_URL}/user/login`, loginData)
    .then(res => res.data)
    .then(data => {
      dispatch({ type: USER_LOGIN, payload: data })
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status,
        },
      })
    })
}

// Register User
export const registerUser = (registerData, navigate) => dispatch => {
  dispatch({ type: LOADING })
  axios
    .post(`${API_URL}/user/register`, registerData)
    .then(res => {
      let email = res.data.data
      alert('You have successfully registered. Please verify your email')
      navigate('/verification', { state: { email } })
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status,
        },
      })
    })
}

// Logout User
export const logoutUser = () => dispatch => {
  dispatch({ type: LOGOUT_USER })
}

// Get User Profile
export const getProfile = username => dispatch => {
  dispatch({ type: LOADING })
  axios
    .get(`${API_URL}/user/p/${username}`)
    .then(res => res.data)
    .then(data => {
      dispatch({ type: GET_USER_BY_USERNAME, payload: data })
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status,
        },
      })
    })
}

export const sendForgotPasswordEmail = emailOrUsername => dispatch => {
  dispatch({ type: LOADING })

  axios
    .post(`${API_URL}/user/sendEmail`, { emailOrUsername })
    .then(res => res.data)
    .then(data => {
      dispatch({
        type: SEND_FORGOT_PASSWORD_EMAIL,
        payload: { emailOrUsername },
      })
    })
    .catch(err => {
      dispatch({ type: SEND_FORGOT_PASSWORD_EMAIL_ERROR })
    })
}

export const cancelForgotPassword = () => {
  return { type: CANCEL_FORGOT_PASSWORD }
}

export const confirmPasswordResetCode =
  (resetCode, isImportant = false) =>
  dispatch => {
    dispatch({ type: LOADING })
    axios
      .post(`${API_URL}/usercheckPasswordResetCode`, {
        usernameOrEmail: localStorage.getItem('emailOrUsername'),
        userToken: resetCode,
      })
      .then(res => res.data)
      .then(data => {
        dispatch({
          type: CONFIRMATION_CODE_SUCCESS,
          payload: { confirmationCode: resetCode },
        })
      })
      .catch(err => {
        if (isImportant) {
          return dispatch({ type: CANCEL_FORGOT_PASSWORD })
        }
        dispatch({ type: CONFIRMATION_CODE_ERROR })
      })
  }

export const changePassword = (emailOrUsername, confirmationCode, newPassword, confirmPassword) => dispatch => {
  axios
    .post(
      `${API_URL}/user/newPassword`,
      { emailOrUsername, newPassword, confirmPassword },
      { headers: { 'password-token': confirmationCode } }
    )
    .then(() => {
      dispatch({ type: CHANGE_PASSWORD })
    })
    .catch(err => dispatch({ type: CHANGE_PASSWORD_ERROR }))
}

// Update User Data
export const updateUserData =
  ({ username, email }) =>
  dispatch => {
    dispatch({ type: LOADING })
    axios
      .put(`${API_URL}/user/update`, { username, email }, tokenConfig())
      .then(res => res.data)
      .then(data => {
        dispatch({ type: UPDATE_USER_DATA, payload: data })
      })
      .catch(err => {
        dispatch({
          type: AUTH_ERROR,
          payload: {
            msg: err.response.data.errorMessage,
            status: err.response.status,
          },
        })
      })
  }

// Add User Profile Photo
export const addProfilePhoto = formData => dispatch => {
  dispatch({ type: LOADING })

  axios
    .put(`${API_URL}/user/updatePhoto`, formData, {
      headers: {
        'user-token': localStorage.getItem('user-token'),
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => res.data)
    .then(data => {
      dispatch({ type: USER_ADD_PROFILE_PHOTO, payload: data })
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status,
        },
      })
    })
}

// Remove User Profile Photo
export const removeProfilePhoto = () => dispatch => {
  dispatch({ type: LOADING })

  axios
    .delete(`${API_URL}/user/profilePhoto`, tokenConfig())
    .then(res => res.data)
    .then(data => dispatch({ type: REMOVE_PROFILE_PHOTO, payload: data }))
    .catch(err => {
      dispatch({
        type: AUTH_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status,
        },
      })
    })
}

// Get All the Product Review of the particular user
export const getUserReviews = () => dispatch => {
  dispatch({ type: LOADING })

  axios
    .get(`${API_URL}/review/user/reviews`, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({ type: GET_USER_REVIEWS, payload: data })
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR,
        payload: {
          msg: err.response.data.errorMessage,
          status: err.response.status,
        },
      })
    })
}

// Delete the User Review of the Current User
export const deleteReview = id => dispatch => {
  dispatch({ type: LOADING })

  axios
    .delete(`${API_URL}/review/${id}`, tokenConfig())
    .then(res => res.data)
    .then(data => {
      dispatch({ type: USER_DELETE_REVIEW, payload: id })
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR,
        payload: {
          message: err.response.data.errorMessage,
          status: err.response.status,
        },
      })
    })
}

export const resetAuth = () => ({
  type: RESET_AUTH,
})
