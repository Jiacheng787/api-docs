<template>
  <div class="interface-description">
    <div class="sub-title">接口描述</div>
    <a-card size="small" class="description-card">
      <div>{{ description }}</div>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "interface-description",
  props: {
    description: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="less" scoped>
.interface-description {
  margin-bottom: 12px;
  .sub-title {
    height: 30px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: bold;
    font-size: 16px;
    line-height: 30px;
    text-indent: 8px;
    border-left: 4px solid #00ab6d;
    margin-bottom: 12px;
  }
}
</style>