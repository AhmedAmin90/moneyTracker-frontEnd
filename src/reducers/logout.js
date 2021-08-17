import allReducers from "./index";

const appReducer = (state, action)=> {
    if (action.type === 'LOGOUT') {
        return allReducers(undefined, action)
      }
    return allReducers(state, action)
}