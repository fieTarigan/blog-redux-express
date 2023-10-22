import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  const token = localStorage.getItem('token_login');

  if ( token === null || token === 'false') {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default ProtectedLayout