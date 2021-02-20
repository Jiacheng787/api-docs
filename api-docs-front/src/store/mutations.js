const mutations = {
	changeNavMenu(state, payload) {
		payload = payload.map((item, index) => ({ ...item, key: index }))
		state.navMenu = payload;
	},
	changeBaseInfo(state, payload) {
		state.baseInfo = payload;
	},
	changeApiDetail(state, payload) {
		state.apiDetail = payload;
	},
	changeApiDetailSpinning(state, payload) {
		state.apiDetailSpinning = payload;
	}
}

export default mutations