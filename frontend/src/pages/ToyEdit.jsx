import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { toyService } from '../services/toyService';
import { useForm } from '../hooks/useForm.js';
import { onUpdateToy, onRemoveToy } from '../store/actions/toyActions.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader } from '../cmps/Loader';
import { Modal } from '../cmps/Modal';
import { useToggle } from '../hooks/useToggle';

const EMPTY_TOY = {
  name: '',
  price: '',
  labels: [],
};

export const ToyEdit = () => {
  const { toyId } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const { formState, setFormState, register, resetForm } = useForm(EMPTY_TOY);
  const [isLoading, setIsLoading] = useToggle(true);

  useEffect(() => {
    loadToy();
  }, []);

  const loadToy = async () => {
    try {
      const toy = await toyService.getToyById(toyId);
      if (!toy) return navigate('/toy');
      setFormState(toy);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      // TODO: handle error
    }
  };

  const handleRemoveToy = ev => {
    ev.stopPropagation();
    dispatch(onRemoveToy(formState._id));
  };

  const handleUpdateToy = ev => {
    ev.preventDefault();
    const { valid, message } = toyService.toyValidator(formState);
    if (!valid) {
      setErrorMessage(message);
      return;
    }
    resetForm();
    dispatch(onUpdateToy(formState));
    navigate('/toy');
  };

  const handleGoBack = () => {
    navigate('/toy');
  };

  if (isLoading) return <Loader />;
  return (
    <Modal center onClose={handleGoBack}>
      <div className='toy-details toy-edit flex column'>
        {errorMessage && (
          <div className='error-message'>Error: {errorMessage}</div>
        )}
        <form>
          <h2>
            Name :
            <input {...register('name')} type='text' />
          </h2>

          <h3>
            Price : $
            <input {...register('price')} type='number' />
          </h3>

          <div className='flex align-center'>
            <label htmlFor='in-stock'>Available:</label>
            <input id='in-stock' type='checkbox' {...register('inStock')} />
          </div>

          {Boolean(formState.labels?.length) && (
            <h3>Categories : {formState.labels.join(' | ')} </h3>
          )}

          <div className='details-btns'>
            <button className='save-btn' onClick={handleUpdateToy}>
              <span className='fas fa-save'></span>
            </button>

            <Link to={`/toy/${formState._id}`}>
              <button className='btn edit-btn'>
                <span className='fas fa-info-circle'></span>
              </button>
            </Link>

            <button
              className='btn remove-btn'
              alt='Return to list'
              onClick={handleRemoveToy}
            >
              <span className='fas fa-trash'></span>
            </button>

            <button className='btn back-btn' onClick={handleGoBack}>
              <span className='fas fa-th-large'></span>
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
