import { isPositiveInteger, findByMatch, findByQuery } from '../utilities/utilities'
import { MONTHS_IN_YEAR, DAYS_IN_YEAR, PENCE_IN_POUND, MAX_THRESHOLD } from '../constants/constants'

const updateUsage = (scratchpad, rate) => {
  const { vatMultiplier } = scratchpad
  const { price, threshold = MAX_THRESHOLD } = rate
  const costPerUnitOfEnergy = (price * vatMultiplier)
  for (let index = 0; index < threshold; ++index) {
    if (scratchpad.balance - costPerUnitOfEnergy < 0)
      break
    scratchpad.balance -= costPerUnitOfEnergy
    scratchpad.usage++
  }
  return scratchpad
}

const getUsage = (values) => {
  const { monthlySpend, planInfo: { rates, standing_charge = 0 }, vatMultiplier } = values
  const annualSpend = monthlySpend * MONTHS_IN_YEAR * PENCE_IN_POUND
  const annualCharge = standing_charge * DAYS_IN_YEAR * vatMultiplier
  const balance = annualSpend - annualCharge
  const scratchpad = rates.reduce(updateUsage, { usage: 0, balance, vatMultiplier })
  return scratchpad.usage
}

const parseData = (options) => {
  const { tokens, context: { plans } } = options
  if (tokens.length < 4)
    throw new Error('format is "usage <supplier> <plan> <spend>"')
  const [, supplier, plan, spend] = tokens
  const findBySupplier = findByMatch.bind(this, 'supplier', supplier)
  const findByPlan = findByMatch.bind(this, 'plan', plan)
  if (!plans.find(findBySupplier))
    throw new Error(`supplier "${supplier}" not found in existing plans`)
  if (!plans.find(findByPlan))
    throw new Error(`plan "${plan}" not found in existing plans`)
  if (!isPositiveInteger(spend))
    throw new Error(`spend "${spend}" is not a positive integer amount`)
  return tokens
}

const getPlanInfo = (supplier, plan, plans) => {
  const query = { supplier, plan }
  const findByPlan = findByQuery.bind(this, query)
  const planInfo = plans.find(findByPlan)
  if (!planInfo)
    throw new Error(`plan matching query "${JSON.stringify(query)}" not found in existing plans`)
  return planInfo
}

const command = (options) => {
  const { context: { plans, vatMultiplier } } = options
  const [, supplier, plan, spend] = parseData(options)
  const planInfo = getPlanInfo(supplier, plan, plans)
  const monthlySpend = parseInt(spend, 10)
  const config = { vatMultiplier, monthlySpend, planInfo }
  const usage = getUsage(config)
  return usage
}

export { command }
