const mutations = {
    changeNavMenu(state, payload) {
        payload = payload.map((item, index) => ({...item, key: index}))
        state.navMenu = payload;
    },
    changeBaseInfo(state, payload) {
        state.baseInfo = payload;
    }
}

export default mutations