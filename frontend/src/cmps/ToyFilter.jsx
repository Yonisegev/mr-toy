import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { toyService } from '../services/toyService';
import { loadToys } from '../store/actions/toyActions';
import { useUpdateEffect } from '../hooks/useUpdateEffect';
import debounce from 'lodash.debounce';
import { useSearchParams } from 'react-router-dom';

export const ToyFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const [labelOptions, setLabelOptions] = useState([]);
  const dispatch = useDispatch();

  const filterBy = {
    word: searchParams.get('word') || '',
    type: searchParams.get('type') || '',
    labels: searchParams.getAll('labels'),
  };

  useEffect(() => {
    loadLabels();
    dispatch(loadToys(filterBy));
  }, []);

  useUpdateEffect(() => {
    onSetFilter(filterBy);
  }, [filterBy]);

  const onSetFilter = useCallback(
    debounce((filterBy) => {
      dispatch(loadToys(filterBy));
    }, 400),
    []
  );

  const loadLabels = useCallback(async () => {
    const labels = await toyService.getLabels();
    const options = labels.map((toyLabel) => ({
      value: toyLabel,
      label: toyLabel,
    }));
    setLabelOptions(options);
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setSearchParams({ ...filterBy, [name]: value }, { replace: true });
  };

  const handleSelectChange = (selectedOptions) => {
    if (selectedOptions.length > 3) return;
    setSearchParams(
      {
        ...filterBy,
        labels: selectedOptions.map(({ value }) => value),
      },
      { replace: true }
    );
  };

  const { word, type, labels } = filterBy;

  return (
    <form className='toy-filter'>
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
        value={labels.map((value) => ({ value, label: value }))}
        isMulti
        onChange={handleSelectChange}
        options={labelOptions}
        placeholder='Choose up to 3 labels :'
      />
    </form>
  );
};
