<template>
  <div class="base-info">
    <a-descriptions title="文档信息">
      <a-descriptions-item key="" label="项目名称">
        {{ baseInfo.title }}
      </a-descriptions-item>
      <a-descriptions-item key="" label="项目简介">
        {{ baseInfo.description }}
      </a-descriptions-item>
      <a-descriptions-item key="" label="版本">
        {{ baseInfo.version }}
      </a-descriptions-item>
      <a-descriptions-item key="" label="host">
        {{ baseInfo.host }}
      </a-descriptions-item>
      <a-descriptions-item key="" label="basePath">
        {{ baseInfo.basePath }}
      </a-descriptions-item>
      <a-descriptions-item key="" label="接口url">
        {{ baseInfo.url }}
      </a-descriptions-item>
    </a-descriptions>
    <a-descriptions title="分类操作"></a-descriptions>
    <div class="tool-bar">
      <a-button type="primary" @click="() => handleOpenModal(0)">
        <a-icon type="plus" />
        添加分类
      </a-button>
    </div>
    <a-table
      :columns="columns"
      :data-source="navMenu"
      childrenColumnName="child"
    >
      <div slot="expandedRowRender" slot-scope="record" style="margin: 0">
        <div v-for="(item, index) in record.children" :key="index">
          {{ item.title }}
        </div>
      </div>
      <span slot="operate" slot-scope="record">
        <a-button type="link">
          <a-icon type="plus" />
          添加接口
        </a-button>
        <a-button type="link" @click="() => handleOpenModal(1, record)">
          <a-icon type="edit" />
          编辑分类
        </a-button>
        <a-button type="link" @click="() => handleDeleteSort(record)">
          <a-icon type="delete" />
          删除分类
        </a-button>
      </span>
    </a-table>
    <a-modal v-model="visible" :title="`${dialogType == 0 ? '添加' : '编辑'}分类`" :footer="null">
      <a-form
        :form="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        @submit="handleSubmit"
      >
        <a-form-item label="分类名称">
          <a-input
            v-decorator="[
              'title',
              {
                rules: [{ required: true, message: '请输入分类名称！' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="图标" extra="参考Ant Design Vue组件库的图标">
          <a-input
            v-decorator="[
              'icon',
              {
                rules: [{ required: true, message: '请选择图标！' }],
              },
            ]"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit"> 确定 </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import api from "@/api";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "base-info",
  data() {
    return {
      visible: false,
      dialogType: 0, // 0 => 添加, 1 => 编辑
      editId: "",
      form: this.$form.createForm(this, { name: 'coordinated' }),
      columns: [
        {
          title: "分类名称",
          width: "50%", 
          dataIndex: "title",
          key: "title",
        },
        {
          title: "图标",
          dataIndex: "icon",
          key: "icon",
        },
        {
          title: "操作",
          key: "operate",
          scopedSlots: { customRender: "operate" },
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["navMenu", "baseInfo"]),
  },
  methods: {
    ...mapActions(['getApiNavMenu']),
    /**
     * @description 打开弹框
     */
    handleOpenModal(type, item) {
      this.dialogType = type; // 设置操作类型
      this.form.resetFields(); // 重置表单
      this.visible = true; // 打开弹框
      if (type == 0) return;
      this.editId = item._id; // 记录当前编辑行的索引
      this.$nextTick(() => { // 编辑状态下给表单传参
        this.form.setFieldsValue({
          title: item.title,
          icon: item.icon
        })
      })
    },
    /**
     * @description 提交表单
     */
    handleSubmit(e) {
      e.preventDefault();
      if(this.dialogType == 0) {
        // 添加
        this.handleAddSort()
      } else {
        // 编辑
        this.handleEditSort()
      }
    },
    /**
     * @description 添加分类
     */
    handleAddSort() {
      this.form.validateFields((err, values) => {
        if (!err) {
          api.navMenu.createNewSort(values)
            .then(res => {
              if(!res.success) {
                this.$message.error(res.msg);
              } else {
                this.$message.success(res.msg);
                this.visible = false;
                this.getApiNavMenu();
              }
            })
            .catch(e => {
              this.$message.error(e.message);
            })
        }
      });
    },
    /**
     * @description 编辑分类
     */
    handleEditSort() {
      this.form.validateFields((err, values) => {
        if (!err) {
          let d = {...values, id: this.editId}
          console.log(d)
          api.navMenu.updateSort(d)
            .then(res => {
              if(!res.success) {
                this.$message.error(res.msg);
              } else {
                this.$message.success(res.msg);
                this.visible = false;
                this.getApiNavMenu();
              }
            })
            .catch(e => {
              this.$message.error(e.message);
            })
        }
      });
    },
    /**
     * @description 删除分类
     */
    handleDeleteSort(item) {
      this.$confirm({
        title: `确定要删除《${item.title}》分类吗？`,
        content: "该分类下面的所有接口也将一并删除",
        onOk: async () => {
          let d = {id: item._id};
          let res = await api.navMenu.deleteSort(d);
          this.$message.success(res.msg);
          // 这边使用箭头函数固定this
          this.getApiNavMenu();
        },
        onCancel() {},
      });
    }
  },
};
</script>

<style lang="less" scoped>
.base-info {
  padding: 12px;
  .tool-bar {
    margin-bottom: 12px;
  }
}
</style>