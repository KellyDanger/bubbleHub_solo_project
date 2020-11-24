const bmReducer = (state={}, action) => {
  switch(action.type) {
    case 'SET_BM':
      return action.payload
    default:
      return state;  
  }
}

export default bmReducer;