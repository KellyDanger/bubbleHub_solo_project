//holds the hubNumber for the logged in user
const hubNumberReducer = (state=0, action) => {
  switch(action.type) {
    case 'SET_HUBNUMBER':
      return action.payload;
    default:
      return state;
  }
}


export default hubNumberReducer;

