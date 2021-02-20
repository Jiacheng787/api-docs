<template>
  <div class="editable-response-status">
    <a-button type="link" @click="handleAddRow">
      <a-icon type="plus" />
      添加参数
    </a-button>
    <a-table
      :columns="columns"
      :data-source="resStatus"
      :pagination="false"
      size="small"
    >
      <template slot="code" slot-scope="text, record">
        <a-input v-model="record.code" />
      </template>
      <template slot="description" slot-scope="text, record">
        <a-input v-model="record.description" />
      </template>
      <template slot="schema" slot-scope="text, record">
        <a-input v-model="record.schema" />
      </template>
      <template slot="operate" slot-scope="text, record">
        <a-button type="link" @click="() => handleDeleteRow(record.key)">
          <a-icon type="delete" />
        </a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  name: "editable-response-status",
  props: {
    resStatus: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      columns: [
        {
          title: "状态码",
          dataIndex: "code",
          key: "0",
          scopedSlots: { customRender: "code" },
        },
        {
          title: "说明",
          dataIndex: "description",
          key: "1",
          scopedSlots: { customRender: "description" },
        },
        {
          title: "schema",
          dataIndex: "schema",
          key: "2",
          scopedSlots: { customRender: "schema" },
        },
        {
          title: "操作",
          key: "3",
          scopedSlots: { customRender: "operate" },
        },
      ],
    };
  },
  methods: {
    handleAddRow() {
      let lastKey;
			if (!this.resStatus.length) {
				lastKey = 0;
			} else {
				lastKey = this.resStatus.slice(-1)[0].key + 1;
			}
      this.resStatus.push({
        code: "",
        description: "",
        schema: "",
        key: lastKey,
      });
    },
    handleDeleteRow(key) {
      let index = 0;
      for (let i in this.resStatus) {
        if (this.resStatus[i].key == key) {
          index = i;
          break;
        }
      }
      this.resStatus.splice(index, 1);
    },
  },
};
</script>

<style lang="less" scoped>
</style>