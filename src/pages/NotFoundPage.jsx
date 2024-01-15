// External Import
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className='not-found-container'>
      <h1>404</h1>
      <h3>Page Not Found</h3>
      <Link to='/'>
        <button className='default-btn'>Go Back To Home</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
