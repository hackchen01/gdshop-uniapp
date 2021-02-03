import Vue from 'vue'  
import Vuex from 'vuex'  
import createPersistedState from 'vuex-persistedstate'
import api from '@/apis/index'
// import testModules from './modules/test'

Vue.use(Vuex)  

const state = {  
  favorites: [],  
  cartCount:0,
  memberToken: "",
  memberInfo:{},
}
const mutations = {
	setCartCount: (state, value) => {
	  state.cartCount = value;
	},
	setUsername: (state, value) => {
	  state.username = value;
	},
	setMemberLogin:(state, value) => {
	  state.memberInfo = value;
	  state.memberToken = value.token;
	},
	memberLayout:(state, value) => {
	  state.memberInfo = {};
	  state.memberToken = '';
	},
}
const actions = {
	setMemberLogin(context,payload){
		return new Promise((resolve,reject)=>{
			context.commit('setMemberLogin',payload)
			context.dispatch('getCartCount')
		})
	},
	getCartCount(context,payload){
		return new Promise((resolve,reject)=>{
			api.cart.count().then(res => {
				uni.$emit('CART_COUNT_CHANGE',res)
				resolve()
			})
		})
	}
}

let modules = {}
const files = require.context('./modules', false, /\.js$/)
files.keys().map(key => {
	modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default new Vuex.Store({
	/*
	modules : {
		test:testModules
	},*/
	modules: modules,
	actions,
	state,
	mutations,
	plugins: [
	// 可以有多个持久化实例  
	createPersistedState({
	  key: 'gdshop_store_data',  // 状态保存到本地的 key
	  paths: ['memberInfo','memberToken'],  // 要持久化的状态，在state里面取，如果有嵌套，可以  a.b.c
	  storage: {  // 存储方式定义
		getItem: (key) => uni.getStorageSync(key), // 获取
		setItem: (key, value) => uni.setStorageSync(key, value), // 存储
		removeItem: (key) => uni.removeStorageSync(key) // 删除
	  }
	})
	]
})