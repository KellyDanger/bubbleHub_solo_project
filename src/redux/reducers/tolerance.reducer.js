const userToleranceReducer = (state=0, action) => {
  switch(action.type) {
    case 'SET_USER_TOLERANCE':
      return action.payload[0].tolerance;
    default:
      return state;
  }
}
export default userToleranceReducer;