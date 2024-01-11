// External Import
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../keys'

// Internal Import
import Logo from '../assets/logo.png'

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

const OTPPage = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [otp, setOTP] = useState('')
  const emailFromState = location.state && location.state.email
  const handleSubmit = e => {
    e.preventDefault()
  }
  const verifyOtp = otp => {
    axios
      .post(`${API_URL}/user/verifyUser`, { otp: otp, email: emailFromState })
      .then(res => res.data)
      .then(data => {
        if (data.success) {
          navigate('/auth', { state: { isLogin: true } })
        } else {
          console.log('Verification failed.')
        }
      })
      .catch(err => {
        console.log('err', err)
      })
  }
  return (
    <div className='row auth'>
      <div className='col-sm-6 forms'>
        <section>
          <h2>OTP Verification</h2>
          <form onSubmit={e => handleSubmit(e)}>
            <div className='form-section'>
              <p htmlFor='email'>Please enter the verification code that was sent to your mail.</p>
              <input type='otp' name='otp' placeholder='' id='otp' value={otp} onChange={e => setOTP(e.target.value)} />
            </div>
            <div className='form-section mt-2'>
              <button
                className='default-btn'
                onClick={() => {
                  verifyOtp(otp)
                }}
              >
                Confirm
              </button>
            </div>
          </form>
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

export default OTPPage
