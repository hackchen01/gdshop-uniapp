export default {
	namespaced: true,
	state: {
		test: '测试VUEX',
	},
	mutations: {
		setTest: (state, value) => {
			state.test = value;
		},
	},
	actions: {

	},
};
