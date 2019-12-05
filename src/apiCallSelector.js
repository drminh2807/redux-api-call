export default (state, path, keys) => {
  let values = state
  path.split('.').forEach(subPath => {
    values = values[subPath]
  })
  const res = {}
  keys.forEach(key => {
    res[key] = values[key]
  })
  return res
}
