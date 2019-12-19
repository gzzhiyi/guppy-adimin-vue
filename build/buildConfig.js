/**
 * 构建环境相关配置
 */
const title = 'Guppy Admin'

module.exports = {
  prod: { // 正式环境
    title,
    apiHostName: ''
  },
  test: { // 测试环境
    title: `${title} <Test>`,
    apiHostName: ''
  },
  dev: { // 开发环境
    title: `${title} <Dev>`,
    apiHostName: ''
  },
  devLocal: { // Mock 开发环境
    title: `${title} <Dev-Mock>`,
    apiHostName: '//localhost:3000'
  }
}
