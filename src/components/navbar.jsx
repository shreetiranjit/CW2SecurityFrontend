// External Import
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

// React Icons
import { FaSearch, FaUserCircle, FaShoppingCart, FaHeart } from 'react-icons/fa'
import { BsFillChatFill } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'
import { CgMenuGridR } from 'react-icons/cg'

// Internal Import
import Logo from '../assets/logo.png'
import LoadingIcon from '../assets/loading.gif'
import SellerNavbar from './seller/SellerNavbar'
import { categories, subCategories } from '../data/category'
import { searchProduct } from '../redux/actions/searchActions'

const TinyNavLink = styled.span`
  color: #6c757d;
  &:hover {
    color: #50565c;
    border-bottom: 1px solid #6c757d;
  }
`
const NotificationSection = styled.p`
  background: #c9222b;
  border-radius: 50%;
  color: white;
  text-align: center;
  font-weight: 600;
  display: inline-block;
  height: 18.5px;
  width: 18.5px;
  position: relative;
  top: 14px;
  left: 7px;
  text-shadow: 1px 1px black;
`

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [windowSize, setWindowSize] = useState(window.innerWidth)
  const [scroll, setScroll] = useState(window.scrollY)
  const [searchQuery, setSearchQuery] = useState('')
  const [notifications, setNotifications] = useState(0)
  const [cartItems, setCartItems] = useState(0)
  const { user, isAuthenticated } = useSelector(state => state.Auth)
  const { Cart, Seller, Chat } = useSelector(state => state)
  const [latestSearches, setLatestSearches] = useState(JSON.parse(localStorage.getItem('latestSearch')) || [])
  const [categoryResults, setCategoryResults] = useState([])
  const navigate = useNavigate()
  const Search = useSelector(state => state.Search)

  const [productResults, setProductResults] = useState([])
  const [brandResults, setBrandResults] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (!Seller.inSellerRoute) {
      document.querySelectorAll('.nav-mobile a').forEach(item => {
        item.addEventListener('click', () => setIsNavOpen(false))
      })
    }
  }, [Seller])

  useEffect(() => {
    if (isAuthenticated) setNotifications(Chat.notifications.length)
  }, [Chat.notifications, isAuthenticated])

  useEffect(() => {
    setCartItems(Cart.products.length)
  }, [Cart.products])

  useEffect(() => {
    if (isNavOpen) {
      document.querySelector('.nav-mobile').className += ' nav-active'
      document.body.style.overflow = 'hidden'
    } else {
      document.querySelector('.nav-mobile').className = 'nav-mobile'
      document.body.style.overflow = 'auto'
    }
  }, [isNavOpen])

  useEffect(() => {
    const getWidth = () => {
      setWindowSize(window.innerWidth)
    }
    const getScroll = () => {
      setScroll(window.scrollY)
    }

    window.addEventListener('scroll', getScroll)
    window.addEventListener('resize', getWidth)

    if (windowSize > 990) {
      document.body.style.overflow = 'auto'
      setIsNavOpen(false)
    } else if (windowSize <= 990 && isNavOpen) {
      document.body.style.overflow = 'hidden'
    }

    if (scroll > 15) {
      document.querySelector('.top-nav').classList.add('top-nav-scroll')
    } else {
      document.querySelector('.top-nav').classList.remove('top-nav-scroll')
    }

    return () => {
      window.removeEventListener('resize', getWidth)
    }
  }, [windowSize, scroll, isNavOpen])

  const searchBoxFocused = () => {
    document.querySelector('.navbar-search-box').classList.add('navbar-search-box-active')
  }
  const searchBoxBlured = () => {
    setTimeout(() => {
      document.querySelector('.navbar-search-box').classList.remove('navbar-search-box-active')
    }, 200)
  }

  const userTyping = e => {
    setSearchQuery(e.target.value)
    if (e.target.value.length > 1) {
      const regex = new RegExp(escapeRegex(e.target.value), 'gi')
      const foundCategories = categories.filter(item => item.match(regex))
      setCategoryResults(foundCategories)

      dispatch(searchProduct(e.target.value))
    }
  }

  const clickBrand = item => {
    setSearchQuery(item)
    window.location.href = window.origin + `/search/${item}/${item}`
  }

  useEffect(() => {
    setBrandResults(Search.searchedBrands)
    setProductResults(Search.products)
  }, [Search.searchedBrands, Search.products])

  const search = e => {
    e.preventDefault()
    if (searchQuery.length > 2) {
      if (latestSearches.length > 4) {
        latestSearches.pop()
      }

      setLatestSearches([searchQuery, ...latestSearches])

      localStorage.setItem('latestSearch', JSON.stringify([searchQuery, ...latestSearches]))

      window.location.href = window.origin + `/search/${searchQuery}/none`
      setSearchQuery('')
      searchBoxBlured()
    }
  }

  const clearLastSearch = () => {
    setLatestSearches([])
    localStorage.setItem('latestSearch', JSON.stringify([]))
  }

  let escapeRegex = text => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

  if (!Seller.inSellerRoute) {
    return (
      <>
        <div className='navbar-section'>
          <div className='tiny-nav'>
            <div className='container'>
              <section className='tiny-nav-left'>
                <p className='text-muted'>{Seller.isAuthenticated ? 'Logged in as seller.' : 'Become a seller and grow your business.'}</p>
              </section>
              <section className='tiny-nav-right'>
                {Seller.isAuthenticated ? (
                  <Link to='/seller/home' style={{ textDecoration: 'none' }}>
                    <span style={{ fontWeight: '500' }}>Go To Your Shop</span>
                  </Link>
                ) : (
                  <>
                    {' '}
                    <Link to='/seller/register' style={{ textDecoration: 'none', marginRight: '10px' }}>
                      <TinyNavLink>Be A Seller</TinyNavLink>
                    </Link>
                    <Link to='/seller/login' style={{ textDecoration: 'none' }}>
                      <TinyNavLink>Login As Seller</TinyNavLink>
                    </Link>
                  </>
                )}
              </section>
            </div>
          </div>
          <div className='top-nav'>
            <div className='container'>
              <section className='navbar-left'>
                <Link
                  to='/'
                  style={{
                    color: 'var(--primary-color)',
                    textDecoration: 'none',
                  }}
                >
                  <img src={Logo} alt='logo' className='nav-logo' />
                  <span className='logo-text'>Shreeti Store</span>
                </Link>
              </section>
              <section className='navbar-middle'>
                <form onSubmit={e => search(e)}>
                  <input
                    type='text'
                    name='searchQuery'
                    id='search-bar'
                    aria-label={'search'}
                    value={searchQuery}
                    onChange={e => userTyping(e)}
                    onFocus={() => searchBoxFocused()}
                    onBlur={() => searchBoxBlured()}
                    placeholder='Search Product, Brand Or Category'
                    autoComplete='off'
                    className='search-bar'
                  />
                  <button className='navbar-search-icon' aria-label='search-icon'>
                    <FaSearch />
                  </button>
                </form>
                <div className='navbar-search-box'>
                  <div className='navbar-search-results'>
                    {Search.loading && <img src={LoadingIcon} alt='loading spinner' height='50' width='50' />}

                    <div className='search-results-section'>
                      <span className='header'>Products</span>
                      <p></p>
                      {productResults.map((item, index) => {
                        return (
                          <p className='latest-search-item' key={index} onClick={() => navigate(`/product/${item._id}`)}>
                            {item.title}
                          </p>
                        )
                      })}
                    </div>
                    <div className='search-results-section'>
                      <span className='header'>Brands</span>
                      <p></p>
                      {brandResults.map((item, index) => {
                        return (
                          <p className='latest-search-item' key={index} onClick={() => clickBrand(item)}>
                            {item}
                          </p>
                        )
                      })}
                    </div>
                    <div className='search-results-section'>
                      <span className='header'>Categories</span>
                      <p></p>
                      {categoryResults.map((item, indx) => {
                        return (
                          <p className='latest-search-item' key={indx}>
                            {item}
                          </p>
                        )
                      })}
                    </div>
                  </div>
                  <div className='navbar-search-box-bottom'>
                    <div className='navbar-search-box-top'>
                      <p>Latest Searches</p>
                      <span role='button' onClick={() => clearLastSearch()}>
                        Clear
                      </span>
                    </div>
                    <div className='latest-searches'>
                      {latestSearches.length < 1
                        ? "you haven't searched anything"
                        : latestSearches.map((item, indx) => {
                            return (
                              <p
                                className='latest-search-item'
                                key={indx}
                                onClick={() => (window.location.href = window.origin + `/search/${item}/none`)}
                              >
                                {item}
                              </p>
                            )
                          })}
                    </div>
                  </div>
                </div>
              </section>
              <section className='navbar-right'>
                {isAuthenticated && user !== null ? (
                  <Link to={`/user/orders`}>
                    <FaUserCircle /> Profile
                  </Link>
                ) : (
                  <Link to='/auth'>
                    <FaUserCircle /> Login
                  </Link>
                )}
                {/* <Link to='/chat'>
                  {notifications > 0 && (
                    <NotificationSection>
                      <p
                        style={{
                          display: 'inline-block',
                          position: 'absolute',
                          left: '3px',
                          top: '-5.5px',
                          padding: '2px'
                        }}
                      >
                        {notifications}
                      </p>
                    </NotificationSection>
                  )}
                  <BsFillChatFill /> Chat
                </Link> */}
                <Link to='/wishlist'>
                  <FaHeart /> Wishlist
                </Link>
                <Link to='/cart'>
                  <NotificationSection style={{ background: '#333' }}>
                    <p
                      style={{
                        display: 'inline-block',
                        position: 'absolute',
                        left: '3px',
                        top: '-5.5px',
                        padding: '2px',
                      }}
                    >
                      {cartItems > 9 ? '+9' : cartItems}
                    </p>
                  </NotificationSection>
                  <FaShoppingCart /> Shopping Cart
                </Link>
                <button className='burger-icon' aria-label='menu-button' onClick={() => setIsNavOpen(true)}>
                  {' '}
                  {notifications > 0 && (
                    <NotificationSection>
                      <p
                        style={{
                          display: 'inline-block',
                          position: 'absolute',
                          left: '3px',
                          top: '-5.5px',
                          padding: '2px',
                          fontSize: '17px',
                        }}
                      >
                        {notifications}
                      </p>
                    </NotificationSection>
                  )}
                  <GiHamburgerMenu />
                </button>
              </section>
            </div>
            <div className='container'>
              <ul className='category-list'>
                {categories.map((category, i) => {
                  return (
                    <li key={i} className='nav-category'>
                      <span onClick={() => navigate(`/category/${category}`)}>{category}</span>
                      <div className='dropdown-content'>
                        {subCategories[i] !== undefined &&
                          subCategories[i].map((sub, idx) => {
                            return (
                              <li key={idx}>
                                <Link to={`/category/${category}/${sub}`}>{sub}</Link>
                              </li>
                            )
                          })}
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className='nav-mobile'>
          <section className='nav-mobile-top'>
            <button className='burger-icon' aria-label='menu-button' onClick={() => setIsNavOpen(false)}>
              <GiHamburgerMenu />
            </button>
            <span className='mobile-logo-text'>Shreeti Store</span>
          </section>
          <section className='mobile-nav-middle'>
            <ul className='mobile-nav-links'>
              <Link to='/wishlist'>
                <li>
                  <FaHeart className='mobile-nav-icon' /> Wishlist
                </li>
              </Link>
              <Link to='/cart'>
                <li style={{ padding: '0 0 10px 5px' }}>
                  <NotificationSection style={{ background: '#333' }}>
                    <p
                      style={{
                        display: 'inline-block',
                        position: 'absolute',
                        left: '3px',
                        top: '-5.5px',
                        padding: '2px',
                      }}
                    >
                      {cartItems > 9 ? '+9' : cartItems}
                    </p>
                  </NotificationSection>
                  <FaShoppingCart className='mobile-nav-icon' /> Shopping Cart
                </li>
              </Link>
              <Link to='/categories'>
                <li>
                  <CgMenuGridR className='mobile-nav-icon' /> Categories
                </li>
              </Link>
              {isAuthenticated && user !== null ? (
                <Link to='/user/orders'>
                  <li>
                    <FaUserCircle className='mobile-nav-icon' /> Profile
                  </li>
                </Link>
              ) : (
                <Link to='/auth'>
                  <li>
                    <FaUserCircle className='mobile-nav-icon' /> Login
                  </li>
                </Link>
              )}
            </ul>
          </section>
          <section className='mobile-nav-bottom'>
            <Link
              to='/'
              style={{
                color: 'var(--primary-color)',
                textDecoration: 'none',
              }}
            >
              <img src={Logo} alt='logo' className='mobile-logo' />
              <span className='mobile-logo-text'>Shreeti Store</span>
            </Link>
          </section>
        </div>
      </>
    )
  }
  return <SellerNavbar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} windowSize={windowSize} />
}

export default Navbar
