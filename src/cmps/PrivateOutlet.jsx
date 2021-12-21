import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import { useEffect } from 'react/cjs/react.development';
import { useAuth } from '../hooks/useAuth';

export const PrivateOutlet = ({ admin }) => {
  const auth = useAuth({ admin });
  return auth ? <Outlet /> : <Navigate to={'/toy'} />;
};

export const PrivateRoute = ({ children, admin }) => {
  const auth = useAuth({ admin });

  return auth ? children : <Navigate to={'/toy'} />;
};
