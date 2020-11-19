const userActivityReducer = (state=[], action) => {
  switch(action.type) {
    case 'SET_USER_ACTIVITY':
      return action.payload;
    default:
      return state;
  }
}
export default userActivityReducer;

//this is not being used yet...will be used on GET ACTIVITIES