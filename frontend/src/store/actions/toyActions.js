import { showErrorMsg, showSuccessMsg } from '../../services/eventBusService';
import { toyService } from '../../services/toyService';

export function loadToys(filterBy) {
  return async (dispatch) => {
    try {
      const toys = await toyService.query(filterBy);
      // console.log('toys: ', toys);
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
      showSuccessMsg({ txt: 'Toy added!' });
    } catch (err) {
      console.log('Can not add toy', toy);
      showErrorMsg({ txt: 'Can not add toy' });
    }
  };
}

export function onUpdateToy(toy) {
  return async (dispatch) => {
    try {
      const savedToy = await toyService.updateToy(toy);
      dispatch({
        type: 'UPDATE_TOY',
        toy: savedToy,
      });
      showSuccessMsg({ txt: 'Updated toy!' });
    } catch (err) {
      console.log('Can not update toy', err);
      showErrorMsg({ txt: 'Can not update toy' });
    }
  };
}

export function onSetFilter(filterBy) {
  return async (dispatch) => {
    try {
      const toys = await toyService.query(filterBy);
      dispatch({
        type: 'SET_TOYS',
        toys,
      });
    } catch (err) {
      console.log('Can not filter toys', err);
    }
  };
}

export function onRemoveToy(toyId) {
  return async (dispatch) => {
    try {
      await toyService.removeToy(toyId);
      dispatch({
        type: 'REMOVE_TOY',
        toyId,
      });
      showSuccessMsg({ txt: 'Toy deleted!' });
      return toyId;
    } catch (err) {
      console.log('Can not remove toy');
      showErrorMsg({ txt: 'Toy can not be deleted!' });
    }
  };
}
