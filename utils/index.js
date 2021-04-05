import * as article from './modules/article'
import * as diyPage from './modules/diyPage'
import * as myUrl from './modules/myUrl.js'

const utils = {
  article,
  diyPage,
  myUrl
}

/**
 * 将数值保留2位小数返回(不会四舍五入)
 * @param value
 * @returns {string}
 */
utils.getNumber = (value) => {
  const toFixedNum = Number(value).toFixed(3)
  return value ? toFixedNum.substring(0, toFixedNum.toString().length - 1) : '0.00'
}
/**
 * 货币保留两位小数
 */
utils.getMoneyByMinute = (value) => {
  return utils.getNumber(value / 100)
}

export default utils