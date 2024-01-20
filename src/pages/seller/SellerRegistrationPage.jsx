// External Import
import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { sellerRegister } from '../../redux/actions/sellerActions'
import { Link, useNavigate } from 'react-router-dom'

// Internal Import
import { categories } from '../../data/category'
import { countries } from '../../data/countries'

const PageHeader = styled.h1`
  font-weight: 300;
  text-align: center;
`
const BrandName = styled.h1`
  font-weight: 300;
  font-size: 42px;
`

const Muted = styled.span`
  color: var(--text-muted);
`
const Labels = styled.label`
  font-weight: 500;
`
const InputField = styled.input`
  padding: 4px 12px;
  border-radius: 3px;
  background: #efefef;
  border: 1px solid #c2c2c2;
  width: 90%;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`
const TextField = styled.textarea`
  padding: 4px 12px;
  border-radius: 3px;
  background: #efefef;
  border: 1px solid #c2c2c2;
`
const Select = styled.select`
  padding: 4px 5px;
  border-radius: 3px;
  background: #efefef;
  border: 1px solid #c2c2c2;
  width: 90%;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`
const Colorful = styled.span`
  color: #346eeb;
  font-weight: 500;
  cursor: pointer;
`

const RegisterPage = () => {
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [category, setCategory] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [location, setLocation] = useState('')
  const [links, setLinks] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const Seller = useSelector(state => state.Seller)
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    const splittedLinks = links.split(' ')
    dispatch(
      sellerRegister({
        fullname,
        email,
        country,
        phoneNumber,
        category,
        companyName,
        location,
        links: splittedLinks,
        password,
      })
    )
    navigate('/seller/home')
  }

  return (
    <div>
      <PageHeader>Register As Seller</PageHeader>
      <hr />
      <div className='row'>
        <div className='col-md-8'>
          <p style={{ marginTop: '-10px' }}>Become a seller in Shreeti Store</p>
          <form onSubmit={e => handleSubmit(e)}>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-section'>
                  <Labels htmlFor='fullname'>Fullname</Labels>
                  <InputField
                    type='text'
                    name='fullname'
                    id='fullname'
                    aria-label='fullname'
                    placeholder='fullname'
                    value={fullname}
                    onChange={e => setFullname(e.target.value)}
                    required
                  />
                </div>
                <div className='form-section'>
                  <Labels htmlFor='email'>Email</Labels>
                  <InputField
                    type='email'
                    name='email'
                    id='email'
                    aria-label='email'
                    placeholder='Email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className='form-section'>
                  <Labels htmlFor='country'>Country</Labels>
                  <Select name='country' id='country' onChange={e => setCountry(e.target.value)} required>
                    <option value=''>Select Your Country</option>
                    {countries.map((item, idx) => {
                      return <option value={item.code} key={idx}>{`${item.code} - ${item.name}`}</option>
                    })}
                  </Select>
                </div>
                <div className='form-section'>
                  <Labels htmlFor='category'>Category</Labels>
                  <Select name='category' id='category' onChange={e => setCategory(e.target.value)} required>
                    <option value=''>Select Category</option>
                    {categories.map((item, idx) => {
                      return (
                        <option value={item} key={idx}>
                          {item}
                        </option>
                      )
                    })}
                  </Select>
                  <div className='form-text'>Select your main category</div>
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-section'>
                  <Labels htmlFor='phonenumber'>Phone Number</Labels>
                  <InputField
                    type='text'
                    name='phonenumber'
                    id='phonenumber'
                    aria-label='phonenumber'
                    placeholder='Phone Number'
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    required
                  />
                  <div className='form-text'>Enter company phone number</div>
                </div>
                <div className='form-section'>
                  <Labels htmlFor='companyName'>Company Name</Labels>
                  <InputField
                    type='text'
                    name='companyName'
                    id='companyName'
                    aria-label='company name'
                    placeholder='Company Name'
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    required
                  />
                </div>
                <div className='form-section'>
                  <Labels htmlFor='location'>Location</Labels>
                  <InputField
                    type='text'
                    name='location'
                    id='location'
                    aria-label='location'
                    placeholder='Location'
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    required
                  />

                  <div className='form-text'>Enter headquarters of your company</div>
                </div>
              </div>
            </div>
            <Labels htmlFor='links' className='mt-4'>
              Enter The Links Of Your Shop If You Have
            </Labels>
            <div className='form-section'>
              <TextField
                name='links'
                id='links'
                cols='10'
                rows='5'
                style={{ color: '#0d6efd', textDecoration: 'underline' }}
                placeholder='Separate links with space'
                onChange={e => setLinks(e.target.value)}
              >
                {links}
              </TextField>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-section'>
                  <Labels htmlFor='password'>Password</Labels>
                  <InputField
                    type='password'
                    name='password'
                    id='password'
                    value={password}
                    placeholder='Password'
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button className='default-btn seller' disabled={Seller.loading ? true : false}>
                  {Seller.loading ? 'Loading...' : 'Register As Seller'}
                </button>
                <p className='mt-2'>
                  Already a seller?{' '}
                  <Link to='/seller/login'>
                    <Colorful style={{ textDecoration: 'underline' }}>Login as seller</Colorful>
                  </Link>
                </p>
              </div>
              {Seller.error.message !== null && (
                <span className='text-danger'>{Seller.error.message !== 'Login To See The Content.' && Seller.error.message}</span>
              )}
            </div>
          </form>
        </div>
        <div className='col-md-4 register-page-col'>
          <img
            src={
              'https://st2.depositphotos.com/42965482/42603/v/380/depositphotos_426030372-stock-illustration-user-rating-feedback-customer-reviews.jpg?forcejpeg=true'
            }
            alt='online shopping'
            style={{ width: '100%' }}
          />
          <section style={{ textAlign: 'center' }}>
            <BrandName>Shreeti Store</BrandName>
            <Muted>Shreeti Store 2022</Muted>
          </section>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
