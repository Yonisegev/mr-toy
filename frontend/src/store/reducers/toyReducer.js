const initialState = {
  toys: null,
  filterBy: { name: '', inStock: null, type: '', price: 0 },
};

export function toyReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TOYS':
      return { ...state, toys: action.toys };
    case 'REMOVE_TOY':
      return {
        ...state,
        toys: state.toys.filter((toy) => toy._id !== action.toyId),
      };
    case 'ADD_TOY':
      return { ...state, toys: [action.toy, ...state.toys] };
    case 'UPDATE_TOY':
      console.log('action.toy:',action.toy)
      return {
        ...state,
        toys: state.toys.map((toy) => (toy._id === action.toy._id ? action.toy : toy)
        ),
      };
    default:
      return { ...state };
  }
}
