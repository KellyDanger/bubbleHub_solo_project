const userToleranceReducer = (state=0, action) => {
  switch(action.type) {
    case 'SET_HUBNUMBER':
      return action.payload.hubnumber;
    default:
      return state;
  }
}
export default userToleranceReducer;