


const defaultState = {
  // collections: [],
  collections: [
    {id: 1, displayName: 'college algebra'},
    {id: 2, displayName: 'sutd'},
  ],
  isLoggedIn: false,
  user: null
}

export default function loginReducer(state = defaultState, action) {
  switch(action.type) {


    default:
      return state
  }
}
