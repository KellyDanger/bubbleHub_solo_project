const bmReducer = (state={}, action) => {
  switch(action.type) {
    case 'SET_BM':
      return action.payload
    case 'RESET_BM':
      return state={};
    default:
      return state;  
  }
}

export default bmReducer;