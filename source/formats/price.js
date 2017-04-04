const toString = ({supplier, plan, totalCost}) =>
  `${supplier},${plan},${totalCost}`

const format = (table) =>
  table.map(toString).join('\n')

export { format }