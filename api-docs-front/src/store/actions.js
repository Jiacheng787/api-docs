import api from '@/api'

const actions = {
    getApiNavMenu({ commit }) {
        api.navMenu.getApiList()
            .then((res) => {
                commit('changeNavMenu', res.data);
            })
            .catch((e) => {
                this.$message.error(e.message);
            });
    },
    getApiBaseInfo({ commit }) {
        api.baseInfo.getApiBaseInfo()
            .then(res => {
                commit('changeBaseInfo', res.data[0]);
            })
            .catch(e => {
                this.$message.error(e.message);
            })
    }
}

export default actions