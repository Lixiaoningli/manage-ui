/**
 * 正则表达式验证
 */
//  英文验证
export function english(rule, value, callback) {
  const reg = /^[\A-\Z\a-\z]+$/
  if (reg.test(value)) {
    callback();
  } else {
    return callback(new Error('只能输入汉字与英文'));
  }
}

// 手机号验证
export function phone(rule, value, callback) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  if (reg.test(value)) {
    callback();
  } else {
    return callback(new Error('请输入正确的手机号'));
  }
}
