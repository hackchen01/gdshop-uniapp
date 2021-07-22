import Request from '@/plugins/luch-request/index.js'
import store from '@/store/index'
function log(message){
	console.log(message)
}

// 初始化
const http = new Request()
// 设置公共参数
// http.config.baseURL = 'http://47.242.64.5:8099'
/* 
if (process.env.NODE_ENV === 'production'){
	http.config.baseURL = 'http://47.242.64.5:8099'
} */

http.config.baseURL = process.env.VUE_APP_BASE_API

// 请求前拦截
http.interceptors.request.use((config) => { // 可使用async await 做异步操作
  config.header = {
    ...config.header,
    token: store.state.memberToken
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
        // 需要重新登录
        // 10001 - 无效的 token
        // 10002 - 其它客户端登录
        // 10003 - token 过期
        if ([
          10001,
          10002,
          10003
        ].indexOf(dataAxios.code) >= 0) {
		  uni.showToast({
			  icon:'none',
		      title: dataAxios.message,
		      duration: 1500,
			  position :'bottom'
		  });
		  // 执行退出方法
          // await store.dispatch('d2admin/user/logout', { focus: true, remote: false, back: true })
        } else {
          log(dataAxios.message)
        }
        return Promise.reject(dataAxios)
      }
}, (response) => { /*  对响应错误做点什么 （statusCode !== 200）*/
  console.log(response)
  return Promise.reject(response)
})

export default http