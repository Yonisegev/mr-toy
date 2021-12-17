import { toyService } from '../../services/toyService';

export function loadToys() {
  return async (dispatch) => {
    try {
      const toys = await toyService.query();
      console.log('toys: ', toys);
      dispatch({
        type: 'SET_TOYS',
        toys,
      });
    } catch (err) {
      console.error('Can not load toys', err);
    }
  };
}

export function onAddToy(toy) {
  return async (dispatch) => {
    try {
      const savedToy = await toyService.addToy(toy);
      dispatch({
        type: 'ADD_TOY',
        toy: savedToy,
      });
      // showSuccessMsg('Toy added!');
    } catch (err) {
      console.log('Can not add toy', toy);
      // showErrorMsg('Can not add toy');
    }
  };
}
export function onSetFilter(filterBy) {
  return async (dispatch) => {
      try {
          const toys = await toyService.query(filterBy)
          dispatch({
              type: 'SET_TOYS',
              toys
          })
      } catch (err) {
          console.log('Can not filter toys', err)
      }
  }
}

export function onRemoveToy(toyId) {
  return async (dispatch) => {
      try {
          await toyService.removeToy(toyId)
          dispatch({
              type: 'REMOVE_TOY',
              toyId
          })
          // showSuccessMsg('Toy deleted!')
          return toyId
      } catch (err) {
          console.log('Can not remove todo')
          // showErrorMsg('Toy can not be deleted!')
      }
  }
}
