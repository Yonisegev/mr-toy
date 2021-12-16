import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { toyService } from '../services/toyService';
import { onSetFilter } from '../store/actions/toyActions';

export const ToyFilter = () => {
    const [filterBy, setFilterBy] = useState({
        word: '',
        type: '',
        labels: []
    })
    const [options, setOptions] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        loadLabels()
    }, [loadLabels])

    const loadLabels = useCallback(() => {
        const labels = toyService.getlabels();
        const options = labels.map(label => ({ value: label.toLowerCase(), label }))
        setOptions(options)
    }, [setOptions])

    const handleChange = ({target: {name, value}}) => {
        handleSetFilter(name, value)
    }

    const handleSelectChange = ({value}) => {
        if (value.length > 3) return
        handleSetFilter('labels', value)
    }

    const handleSetFilter = (filter, value) => {
        const newFilter = {...filterBy, [filter]: value}
        setFilterBy(newFilter)
        dispatch(onSetFilter(newFilter))
    }

    const { word, type, labels } = filterBy

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

            <label htmlFor='by-word' >
                <input
                    name='word' id='by-word'
                    type='text' placeholder='Search by name :' value={word}
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
    )
}