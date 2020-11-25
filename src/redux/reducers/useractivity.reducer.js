
//holds the list of activities for the logged in user
const userActivityReducer = (state=[], action) => {
  switch(action.type) {
    case 'SET_USER_ACTIVITIES':
      return action.payload;
    default:
      return state;
  }
}
export default userActivityReducer;

