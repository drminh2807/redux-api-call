const prefix = '@apiCall/'
export default (action) => ({
  change: `${prefix}${action}_CHANGE`,
  request: `${prefix}${action}_REQUEST`,
  success: `${prefix}${action}_SUCEESS`,
  failure: `${prefix}${action}_FAILURE`,
  clear: `${prefix}${action}_CLEAR`,
  requestMore: `${prefix}${action}_REQUEST_MORE`,
  successMore: `${prefix}${action}_SUCEESS_MORE`,
  failureMore: `${prefix}${action}_FAILURE_MORE`,
});
