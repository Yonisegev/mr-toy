import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Select from 'react-select';
import { useForm } from '../hooks/useForm.js';
import { toyService } from '../services/toyService.js';
import { onAddToy } from '../store/actions/toyActions.js';
import { Loader } from './Loader.jsx';
import { Modal } from './Modal.jsx';

const EMPTY_TOY = toyService.getEmptyToy();
export const ToyAdd = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //local
  const { formState, setFormState, register, resetForm } = useForm(EMPTY_TOY);
  const [labelOptions, setLabelOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadLabels();
  }, []);

  const loadLabels = async () => {
    const labels = await toyService.getLabels();
    const labelOptions = labels.map(toyLabel => ({
      value: toyLabel,
      label: toyLabel,
    }));
    setLabelOptions(labelOptions);
  };

  const handleSelectChange = selectedOptions => {
    if (selectedOptions.length > 3) return;
    setFormState(prevToy => ({
      ...prevToy,
      labels: selectedOptions,
    }));
  };

  const handleAddToy = ev => {
    ev.preventDefault();
    const { valid, message } = toyService.toyValidator(formState);
    if (!valid) {
      setErrorMessage(message);
      return;
    }
    formState.labels = formState.labels.map(({ value }) => value);
    resetForm();
    dispatch(onAddToy(formState));
    onCloseAddToy();
  };

  const onCloseAddToy = () => {
    navigate('/toy');
  };

  if (!labelOptions.length) return <Loader />;
  return (
    <Modal center onClose={onCloseAddToy}>
      <div className='toy-add flex column flex-center'>
        {errorMessage && (
          <div className='error-message'>Error: {errorMessage}</div>
        )}
        <form onSubmit={handleAddToy}>
          <input
            {...register('name')}
            type='text'
            placeholder='Enter toy name '
            id='name'
          />

          <input
            {...register('price')}
            type='number'
            placeholder='Enter toy price'
            id='price'
          />

          <Select
            className='label-select'
            value={formState.labels}
            isMulti
            onChange={handleSelectChange}
            options={labelOptions}
            placeholder='Choose up to 3 labels :'
          />
          <button type='submit' className='btn-add'>
            <span className='fas fa-plus'></span>
          </button>

          <button type='button' className='btn-cancel' onClick={onCloseAddToy}>
            <span className='fas fa-undo-alt'></span>
          </button>
        </form>
      </div>
    </Modal>
  );
};
