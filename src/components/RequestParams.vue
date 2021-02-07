<template>
  <div class="request-params">
    <div class="sub-title">请求参数</div>
    <a-table
      :columns="columns"
      :data-source="reqParams.map((item, index) => ({...item, key: index}))"
      size="small"
      :pagination="false"
    >
      <span slot="in" slot-scope="text, record">
        <template v-if="text == 'body'">
          <span style="color: #0d5aa7;">{{ text }}</span>
        </template>
        <template v-else-if="text == 'query'">
          <span style="color: #61affe">{{ text }}</span>
        </template>
        <template v-else>
          <span>{{ text }}</span>
        </template>
      </span>
      <span slot="required" slot-scope="text, record">
        <template v-if="text == true">
          <span style="color: red;">true</span>
        </template>
        <template v-else>
          <span>false</span>
        </template>
      </span>
    </a-table>
  </div>
</template>

<script>
export default {
  name: "request-params",
  props: {
    reqParams: {
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
          title: "请求类型",
          dataIndex: "in",
          key: "2",
          scopedSlots: { customRender: 'in' },
        },
        {
          title: "是否必须",
          dataIndex: "required",
          key: "3",
          scopedSlots: { customRender: 'required' },
        },
        {
          title: "数据类型",
          dataIndex: "type",
          key: "4",
        },
        {
          title: "schema",
          dataIndex: "format",
          key: "5",
        },
      ]
    };
  },
};
</script>

<style lang="less" scoped>
.request-params {
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