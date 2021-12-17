import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Select from 'react-select';
import { toyService } from '../services/toyService.js';
import { onAddToy } from '../store/actions/toyActions.js';
import { Loader } from './Loader.jsx';
import { Modal } from './Modal.jsx';

const EMPTY_TOY = {
  name: '',
  price: '',
  labels: [],
};
export const ToyAdd = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //local
  const [toy, setToy] = useState(EMPTY_TOY);
  const [labelOptions, setLabelOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    loadLabels();
  }, []);

  const loadLabels = async () => {
    const labels = await toyService.getLabels();
    const labelOptions = labels.map((label) => ({
      value: label,
      label: label,
    }));
    setLabelOptions(labelOptions);
  };

  const handleChange = ({ target }) => {
    let { value, name: field } = target;
    if (Number.isInteger(value)) {
      value = +value;
    }
    setToy((prevToy) => ({ ...prevToy, [field]: value }));
  };

  const handleSelectChange = (selectedOptions) => {
    if (selectedOptions.length > 3) return;
    setToy((prevToy) => ({
      ...prevToy,
      labels: selectedOptions,
    }));
  };

  const resetToyForm = () => {
    setToy(EMPTY_TOY);
  };

  const handleAddToy = (ev) => {
    ev.preventDefault();
    const { valid, message } = toyService.toyValidator(toy);
    if (!valid) {
      setErrorMessage(message);
      return;
    }
    toy.labels = toy.labels.map(({ value }) => value);
    resetToyForm();
    dispatch(onAddToy(toy));
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
        <form>
          <input
            type='text'
            name='name'
            placeholder='Enter toy name '
            id='name'
            value={toy.name}
            onChange={handleChange}
          />

          <input
            type='number'
            name='price'
            placeholder='Enter toy price'
            id='price'
            value={toy.price}
            onChange={handleChange}
          />

          <Select
            className='label-select'
            value={toy.labels}
            isMulti
            onChange={handleSelectChange}
            options={labelOptions}
            placeholder='Choose up to 3 labels :'
          />
          <button type='submit' className='btn-add' onClick={handleAddToy}>
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
