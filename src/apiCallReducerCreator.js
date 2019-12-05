import apiCallActionsCreator from './apiCallActionsCreator'

const initialState = {
  loading: false,
  data: null,
  loadingMore: false,
}


export default (name, initial = {}) => {
  const types = apiCallActionsCreator(name);
  return (state = { ...initialState, ...initial }, action) => {
    switch (action.type) {
      case types.change: {
        return {
          ...state,
          ...action.payload,
        }
      }
      case types.request: {
        return {
          ...state,
          ...action.payload,
          loading: true,
        }
      }
      case types.success: {
        return {
          ...state,
          ...action.payload,
          loading: false,
        }
      }
      case types.failure: {
        return {
          ...state,
          ...action.payload,
          loading: false,
          data: [],
        }
      }
      case types.clear: {
        return {
          ...state,
          ...action.payload,
          data: null,
        }
      }
      case types.requestMore: {
        return {
          ...state,
          ...action.payload,
          loadingMore: true,
        }
      }
      case types.successMore: {
        return {
          ...state,
          ...action.payload,
          loadingMore: false,
          data: [
            ...state.data,
            ...action.payload.data,
          ],
        }
      }
      case types.failureMore: {
        return {
          ...state,
          ...action.payload,
          loadingMore: false,
        }
      }
      default: return state;
    }
  }
}
