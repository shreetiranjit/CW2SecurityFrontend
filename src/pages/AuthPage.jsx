// External Import
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { resetAuth } from '../redux/actions/authActions'

// Internal Import
import Logo from '../assets/logo.png'
import { userLogin, registerUser } from '../redux/actions/authActions'

const BrandName = styled.h1`
  font-weight: 300;
  font-size: 42px;
`

const Muted = styled.span`
  color: var(--text-muted);
`

const Colorful = styled.span`
  color: #346eeb;
  font-weight: 500;
  cursor: pointer;
`

const AuthPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [isLogin, setIsLogin] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [emailOrUsername, setEmailOrUsername] = useState('')
  const Auth = useSelector(state => state.Auth)
  const Cart = useSelector(state => state.Cart)
  const dispatch = useDispatch()

  useEffect(() => {
    // Check if location exists and if it does, set isLogin to true
    if (location.state && location.state.isLogin) {
      setIsLogin(true)
      dispatch(resetAuth())
    } else {
      setIsLogin(false)
      dispatch(resetAuth())
    }
  }, [location.state])

  useEffect(() => {
    if (password.length >= 6) {
      setBtnDisabled(false)
      if (Auth.loading) {
        setBtnDisabled(true)
      } else {
        setBtnDisabled(false)
      }
    } else {
      setBtnDisabled(true)
    }
  }, [password, Auth])

  const handleSubmit = e => {
    e.preventDefault()
  }

  return (
    <div className='row auth'>
      <div className='col-sm-6 forms'>
        <section>
          <h2>{isLogin ? 'Login' : 'Register'}</h2>
          {console.log('Auth', Auth.isLoading)}
          {Auth.forgotPassword.changePasswordSuccess && (
            <span className='text-success' style={{ fontSize: '15px' }}>
              Successfully changed the password. Now <br /> you can login with your new password.
            </span>
          )}
          {Auth.error.msg !== null && (
            <span className='text-danger'>{Auth.error.msg !== 'Login To See The Content.' && Auth.error.msg}</span>
          )}
          <form onSubmit={e => handleSubmit(e)}>
            {isLogin && (
              <div className='form-section'>
                <label htmlFor='emailOrUsername'>Email Or Username</label>
                <input
                  type='text'
                  name='emailOrUsername'
                  placeholder='Email Or Username'
                  id='emailorUsername'
                  value={emailOrUsername}
                  onChange={e => setEmailOrUsername(e.target.value)}
                />
              </div>
            )}
            {!isLogin && (
              <div className='form-section'>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' placeholder='Email' id='email' value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            )}
            {!isLogin && (
              <div className='form-section'>
                <label htmlFor='username'>Username</label>
                <input
                  type='text'
                  name='username'
                  placeholder='Username'
                  id='username'
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
            )}
            <div className='form-section'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                placeholder='Password'
                id='password'
                minLength='6'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              {!isLogin && <div className='form-text'>Password Must Be At Least 6 Characters</div>}
            </div>
            {isLogin &&
              (Auth.forgotPassword.confirmationCode || Auth.forgotPassword.confirmationCodeSuccess ? (
                <Link to={'/account/forgot_password/change_password'}>
                  <Colorful>Forgot Password ?</Colorful>
                </Link>
              ) : (
                <Link to={Auth.forgotPassword.isPasswordReset ? '/account/forgot_password/confirmation' : '/account/forgot_password'}>
                  <Colorful>Forgot Password ?</Colorful>
                </Link>
              ))}
            <div className='form-section mt-2'>
              <button
                className='default-btn'
                disabled={btnDisabled}
                onClick={() => {
                  isLogin
                    ? dispatch(
                        userLogin({
                          emailOrUsername,
                          password,
                          Products: Cart.products,
                        })
                      )
                    : dispatch(
                        registerUser(
                          {
                            email,
                            username,
                            password,
                            // Products: Cart.products
                          },
                          navigate
                        )
                      )
                  
                }}
              >
                {console.log('Auth.Login', Auth.loading)}
                {Auth.loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
              </button>
            </div>
          </form>
          {isLogin ? (
            <span>
              Don't Have An Account ? <Colorful onClick={() => setIsLogin(false)}>Register</Colorful>
            </span>
          ) : (
            <span>
              Already Have An Account ? <Colorful onClick={() => setIsLogin(true)}>Login</Colorful>
            </span>
          )}
        </section>
      </div>
      <div className='col-sm-6 auth-second-col'>
        <section>
          <img src={Logo} alt='logo' className='auth-logo' />
          <BrandName>Shreeti Store</BrandName>
          <Muted>Shreeti Store</Muted>
        </section>
      </div>
    </div>
  )
}

export default AuthPage
