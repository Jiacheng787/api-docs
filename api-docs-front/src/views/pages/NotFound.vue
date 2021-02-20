<template>
  <a-result
    status="404"
    title="404"
    sub-title="Sorry, the page you visited does not exist."
  >
    <template #extra>
      <a-button type="primary" @click="back"> 返回首页 </a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: "not-found",
  data() {
    return {};
  },
	methods: {
		back() {
			this.$router.push('/docs');
		}
	}
};
</script>

<style lang="less" scoped>
</style>