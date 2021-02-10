<template>
  <div class="base-info">
    <a-descriptions title="文档信息">
      <a-descriptions-item v-for="(item, index) in descriptionList"
                           :key="index"
                           :label="item.label">
        {{ item.desc }}
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
      descriptionList: []
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
          this.descriptionList = res.data;
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