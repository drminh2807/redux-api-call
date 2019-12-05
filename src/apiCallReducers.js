import { combineReducers } from 'redux';
import apiCallReducerCreator from './apiCallReducerCreator';

export default (names = {}) => {
  const reducers = {}
  const groupReducers = {}
  Object.keys(names).forEach((key) => {
    const value = names[key]
    if (key.includes('.')) {
      let temp = groupReducers
      key.split('.').forEach((path, index, arr) => {
        if (index < arr.length - 1) {
          if (!temp[path]) {
            temp[path] = {}
          }
          temp = temp[path]
        } else {
          temp[path] = apiCallReducerCreator(key, value)
        }
      })
    } else {
      reducers[key] = apiCallReducerCreator(key, value)
    }
  });

  Object.keys(groupReducers).forEach(key => {
    reducers[key] = combineReducers(groupReducers[key])
  })

  return reducers
}
