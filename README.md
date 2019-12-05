# redux-api-call

## Step 1: Create constants

```javascript
export const REDUX_PRODUCT_LIST = 'productList'
export const REDUX_PROJECT_LIST = 'project.list'
export const REDUX_PROJECT_DETAIL = 'project.detail'
```

## Step 2: Create actions

```javascript
const actionTypes = apiCallActionsCreator(REDUX_PROJECT_LIST)

export const refetch = () => async (dispatch, getState) => {
  dispatch({ type: actionTypes.request, payload: { next: null, count: 0 } })
  try {
    const { search } = apiCallSelector(getState(), REDUX_PROJECT_LIST, ['search'])
    const { data, next, count } = await getComponentList({
      search,
      structure_slug: STRUCT_SLUG_PROJECT,
    })
    dispatch({ type: actionTypes.success, payload: { data, next, count } })
  } catch (error) {
    dispatch({ type: actionTypes.failure, payload: { error } })
  }
}

export const fetchMore = () => async (dispatch, getState) => {
  try {
    const {
      search, data: prevData, loading, loadingMore, next: page,
    } = apiCallSelector(getState(), REDUX_PROJECT_LIST, ['search', 'data', 'loading', 'loadingMore', 'next'])
    if (!prevData || !page || loading || loadingMore) {
      return
    }
    dispatch({ type: actionTypes.requestMore })
    const { data, count, next } = await getComponentList({
      search,
      page,
      structure_slug: STRUCT_SLUG_PROJECT,
    })
    dispatch({ type: actionTypes.successMore, payload: { data, next, count } })
  } catch (error) {
    dispatch({ type: actionTypes.failureMore, payload: { error } })
  }
}
```

## Step 3: Create reducers

```javascript
export default combineReducers({
  login: LoginReducer,
  ...apiCallReducers({
    [REDUX_PRODUCT_LIST]: {},
    [REDUX_PROJECT_LIST]: { search: 'abc' }, //initial state
    [REDUX_PROJECT_DETAIL]: {},
  }),
})
```

## Step 4: Connect react-redux

```javascript
const mapStateToProps = state => apiCallSelector(state, REDUX_PROJECT_LIST, [
  'filter', 'search', 'data', 'loading', 'loadingMore', 'count',
])

export default connect(mapStateToProps)(ProjectListContainer);
```