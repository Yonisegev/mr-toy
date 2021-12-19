import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

export const PrivateOutlet = ({ children, admin }) => {
  const { user } = useSelector((state) => state.userModule);
  return (admin ? user?.isAdmin : user) ? <Outlet /> : <Navigate to={'/toy'} />;
};
