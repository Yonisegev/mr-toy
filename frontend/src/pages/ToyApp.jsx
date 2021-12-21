import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import { Loader } from '../cmps/Loader';
import { ToyFilter } from '../cmps/ToyFilter';
import { ToyList } from '../cmps/ToyList';
import { useToggle } from '../hooks/useToggle';
import { loadToys, onRemoveToy } from '../store/actions/toyActions';

export const ToyApp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { toys } = useSelector((state) => state.toyModule);

  const [isAdd, toggleIsAdd] = useToggle();

  useEffect(() => {
    dispatch(loadToys());
  }, []);

  const handleOpenAddToy = () => {
    navigate('add');
  };

  const handleRemoveToy = (toyId) => {
    dispatch(onRemoveToy(toyId));
  };
  
  if (!toys) return <Loader />;
  return (
    <>
      <Outlet />
      <div className='toy-app'>
        <button className='add-btn' onClick={handleOpenAddToy}>
          Add Toy
        </button>
        <ToyFilter />
        {toys.length ? <ToyList toys={toys} handleRemoveToy={handleRemoveToy} /> : <div>No toys to show...</div>}
      </div>
    </>
  );
};
