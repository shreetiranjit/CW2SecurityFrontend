// External Import
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

// Internal Import
import { FaTimes } from 'react-icons/fa';

const FullPageBackground = styled.div`
  position: fixed;
  z-index: 99999999;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;
const ModalBox = styled.div`
  background: white;
  border-radius: 3px;
  border: 1.3px solid #dbdbdb;
  width: 60%;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 70%;
  &::-webkit-scrollbar {
    width: 6px;
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
  @media (max-width: 768px) {
    width: 80%;
  }
  @media (max-width: 550px) {
    width: 90%;
  }
  @media (max-width: 430px) {
    width: 100%;
  }
`;
const ModalBoxTop = styled.div`
  padding: 3px 8px;
  border-bottom: 1.3px solid #dbdbdb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CloseButton = styled.button`
  background: none;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  transition: 0.3s;
  &:focus {
    outline: 0;
  }
  &:hover {
    background: #dedede;
  }
`;
const ModalBoxTitle = styled.h5`
  font-weight: bold;
  margin: 0;
  padding: 0;
  margin-top: 2px;
`;

const SellerDetailsModal = ({ Seller, closeModal }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('keydown', e => e.key === 'Escape' && closeModal(false));
  }, [closeModal]);

  return (
    <FullPageBackground>
      <ModalBox>
        <ModalBoxTop>
          <ModalBoxTitle>Seller Details</ModalBoxTitle>
          <CloseButton onClick={() => closeModal(false)}>
            <FaTimes />
          </CloseButton>
        </ModalBoxTop>
      </ModalBox>
    </FullPageBackground>
  );
};

export default SellerDetailsModal;
