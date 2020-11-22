const myBmReducer = (state={}, action) => {
  switch(action.type) {
    case 'SET_MY_BMS':
      return action.payload
    default:
      return state;  
  }
}
export default myBmReducer;