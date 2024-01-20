// External Import
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdSettings } from 'react-icons/md';
import { BiLogOut } from 'react-icons/bi';
import moment from 'moment';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Actions Import
import { logoutUser, getUserReviews } from '../redux/actions/authActions';
import { getRatedSellersForUser } from '../redux/actions/sellerRatingActions';
import { getOrders } from '../redux/actions/orderActions';

// Internal Import
import noPicture from '../assets/noProfilePic.jpg';
import LoadingIcon from '../assets/loading.gif';

// Components Import
import MessageBox from '../components/messageBox';
import ProfilePageNavbar from '../components/profilePageNavbar';
import ProfilePageReviewsSection from '../components/profilePageReviewsSection';
import ProfilePageAddressSection from '../components/profilePageAddress';
import ProfilePageOrderSection from '../components/profilePageOrderSection';
import ProfilePageRatedSellersSection from '../components/profilePageRatedSellersSection';

const TextMuted = styled.p`
  color: var(--text-muted);
  margin-top: -10px;
`;
const ProfileSection = styled.section`
  display: flex;
  align-items: center;
`;
const NavbarItemContainer = styled.div`
  background: white;
  width: 100%;
  min-height: 230px;
  border: 1px solid #dedede;
  border-radius: 3px;
  padding: 10px 15px;
  position: relative;
  overflow: hidden;
  overflow-y: auto;
  max-height: 500px;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: #dddddd;
  }
  &::-webkit-scrollbar-thumb {
    background: #acaaaa;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #c2c2c2;
  }
`;

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, profile, loading, error } = useSelector(state => state.Auth);
  const { param } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHeader, setModalHeader] = useState('');
  const [btnText, setBtnText] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getUserReviews());
    dispatch(getRatedSellersForUser());
  }, []);

  useEffect(() => {
    if (!param) {
      navigate('/user/orders');
    }
  }, [param]);

  useEffect(() => {
    if (isModalOpen) {
      document.querySelector('body').style.overflow = 'hidden';
    } else {
      document.querySelector('body').style.overflow = 'auto';
    }
  }, [isModalOpen]);

  const clickLogout = () => {
    setMessage('Do You Want To Logout?');
    setIsModalOpen(true);
    setModalHeader('Logout ?');
    setBtnText('Logout');
  };

  if (error.msg !== null && error.msg === 'User Not Found') {
    return (
      <div>
        <h1 className='text-danger'>{error.msg}</h1>
      </div>
    );
  }
  if (
    error.msg !== null &&
    error.msg !== 'User Not Found' &&
    error.msg !== 'Login To See The Content.'
  ) {
    return (
      <div>
        <h1 className='text-danger'>Reload The Page</h1>
      </div>
    );
  }
  if (!loading) {
    return (
      <div>
        {isModalOpen && (
          <MessageBox
            action={logoutUser}
            message={message}
            header={modalHeader}
            setIsModalOpen={setIsModalOpen}
            btnText={btnText}
            isModalOpen={isModalOpen}
            isRedux={true}
          />
        )}
        {user !== null && (
          <>
            <section className='profile-section'>
              <div className='profile-pic-section'>
                <img
                  src={user.hasPhoto ? user.profilePhoto.url : noPicture}
                  alt='profile'
                  className='profile-picture'
                />
              </div>
              <div className='profile-body'>
                <section>
                  <ProfileSection>
                    <h3 className='profile-username'>{user.username}</h3>
                    {user !== null && user._id === user._id && (
                      <button className='default-btn' onClick={() => clickLogout()}>
                        <BiLogOut /> Logout
                      </button>
                    )}
                  </ProfileSection>
                  <TextMuted>Member since: {moment(user.createdAt).format('ll')}</TextMuted>
                </section>
                {user !== null && user._id === user._id && (
                  <Link to='/account/settings'>
                    <button className='default-btn settings-btn'>
                      <MdSettings />
                      Settings
                    </button>
                  </Link>
                )}
              </div>
            </section>
            <div className='profile-center mt-5'>
              <div className='row'>
                <div className='col-md-2'>
                  <ProfilePageNavbar />
                </div>
                <div className='col-md-10'>
                  <NavbarItemContainer className={isEmpty ? 'navbar-item-container-empty' : ''}>
                    {param === 'orders' && (
                      <ProfilePageOrderSection setIsEmpty={setIsEmpty} isEmpty={isEmpty} />
                    )}
                    {param === 'addresses' && (
                      <ProfilePageAddressSection setIsEmpty={setIsEmpty} isEmpty={isEmpty} />
                    )}
                    {param === 'reviews' && (
                      <ProfilePageReviewsSection setIsEmpty={setIsEmpty} isEmpty={isEmpty} />
                    )}
                    {param === 'ratedsellers' && (
                      <ProfilePageRatedSellersSection setIsEmpty={setIsEmpty} isEmpty={isEmpty} />
                    )}
                  </NavbarItemContainer>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  } else {
    return (
      <div style={{ display: 'block', margin: 'auto', textAlign: 'center' }}>
        {loading && (
          <>
            <img src={LoadingIcon} alt='loading gif' height='100' width='100' />
            <h2 style={{ fontWeight: 'lighter' }}>Loading...</h2>
          </>
        )}
      </div>
    );
  }
};

export default ProfilePage;
