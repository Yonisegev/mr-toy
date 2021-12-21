import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { showErrorMsg } from '../services/eventBusService';

export function useAuth({ admin } = {}) {
  const { user } = useSelector((state) => state.userModule);
  const auth = admin ? user?.isAdmin : user;

  useEffect(() => {
    if (!auth) {
      showErrorMsg({ txt: 'You must be logged in to view this content' });
    }
  }, []);

  return admin ? user?.isAdmin : Boolean(user);
}
