import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useForm } from '../hooks/useForm.js';
// import { toyService } from '../services/toy.service.js'
import { Rating } from './Rating.jsx';

const EMPTY_REVIEW = {
    name: '',
    rate: 1,
    readAt: new Date().toISOString().split('T')[0],
    txt: '',
}

export const ReviewAdd = () => {

    const { user } = useSelector((state) => state.userModule);

    const { formState, setFormState, register, resetForm } = useForm(EMPTY_REVIEW);

    const [isAdd, setIsAdd] = useState(false)
    const [review, setReview] = useState(EMPTY_REVIEW)

    const saveReview = (ev) => {
        ev.preventDefault();
        // const reviewToAdd = this.state.review
        // const toy = this.props.toy
        // const toyToAdd = toyService.addReview(toy, reviewToAdd)

        // this.props.onUpdateToy(toyToAdd)
        onToggleAddReview();
    }

    const onSaveRate = (rate) => {
        setFormState((prev) => ({ ...prev, rate }))
    }

    const onToggleAddReview = () => {
        setIsAdd(!isAdd)
        setFormState((prev) => ({ ...prev, name: user }))
    }

    const { name, rate, readAt, txt } = review
    return (
        <section className='review-add'>
            {!isAdd &&
                <>
                    <h1> Add review : </h1>
                    {user && <div className='add-btn' onClick={onToggleAddReview}> + </div>}
                    {!user && <div>Please log in to add a review </div>}
                </>
            }
            {isAdd &&
                <>
                    <button className='form-btn' onClick={onToggleAddReview} >Back</button>
                    <form onSubmit={(ev) => saveReview(ev)}>
                        <label>
                            Full Name :
                            <input
                                type='text'
                                placeholder='Enter Full Name'
                                {...register('name')}
                            />
                        </label>

                        <label>
                            Rate this book :
                            <Rating rate={rate} onSaveRate={onSaveRate} />
                        </label>

                        <label>
                            Read at :
                            <input
                                type="date"
                                {...register('readAt')}
                            />
                        </label>

                        <label>
                            Your Review :
                            <textarea
                                placeholder="Enter your review here"
                                {...register('txt')}
                            />
                        </label>

                        <button className="form-btn" type='submit'>Add Review</button>
                    </form>
                </>
            }
        </section>
    )
}
// export class ReviewAdd extends React.Component {

//     state = {
//         isAdd: false,
//         review: {
//             name: '',
//             rate: 1,
//             readAt: new Date().toISOString().split('T')[0],
//             txt: '',
//         }
//     }

//     componentDidMount() {
//         if (this.props.user) {
//             this.setState((prevState) => ({ review: { ...prevState.review, name: this.props.user.fullname } }))
//         }
//     }

//     handleChange = (ev) => {
//         const field = ev.target.name;
//         const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value;
//         this.setState((prevState) => ({ review: { ...prevState.review, [field]: value } }));
//     };

//     saveReview = (ev) => {
//         ev.preventDefault();
//         const reviewToAdd = this.state.review
//         const toy = this.props.toy
//         // const toyToAdd = toyService.addReview(toy, reviewToAdd)

//         // this.props.onUpdateToy(toyToAdd)
//         this.onToggleAddReview();
//     }

//     onSaveRate = (rate) => {
//         this.setState((prevState) => ({ review: { ...prevState.review, rate } }));
//     }

//     onToggleAddReview = () => {
//         if (this.props.user) {
//             this.setState({ isAdd: !this.state.isAdd, review: { name: this.props.user.fullname, rate: 1, readAt: new Date().toISOString().split('T')[0], txt: '' } })
//         }
//     }

//     render() {
//         const { name, rate, readAt, txt } = this.state.review
//         const { user } = this.props
//         const { isAdd } = this.state
//         return (
//             <section className="review-add">
//                 {!isAdd && <React.Fragment>
//                     <h1> Add a new review : </h1>
//                     {user && <div className="add-btn" onClick={this.onToggleAddReview}> + </div>}
//                     {!user && <div>Please log in to add a review </div>}
//                 </React.Fragment>}
//                 {isAdd && <React.Fragment>
//                     <button className="form-btn" onClick={this.onToggleAddReview} >Back</button>
//                     <form >
//                         <label htmlFor="name">Full Name : </label>
//                         <input type="text" name="name" id="name" placeholder="Enter Full Name" value={name} onChange={this.handleChange} />

//                         <label>Rate this book :</label>
//                         <Rating rate={rate} onSaveRate={this.onSaveRate} />

//                         <label htmlFor="read-at">Read at :</label>
//                         <input type="date" name="read-at" id="read-at" value={readAt} onChange={this.handleChange} />

//                         <label htmlFor="txt">Your Review : </label>
//                         <textarea name="txt" id="txt" placeholder="Enter your review here" value={txt} onChange={this.handleChange} />

//                         <button className="form-btn" onClick={(event) => this.saveReview(event)}>Add Review</button>
//                     </form>
//                 </React.Fragment>}
//             </section>
//         )
//     }
// }