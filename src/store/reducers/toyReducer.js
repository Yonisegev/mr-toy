const initialState = {
    toys: null,
    filterBy: { name: '', inStock: null, type: '', price: 0 }
};

export function toyReducer(state = initialState, action) {
    switch (action.type) {
        // cases go here
        default:
            return state;
    }
}