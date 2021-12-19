import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { toyService } from '../services/toyService';
import { onSetFilter } from '../store/actions/toyActions';
import { useUpdateEffect } from '../hooks/useUpdateEffect';

export const ToyFilter = () => {
  const [filterBy, setFilterBy] = useState({
    word: '',
    type: '',
    labels: [],
  });
  const [options, setOptions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    loadLabels();
  }, []);

  useUpdateEffect(() => {
    dispatch(onSetFilter(filterBy));
  }, [filterBy]);

  const loadLabels = useCallback(async () => {
    const labels = await toyService.getLabels();
    const options = labels.map((label) => ({
      value: label,
      label,
    }));
    setOptions(options);
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, [name]: value }));
  };

  const handleSelectChange = (selectedOptions) => {
    if (selectedOptions.length > 3) return;
    setFilterBy((prevFilterBy) => ({
      ...prevFilterBy,
      labels: selectedOptions,
    }));
  };

  const { word, type, labels } = filterBy;

  return (
    <form className='toy-filter'>
      <div className='search-img'>
        <span className='fas fa-search'></span>
      </div>

      <select name='type' onChange={handleChange} value={type}>
        <option value=''>All</option>
        <option value='instock'>In Stock</option>
        <option value='soldout'>Sold Out</option>
      </select>

      <label htmlFor='by-word'>
        <input
          name='word'
          id='by-word'
          type='text'
          placeholder='Search by name :'
          value={word}
          onChange={handleChange}
        />
      </label>

      <Select
        className='select'
        value={labels}
        isMulti
        onChange={handleSelectChange}
        options={options}
        placeholder='Choose up to 3 labels :'
      />
    </form>
  );
};
