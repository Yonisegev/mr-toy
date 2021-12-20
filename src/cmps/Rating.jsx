import React, { useState } from 'react'

export const Rating = ({ onSaveRate }) => {

    const [rating, setRating] = useState('')
    const [hover, setHover] = useState('')

    const updateRate = (ev, idx) => {
        ev.preventDefault()
        setRating(idx)
        onSaveRate(idx)
    }

    return (
        <div className="star-rating">
            {[...Array(5)].map((star, idx) => {
                idx += 1
                return (
                    <button
                        key={idx}
                        className={idx <= (hover || rating) ? "on" : "off"}
                        onClick={(ev) => updateRate(ev, idx)}
                        onMouseEnter={() => setHover(idx)}
                        onMouseLeave={() => setHover(rating)}>
                        {idx <= (hover || rating)
                            ? <span className='star'>⭐</span>
                            : <h4 className='star'>⭐</h4>
                        }
                    </button>
                );
            })}
        </div>
    )
}