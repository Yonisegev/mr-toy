import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Loader } from '../cmps/Loader';
import { ReviewAdd } from '../cmps/ReviewAdd';
import { ReviewList } from '../cmps/ReviewList';
import { reviewService } from '../services/reviewService';
import { toyService } from '../services/toyService';
import { onRemoveToy, onUpdateToy } from '../store/actions/toyActions';

export const ToyDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toyId } = useParams();

  const { user } = useSelector((state) => state.userModule);

  const [toy, setToy] = useState(null);
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    loadToy();
    loadReviews()
  }, []);

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
      const reviews = await reviewService.query(toyId);
      setReviews(reviews)
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

  const handleUpdateToy = async () => {
    try {
      await dispatch(onUpdateToy(toy));
    } catch (err) {
      throw err;
    }
  };

  if (!toy) return <Loader />;
  const { name, price, inStock, labels } = toy;
  return (
    <section className='details-container'>
      <div className='toy-details'>
        <h2>Name : {name} </h2>

        <h3>Price : ${price}</h3>
        <h3>
          Available :{' '}
          <span className={inStock ? 'green' : 'red'}>
            {toy.inStock ? 'Yes!' : 'Soon...'}
          </span>
        </h3>
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
              onClick={handleRemoveToy}>
              <span className='fas fa-trash'></span>
            </button>
          )}

          <button
            className='btn back-btn'
            onClick={() => {
              navigate('/toy');
            }}>
            <span className='fas fa-th-large'></span>
          </button>
        </div>

        <div className='img-container'>
          {/* <img src={toys} alt='toys' /> */}
        </div>
      </div>

      <div className='reviews-container'>
        <ReviewAdd toy={toy} onAdd={() => { loadToy(); loadReviews() }} />
        <ReviewList reviews={reviews} />
      </div>
    </section>
  );
};
