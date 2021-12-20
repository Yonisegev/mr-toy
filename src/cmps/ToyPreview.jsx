import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { onRemoveToy } from '../store/actions/toyActions';
import { Modal } from './Modal';
import { ReviewAdd } from './ReviewAdd';
import { ReviewList } from './ReviewList';

export const ToyPreview = ({ toy }) => {
  const dispatch = useDispatch();

  const handleRemoveToy = (ev) => {
    ev.stopPropagation();
    dispatch(onRemoveToy(toy._id));
  };

  return (
    <section className='toy-preview'>
      <h1 className='toy-name'>{toy.name}</h1>
      <h1 className='toy-price'>Price: ${toy.price}</h1>
      {!toy.inStock && <div className='sold-out-label'>Sold Out!</div>}
      <div className='btns'>
        <Link to={`/toy/${toy._id}`}>
          <button className='btn details-btn'>
            <span className='fas fa-info-circle'></span>
          </button>
        </Link>

        {/* {user && user.isAdmin && ( */}
        <Link to={`/toy/edit/${toy._id}`}>
          <button className='btn edit-btn'>
            <span className='fas fa-edit'></span>
          </button>
        </Link>
        {/* )} */}

        {/* {user && user.isAdmin && ( */}
        <button className='btn remove-btn' onClick={handleRemoveToy}>
          <span className='fas fa-trash'></span>
        </button>
        {/* )} */}
      </div>
    </section>
  );
};

