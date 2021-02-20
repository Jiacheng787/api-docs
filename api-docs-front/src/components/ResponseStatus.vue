<template>
  <div class="response-status">
    <div class="sub-title">响应状态</div>
    <a-table
      :columns="columns"
      :data-source="resStatus"
      size="small"
      :pagination="false"
    >
    </a-table>
  </div>
</template>

<script>
export default {
  name: "response-status",
  props: {
    resStatus: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      columns: [
        {
          title: "状态码",
          dataIndex: "code",
          key: "0",
        },
        {
          title: "说明",
          dataIndex: "description",
          key: "1",
        },
        {
          title: "schema",
          dataIndex: "schema",
          key: "2",
        },
      ]
    };
  },
};
</script>

<style lang="less" scoped>
.response-status {
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