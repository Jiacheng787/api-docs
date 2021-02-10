<template>
  <div class="response-params">
    <div class="sub-title">响应参数</div>
    <a-table
      :columns="columns"
      :data-source="resParams.map((item, index) => ({...item, key: index}))"
      size="small"
      :pagination="false"
    >
    </a-table>
  </div>
</template>

<script>
export default {
  name: "response-params",
  props: {
    resParams: {
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
          title: "参数名称",
          dataIndex: "name",
          key: "0",
        },
        {
          title: "参数说明",
          dataIndex: "description",
          key: "1",
        },
        {
          title: "数据类型",
          dataIndex: "type",
          key: "2",
        },
        {
          title: "schema",
          dataIndex: "format",
          key: "3",
        },
      ]
    };
  },
};
</script>

<style lang="less" scoped>
.response-params {
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