import roundTo from 'round-to'

import { isPositiveInteger } from '../utilities/utilities'
import { DECIMAL_PLACES, DAYS_IN_YEAR, PENCE_IN_POUND, MAX_THRESHOLD } from '../constants/constants'

const getTotalCost = (scratchpad, rateInfo) => {
  const { standing_charge = 0 } = scratchpad
  const { threshold = MAX_THRESHOLD, price } = rateInfo
  const delta = Math.min(scratchpad.balance, threshold)
  scratchpad.balance -= delta
  scratchpad.costInPence += (delta * price)
  scratchpad.costInPence += (DAYS_IN_YEAR * standing_charge)
  return scratchpad
}

const getPlanInfo = (scratchpad, planInfo) => {
  const { usage, vatMultiplier } = scratchpad
  const { supplier, plan, rates, standing_charge } = planInfo
  const options = { costInPence: 0, balance: usage, standing_charge, vatMultiplier }
  const { costInPence } = rates.reduce(getTotalCost, options)
  const costInPounds = costInPence * vatMultiplier / PENCE_IN_POUND
  const totalCost = roundTo(costInPounds, DECIMAL_PLACES)
  const row = { supplier, plan, totalCost }
  scratchpad.table.push(row)
  return scratchpad
}

const parseData = (options) => {
  const { tokens } = options
  if (tokens.length < 2)
    throw new Error('format is "price <annual_usage>"')
  const [, annualUsage] = tokens
  if (!isPositiveInteger(annualUsage))
    throw new Error(`annual usage "${annualUsage}" is not a positive integer amount`)
  return tokens
}

const command = (options) => {
  const { context: { plans, vatMultiplier } } = options
  const [, annualUsage] = parseData(options)
  const usage = parseInt(annualUsage, 10)
  const scratchpad = plans.reduce(getPlanInfo, { usage, vatMultiplier, table: [] })
  scratchpad.table.sort((left, right) => left.totalCost - right.totalCost)
  return scratchpad.table
}

export { command }
