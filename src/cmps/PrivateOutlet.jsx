import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

export const PrivateOutlet = ({ admin }) => {
  const { user } = useSelector((state) => state.userModule);
  return (admin ? user?.isAdmin : user) ? <Outlet /> : <Navigate to={'/toy'} />;
};

export const PrivateRoute = ({children,admin})=>{
  const { user } = useSelector((state) => state.userModule);
  return (admin ? user?.isAdmin : user) ? children : <Navigate to={'/toy'} />;
}