<template>
  <div class="editable-request-params">
    <a-button type="link" @click="handleAddRow">
      <a-icon type="plus" />
      添加参数
    </a-button>
    <a-table
      :columns="columns"
      :data-source="reqParams"
      :pagination="false"
      size="small"
    >
      <template slot="name" slot-scope="text, record">
        <a-input v-model="record.name" />
      </template>
      <template slot="description" slot-scope="text, record">
        <a-input v-model="record.description" />
      </template>
      <template slot="in" slot-scope="text, record">
        <a-select v-model="record.in" style="width: 100px">
          <a-select-option
            v-for="(item, index) in paramIn"
            :key="index"
            :value="item"
          >
            {{ item }}
          </a-select-option>
        </a-select>
      </template>
      <template slot="required" slot-scope="text, record">
        <a-select v-model="record.required" style="width: 100px">
          <a-select-option value="false"> false </a-select-option>
          <a-select-option value="true"> true </a-select-option>
        </a-select>
      </template>
      <template slot="type" slot-scope="text, record">
        <a-select v-model="record.type" style="width: 100px">
          <a-select-option
            v-for="(item, index) in type"
            :key="index"
            :value="item"
          >
            {{ item }}
          </a-select-option>
        </a-select>
      </template>
      <template slot="format" slot-scope="text, record">
        <a-select v-model="record.format" style="width: 100px">
          <a-select-option
            v-for="(item, index) in type"
            :key="index"
            :value="item"
          >
            {{ item }}
          </a-select-option>
        </a-select>
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
  name: "editable-request-params",
  props: {
    reqParams: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      paramIn: ["body", "query", "path", "header", "formData"],
      type: [
        "string",
        "number",
        "boolean",
        "Array",
        "Object",
        "null",
        "undefined",
      ],
      columns: [
        {
          title: "参数名称",
          dataIndex: "name",
          key: "0",
          scopedSlots: { customRender: "name" },
        },
        {
          title: "参数说明",
          dataIndex: "description",
          key: "1",
          scopedSlots: { customRender: "description" },
        },
        {
          title: "请求类型",
          dataIndex: "in",
          key: "2",
          scopedSlots: { customRender: "in" },
        },
        {
          title: "是否必须",
          dataIndex: "required",
          key: "3",
          scopedSlots: { customRender: "required" },
        },
        {
          title: "数据类型",
          dataIndex: "type",
          key: "4",
          scopedSlots: { customRender: "type" },
        },
        {
          title: "schema",
          dataIndex: "format",
          key: "5",
          scopedSlots: { customRender: "format" },
        },
        {
          title: "操作",
          key: "6",
          scopedSlots: { customRender: "operate" },
        },
      ],
    };
  },
  methods: {
    handleAddRow() {
			let lastKey;
			if (!this.reqParams.length) {
				lastKey = 0;
			} else {
				lastKey = this.reqParams.slice(-1)[0].key + 1;
			}
      this.reqParams.push({
        name: "",
        description: "",
        in: "",
        required: "",
        type: "",
        format: "",
        key: lastKey,
      });
    },
		handleDeleteRow(key) {
			let index = 0;
			for(let i in this.reqParams) {
				if(this.reqParams[i].key == key) {
					index = i;
					break;
				}
			}
			this.reqParams.splice(index, 1);
		}
  },
};
</script>

<style lang="less" scoped>
</style>