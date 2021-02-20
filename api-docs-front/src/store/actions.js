import api from '@/api'
import router from '@/router'
import { message } from 'ant-design-vue'

const actions = {
	getApiNavMenu({ commit }) {
		api.navMenu.getApiList()
			.then((res) => {
				commit('changeNavMenu', res.data);
			})
			.catch((e) => {
				message.error(e.message);
			});
	},
	getApiBaseInfo({ commit }) {
		api.baseInfo.getApiBaseInfo()
			.then(res => {
				commit('changeBaseInfo', res.data[0]);
			})
			.catch(e => {
				message.error(e.message);
			})
	},
	getApiDetail({ commit }, id) {
		commit("changeApiDetailSpinning", true);
		api.apiDetail.getApiDetail(id)
			.then((res) => {
				if(res.success) {
					commit('changeApiDetail', res.data);
				} else {
					message.error(res.msg);
					router.push('/docs/notFound');
				}
			})
			.catch(e => {
				message.error(e.message);
			})
			.finally(() => {
				commit("changeApiDetailSpinning", false);
			})
	},
	deleteApiDetail({ commit, dispatch }, params) {
		commit("changeApiDetailSpinning", true);
		const {operationId, parentMenuId} = params;
		api.apiDetail.deleteDetail(operationId, parentMenuId)
			.then((res) => {
				message.success(res.msg);
				dispatch('getApiNavMenu');
				// 路由跳转
				router.push('/docs');
			})
			.catch(e => {
				message.error(e.message);
			})
			.finally(() => {
				commit("changeApiDetailSpinning", false);
			})
	},
}

export default actions