import { toyService } from '../../services/toyService';

export function loadToys() {
  return async (dispatch) => {
    try {
      const toys = await toyService.query();
      console.log('toys: ', toys)
      dispatch({
        type: 'SET_TOYS',
        toys,
      });
    } catch (err) {
      console.error('Can not load toys', err);
    }
  };
}
