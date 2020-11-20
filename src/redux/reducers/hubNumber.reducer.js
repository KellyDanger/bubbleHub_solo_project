const hubNumberReducer = (state=0, action) => {
  switch(action.type) {
    case 'SET_HUBNUMBER':
      return action.payload;
    default:
      return state;
  }
}

//need to link up to get route
export default hubNumberReducer;