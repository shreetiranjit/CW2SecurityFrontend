// External Import
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

// Internal Import
import Logo from '../assets/logo.png'
import OnlyLoggedInUsers from '../components/HomePageLoggedInUsersOnly'
import HomePageSection from '../components/HomePageSection'

const LoginSection = styled.div`
  background: white;
  border-radius: 16px;
  display: flex;
  margin: auto;
  justify-content: space-between;
  width: 50%;
  align-items: center;
  padding: 8px 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  @media (max-width: 912px) {
    width: 60%;
  }
  @media (max-width: 768px) {
    width: 75%;
  }
  @media (max-width: 720px) {
    padding: 4px 12px;
  }
  @media (max-width: 560px) {
    width: 85%;
  }
  @media (max-width: 560px) {
    width: 100%;
  }
  @media (max-width: 430px) {
    padding: 8px 8px;
  }
`
const LogoImage = styled.img`
  @media (max-width: 430px) {
    width: 65px;
    height: 65px;
  }
  @media (max-width: 340px) {
    width: 60px;
    height: 60px;
    margin-top: -5px;
  }
`
const LoginText = styled.h4`
  font-weight: bolder;
  text-align: center;

  @media (max-width: 400px) {
    font-size: 18px;
  }
  @media (max-width: 340px) {
    font-size: 17px;
  }
`
const LoginButton = styled.button`
  width: 25%;
  border-radius: 22px;

  &:focus {
    outline: 0;
  }

  @media (max-width: 376px) {
    width: 20%;
  }
`

const HomePage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector(state => state.Auth)

  return (
    <div>
      {isAuthenticated ? (
        <OnlyLoggedInUsers />
      ) : (
        <LoginSection>
          <div>
            <LogoImage src={Logo} alt='logo' height='80' />
          </div>
          <div>
            <LoginText>Login To See More</LoginText>
            <p style={{ margin: '0', marginTop: '-5px', fontSize: '15px' }}>Shreeti Store</p>
            <p
              style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                marginTop: '-5px',
              }}
            >
              Shreeti Store
            </p>
          </div>
          <LoginButton className='default-btn' style={{ width: '25%' }} onClick={() => navigate('/auth')}>
            Login
          </LoginButton>
        </LoginSection>
      )}
      <HomePageSection />
    </div>
  )
}

export default HomePage
