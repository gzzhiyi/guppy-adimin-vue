// build/config.js

/**
 * 构建环境参数配置
 */
const title = 'My Admin'

module.exports = {
  prod: { // 生产环境
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
  devLocal: { // 本地开发环境
    title: `${title} <Dev-Local>`,
    apiHostName: '//localhost:3000'
  }
}
