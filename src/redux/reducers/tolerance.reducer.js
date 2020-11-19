const userToleranceReducer = (state=[], action) => {
  switch(action.type) {
    case 'SET_USER_TOLERANCE':
      return action.payload;
    default:
      return state;
  }
}
export default userToleranceReducer;