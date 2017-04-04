const isPositiveInteger = (value) =>
  /^\d+$/.test(value) && (parseInt(value, 10) > 0)

const findByMatch = (field, value, item) =>
  item[field].toLowerCase() === value.toLowerCase()

const findByQuery = (query, item) => {
  for (const key in query)
    if (item[key].toLowerCase() !== query[key].toLowerCase())
      return false
  return true
}

export { isPositiveInteger, findByMatch, findByQuery }