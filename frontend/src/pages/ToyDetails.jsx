import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Chat } from '../cmps/Chat';
import { Loader } from '../cmps/Loader';
import { ReviewAdd } from '../cmps/ReviewAdd';
import { ReviewList } from '../cmps/ReviewList';
import { useToggle } from '../hooks/useToggle';
import { reviewService } from '../services/reviewService';
import { toyService } from '../services/toyService';
import { onRemoveToy } from '../store/actions/toyActions';
import { showErrorMsg } from '../services/eventBusService';

export const ToyDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toyId } = useParams();
  const { user } = useSelector(state => state.userModule);
  
  const [toy, setToy] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isChatOpen, toggleChat] = useToggle();

  useEffect(() => {
    loadToy();
    loadReviews();
  }, [toyId]);

  const loadToy = async () => {
    try {
      const toy = await toyService.getToyById(toyId);
      if (!toy) return navigate('/toy');
      setToy(toy);
    } catch (err) {
      throw err;
    }
  };

  const loadReviews = async () => {
    try {
      const reviews = await reviewService.query({ toyId });
      setReviews(reviews);
    } catch (err) {
      throw err;
    }
  };

  const handleRemoveToy = async () => {
    try {
      dispatch(onRemoveToy(toy._id));
      navigate('/toy');
    } catch (err) {
      throw err;
    }
  };

  const handleAddReview = useCallback(() => {
    loadReviews();
    loadToy();
  }, [reviews]);

  const avgRating = useMemo(() => {
    return (
      reviews.reduce((acc, { rate }) => acc + rate, 0) / reviews.length
    ).toFixed(1);
  }, [reviews]);

  const onChangePage = async diff => {
    try {
      const toyId = await toyService.getPrevNext(toy._id, diff);
      navigate(`/toy/${toyId}`, { replace: true });
    } catch (err) {
      showErrorMsg({ txt: 'Something went wrong, please try again.' });
    }
  };

  if (!toy) return <Loader />;
  const { name, price, inStock, labels } = toy;
  return (
    <>
      <section className='details-container'>
        <section className='pagination'>
          <button onClick={() => onChangePage(-1)}>Prev</button>
          <button onClick={() => onChangePage(1)}>Next</button>
        </section>
        <div className='toy-details'>
          <h2>Name : {name} </h2>

          <h3>Price : ${price}</h3>
          <h3>
            Available :{' '}
            <span className={inStock ? 'green' : 'red'}>
              {toy.inStock ? 'Yes!' : 'Soon...'}
            </span>
          </h3>
          <h3 className='avg-rating'>Toy Rating: {avgRating}</h3>
          {labels && <h3>Categories : {labels.join(' | ')}</h3>}

          <div className='details-btns'>
            {user && user.isAdmin && (
              <Link to={`/toy/edit/${toy._id}`}>
                <button className='btn edit-btn'>
                  <span className='fas fa-edit'></span>
                </button>
              </Link>
            )}

            {user && user.isAdmin && (
              <button
                className='btn remove-btn'
                alt='Return to list'
                onClick={handleRemoveToy}
              >
                <span className='fas fa-trash'></span>
              </button>
            )}

            <button
              className='btn back-btn'
              onClick={() => {
                navigate('/toy');
              }}
            >
              <span className='fas fa-th-large'></span>
            </button>
          </div>

          <div className='img-container'>
            <img src={`https://robohash.org/${toy._id}`} alt='toys' />
          </div>
        </div>

        <div className='reviews-container'>
          {user ? (
            <ReviewAdd toy={toy} onAdd={handleAddReview} />
          ) : (
            <div>
              Please <Link to='/login'>login</Link> to add a review
            </div>
          )}
          <ReviewList reviews={reviews} />
          <div className='chat-icon' onClick={toggleChat}>
            <i className='fas fa-comment-dots'></i>
          </div>
          <Chat toy={toy} isOpen={isChatOpen} onClose={toggleChat} />
        </div>
      </section>
    </>
  );
};
