// External Import
import React from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

// Internal Import
import {
  MdLocalShipping,
  MdComment,
  MdLocationOn,
  MdKeyboardArrowRight,
  MdStar
} from 'react-icons/md';

const NavbarItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: var(--text-muted);
  transition: 0.2s;
  cursor: pointer;
  padding: 0;
  margin: 0;
  margin-left: 10px;
  user-select: none;

  &:hover {
    color: black;
    box-shadow: inset 0px -1.3px 0px var(--text-muted);
  }
`;

const NavLinks = [
  {
    name: 'Orders',
    icon: <MdLocalShipping />,
    pushTo: '/orders',
    val: 'orders'
  },
  { name: 'Reviews', icon: <MdComment />, pushTo: '/reviews' },
  { name: 'Rated Sellers', icon: <MdStar />, pushTo: '/ratedsellers' },
  { name: 'Addresses', icon: <MdLocationOn />, pushTo: '/addresses' }
];

const ProfilePageNavbar = () => {
  const navigate = useNavigate();
  const { param } = useParams();

  const changePage = pushTo => {
    navigate('/user' + pushTo);
  };

  return (
    <div className='profile-nav-wrapper'>
      <ul style={{ padding: '0', margin: '0' }}>
        {NavLinks.map((navLink, index) => {
          return (
            <NavbarItem
              key={index}
              onClick={() => changePage(navLink.pushTo)}
              className={`mt-3 ${
                param === navLink.name.toLowerCase().split(' ').join('') && 'profile-nav-active'
              }`}
            >
              <span className='profile-nav-icon'>{navLink.icon}</span>
              <span>{navLink.name}</span>
              <span className='profile-nav-arrow-right'>
                <MdKeyboardArrowRight />
              </span>
            </NavbarItem>
          );
        })}
      </ul>
    </div>
  );
};

export default ProfilePageNavbar;
