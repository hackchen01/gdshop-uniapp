import Request from '@/plugins/luch-request/index.js'

// 初始化
const http = new Request()
// 设置公共参数
http.config.baseURL = 'http://www.baidu.com'

// 请求前拦截
http.interceptors.request.use((config) => { // 可使用async await 做异步操作
  config.header = {
    ...config.header,
    a: 1 // 演示拦截器header加参
  }
  // 演示custom 用处
  // if (config.custom.auth) {
  //   config.header.token = 'token'
  // }
  // if (config.custom.loading) {
  //  uni.showLoading()
  // }
  /**
   /* 演示
   if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
      return Promise.reject(config)
    }
   **/
  return config
}, config => { // 可使用async await 做异步操作
  return Promise.reject(config)
})

// 返回拦截
http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
  //  if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
  //    return Promise.reject(response) // return Promise.reject 可使promise状态进入catch
 // if (response.config.custom.verification) { // 演示自定义参数的作用
  //   return response.data
  // }
  const dataAxios = response.data
  if (dataAxios.code === 0) {
        // 正常返回数据
        return dataAxios.data
      } else {
        const error = new Error(dataAxios.msg)
        // 需要重新登录
        // 10001 - 无效的 token
        // 10002 - 其它客户端登录
        // 10003 - token 过期
        if ([
          10001,
          10002,
          10003
        ].indexOf(dataAxios.code) >= 0) {
          Notification.error({
            title: '身份验证失败',
            message: '请重新登录'
          })
		  // 执行退出方法
          // await store.dispatch('d2admin/user/logout', { focus: true, remote: false, back: true })
        } else {
          log(error)
        }
        return Promise.reject(error)
      }
}, (response) => { /*  对响应错误做点什么 （statusCode !== 200）*/
  console.log(response)
  return Promise.reject(response)
})

export default http