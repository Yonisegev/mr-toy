import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { onRemoveToy } from '../store/actions/toyActions';

export const ToyPreview = ({ toy }) => {
  const dispatch = useDispatch();

  const handleRemoveToy = (ev) => {
    ev.stopPropagation();
    dispatch(onRemoveToy(toy._id));
  };

  return (
    <section className='toy-preview'>
      <h1 className='toy-name'>{toy.name}</h1>
      <h1 className='toy-price'>Price: ${toy.price}</h1>
      {!toy.inStock && <div className='sold-out-label'>Sold Out!</div>}
      <div className='btns'>
        <Link to={`/toy/${toy._id}`}>
          <button className='btn details-btn'>
            <span className='fas fa-info-circle'></span>
          </button>
        </Link>

        {/* {user && user.isAdmin && ( */}
        <Link to={`/toy/edit/${toy._id}`}>
          <button className='btn edit-btn'>
            <span className='fas fa-edit'></span>
          </button>
        </Link>
        {/* )} */}

        {/* {user && user.isAdmin && ( */}
        <button className='btn remove-btn' onClick={handleRemoveToy}>
          <span className='fas fa-trash'></span>
        </button>
        {/* )} */}
      </div>
    </section>
  );
};
class _ToyPreview extends React.Component {
  state = {
    isShown: false,
  };

  onEnter = () => {
    this.setState((prevState) => ({ ...prevState, isShown: true }));
  };

  onLeave = () => {
    this.setState((prevState) => ({ ...prevState, isShown: false }));
  };

  render() {
    const { toy, onRemoveToy, user } = this.props;
    return (
      <section
        className='toy-preview'
        onMouseEnter={this.onEnter}
        onMouseLeave={this.onLeave}>
        <h1>{toy.name}</h1>
        <h1>{toy.labels.join(' | ')}</h1>
        <h1>Price : ${toy.price}</h1>
        {!toy.inStock && <div className='stock'>Sold Out!</div>}

        <div className={`btns ${this.state.isShown ? 'show' : ''}`}>
          <Link to={`/toy/${toy._id}`}>
            <button className='btn details-btn'>
              <span className='fas fa-info-circle'></span>
            </button>
          </Link>

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
              onClick={(event) => {
                event.stopPropagation();
                onRemoveToy(toy._id);
              }}>
              <span className='fas fa-trash'></span>
            </button>
          )}
        </div>
      </section>
    );
  }
}
