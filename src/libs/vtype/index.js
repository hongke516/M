const vtype = {
  phone: (rule, value, callback) => {
    window.console.log('phone', rule, value)
    if (/^1\d{10}$/.test(value)) {
      callback()
    } else {
      callback(new Error(rule.message || '请输入正确的手机号码'))
    }
  },
  floatNum3: (rule, value, callback) => {
    if (/^\d+[.]{0,1}\d{0,3}$/.test(value)) {
      callback()
    } else {
      callback(new Error(rule.message || '请输入正确的格式'))
    }
  }
}
export default vtype