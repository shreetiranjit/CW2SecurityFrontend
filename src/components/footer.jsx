// External Import
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

// Internal Import
import Logo from '../assets/logo.png'

const MySection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`

const Footer = () => {
  return (
    <div className='footer'>
      <div className='container'>
        <section style={{ display: 'flex' }}>
          <img src={Logo} alt='logo' className='footer-logo' />
          <MySection>
            <span className='footer-logo-text'>Shreeti Store</span>
            <span
              style={{
                color: 'var(--text-muted)',
                marginTop: '-10px',
                fontSize: '15px',
              }}
            >
              &copy; 2022
            </span>
          </MySection>
        </section>
        <section className='footer-links'>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/auth'>Login</Link>
            </li>
            <li>
              <Link to='/seller/register'>Seller</Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default Footer
