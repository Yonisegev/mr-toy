import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Loader } from '../cmps/Loader';
import { ToyAdd } from '../cmps/ToyAdd';
import { ToyList } from '../cmps/ToyList';
import { useToggle } from '../hooks/useToggle';
import { loadToys } from '../store/actions/toyActions';

export const ToyApp = () => {
  const dispatch = useDispatch();
  const { toys } = useSelector((state) => state.toyModule);
  const [isAdd, toggleIsAdd] = useToggle();

  useEffect(() => {
    dispatch(loadToys());
  }, []);

  const onToggleAdd = useCallback(() => {
    toggleIsAdd();
  }, [toggleIsAdd]);

  const onAddToy = useCallback(() => {

  },[])

  if (!toys) return <Loader />;
  return (
    <div className='toy-app'>
      {isAdd && <ToyAdd onAddToy={onAddToy} onToggleAdd={onToggleAdd} />}
      {!isAdd && <button className='add-btn' onClick={onToggleAdd}></button>}
      {toys.length ? <ToyList toys={toys} /> : <div>No toys to show...</div>}
    </div>
  );
};
