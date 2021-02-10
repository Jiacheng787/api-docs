<template>
  <div class="base-info">
    <a-descriptions title="文档信息">
      <a-descriptions-item key="" label="项目名称">
        {{ description.title }}
      </a-descriptions-item>
      <a-descriptions-item key="" label="项目简介">
        {{ description.description }}
      </a-descriptions-item>
      <a-descriptions-item key="" label="版本">
        {{ description.version }}
      </a-descriptions-item>
      <a-descriptions-item key="" label="host">
        {{ description.host }}
      </a-descriptions-item>
      <a-descriptions-item key="" label="basePath">
        {{ description.basePath }}
      </a-descriptions-item>
      <a-descriptions-item key="" label="接口url">
        {{ description.url }}
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
import api from '@/api'
export default {
  name: 'base-info',
  data() {
    return {
      description: {
        title: "-",
        description: "-",
        version: "-",
        host: "-",
        basePath: "-",
        url: "-"
      }
    }
  },
  mounted() {
    this.getApiBaseInfo()
  },
  methods: {
    /**
     * @description 获取api文档基本信息
     */
    getApiBaseInfo() {
      api.systemInfo.getApiBaseInfo()
        .then(res => {
          this.description = res.data[0];
        })
        .catch(e => {
          this.$message.error(e.message);
        })
    }
  }
}
</script>

<style lang="less" scoped>
.base-info {
  padding: 12px;
}
</style>