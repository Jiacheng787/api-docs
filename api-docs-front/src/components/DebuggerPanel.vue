<template>
  <a-drawer
    title="接口调试"
    :width="720"
    :visible="visible"
    @close="handleClose"
  >
    <a-input-group compact>
      <a-select default-value="GET" style="width: 15%">
        <a-select-option value="GET"> GET </a-select-option>
        <a-select-option value="POST"> POST </a-select-option>
        <a-select-option value="PUT"> PUT </a-select-option>
        <a-select-option value="DELETE"> DELETE </a-select-option>
      </a-select>
      <a-input-search
        enter-button="发送"
        style="width: 80%"
        @search="onSearch"
      />
    </a-input-group>
    <a-form
      :form="form"
      :label-col="{ span: 3 }"
      :wrapper-col="{ span: 18 }"
      @submit="handleSubmit"
    >
      <a-form-item label="后端环境">
        <a-input
          v-decorator="[
            'note',
            { rules: [{ required: true, message: '请输入后端地址！' }] },
          ]"
        />
      </a-form-item>
      <a-form-item label="请求头部">
        <a-input
          v-decorator="[
            'note',
            { rules: [{ required: true, message: 'Please input your note!' }] },
          ]"
        />
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script>
export default {
  name: "debugger-drawer",
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    handleOpen() {
      this.visible = true;
    },
    handleClose() {
      this.visible = false;
    },
    onSearch() {},
    handleSubmit() {

    }
  },
};
</script>

<style lang="less" scoped>
</style>