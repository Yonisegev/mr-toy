import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../hooks/useForm.js';
import { reviewService } from '../services/reviewService.js';
import { StarRating } from './StarRating.jsx';

export const ReviewAdd = ({ toy, onAdd }) => {
  const { user } = useSelector(state => state.userModule);

  const INITIAL_REVIEW = {
    ...reviewService.getEmptyReview(),
    userId: user._id,
    username: user.fullname,
    toyId: toy._id,
    toyName: toy.name,
  }

  const { formState, setFormState, register } = useForm(INITIAL_REVIEW);
  const [isAdd, setIsAdd] = useState(false);

  const resetForm = () => {
    setFormState(INITIAL_REVIEW);
  };

  const saveReview = async ev => {
    ev.preventDefault();
    const review = formState;
    await reviewService.add(review);
    resetForm();
    onAdd();
    onToggleAddReview();
  };

  const onSaveRate = rate => {
    setFormState(prev => ({ ...prev, rate }));
  };

  const onToggleAddReview = () => {
    setIsAdd(!isAdd);
  };
  return (
    <section className='review-add'>
      {!isAdd && (
        <>
          <h1> Add review : </h1>
          {user && (
            <div className='add-btn' onClick={onToggleAddReview}>
              {' '}
              +{' '}
            </div>
          )}
          {!user && <div>Please log in to add a review </div>}
        </>
      )}
      {isAdd && (
        <>
          <button className='form-btn' onClick={onToggleAddReview}>
            Back
          </button>
          <form className='' onSubmit={saveReview}>
            <label>
              Full Name :
              <input
                type='text'
                placeholder='Enter Full Name'
                {...register('username')}
              />
            </label>

            <label>
              Rate this book :
              <StarRating rate={formState.rate} onSaveRate={onSaveRate} />
            </label>

            <label>
              Read at :
              <input type='date' {...register('addedAt')} />
            </label>

            <label>
              Your Review :
              <textarea
                placeholder='Enter your review here'
                {...register('txt')}
              />
            </label>

            <button className='form-btn' type='submit'>
              Add Review
            </button>
          </form>
        </>
      )}
    </section>
  );
};
