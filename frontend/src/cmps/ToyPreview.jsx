import React from 'react';
import { Link } from 'react-router-dom';
export const ToyPreview = ({ toy, handleRemoveToy }) => {
  const onRemoveToy = ev => {
    ev.stopPropagation();
    handleRemoveToy(toy._id);
  };
  return (
    <section className='toy-preview'>
      <h1 className='toy-name'>{toy.name}</h1>
      <img className="toy-img" src={`https://robohash.org/${toy._id}`} alt='toy' />
      <h1 className='toy-price'>Price: ${toy.price}</h1>
      {!toy.inStock && <div className='sold-out-label'>Sold Out!</div>}
      <div className='btns'>
        <Link to={`/toy/${toy._id}`}>
          <button className='btn details-btn'>
            <span className='fas fa-info-circle'></span>
          </button>
        </Link>

        <Link to={`/toy/edit/${toy._id}`}>
          <button className='btn edit-btn'>
            <span className='fas fa-edit'></span>
          </button>
        </Link>
        <button className='btn remove-btn' onClick={onRemoveToy}>
          <span className='fas fa-trash'></span>
        </button>
      </div>
    </section>
  );
};
