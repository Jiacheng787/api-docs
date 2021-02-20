<template>
  <a-drawer
    title="接口调试"
    :width="720"
    :visible="visible"
    @close="handleClose"
  >
    <a-alert
      message="仅支持application/json类型，query和path参数请在url中添加！"
      banner
      style="margin-bottom: 12px"
    />
    <a-input-group compact>
      <a-select v-model="form.reqMethod" style="width: 15%">
        <a-select-option value="GET"> GET </a-select-option>
        <a-select-option value="POST"> POST </a-select-option>
        <a-select-option value="PUT"> PUT </a-select-option>
        <a-select-option value="DELETE"> DELETE </a-select-option>
      </a-select>
      <a-input-search
        v-model="form.reqUrl"
        enter-button="发送"
        @search="handleSubmit"
        :loading="isLoading"
      />
    </a-input-group>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="请求头部">
        <a-form :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }">
          <a-form-item
            label="后端环境"
            extra="后端环境地址，例如：10.3.71.102:7897"
          >
            <a-input v-model="form.backend" />
          </a-form-item>
          <a-form-item
            label="请求头部"
            extra="键值对组合，例如：Authorization: Bearer xxx"
          >
            <a-input v-model="form.token" />
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" tab="请求参数">
        <Editor
          ref="debugger-editor"
          v-model="form.content"
          @init="editorInit"
          lang="json"
          theme="chrome"
          width="100%"
          height="200"
        ></Editor>
      </a-tab-pane>
    </a-tabs>
    <div class="response">
      <div class="status-bar">
        <span class="status-item">状态码：{{ resData.status }}</span>
        <span class="status-item">耗时：{{ resData.timing }}ms</span>
        <span>大小：{{ resData.size }}B</span>
      </div>
      <a-tabs default-active-key="1" size="small">
        <a-tab-pane key="1" tab="响应内容">
          <Editor
            v-model="resData.data"
            @init="editorInit"
            lang="json"
            theme="chrome"
            width="100%"
            height="400"
          ></Editor>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-drawer>
</template>

<script>
import api from "@/api";
import { mapGetters } from "vuex";
export default {
  name: "debugger-drawer",
  components: {
    Editor: require("vue2-ace-editor"),
  },
  data() {
    return {
      visible: false,
      isLoading: false,
      form: {
        reqMethod: "GET",
        reqUrl: "",
        backend: "",
        token: "",
        content: "",
      },
      resData: {
        data: "", // 接口回传数据
        status: "--", // 状态码
        timing: "--", // 耗时 (ms)
        size: "--", // 大小 (B)
      },
    };
  },
  computed: {
    ...mapGetters(["apiDetail"]),
  },
  watch: {
    visible: function handler(val) {
      if (val) {
        const { summary, reqExample } = this.apiDetail;
        this.form.reqMethod = summary.method;
        this.form.reqUrl = summary.url;
        this.form.content = reqExample
          ? JSON.stringify(reqExample, null, 4)
          : "";
        // 初始化响应数据
        Object.assign(this.resData, {
          data: "",
          status: "--",
          timing: "--",
          size: "--",
        });
      }
    },
  },
  methods: {
    editorInit: function (editor) {
      require("brace/ext/language_tools"); //language extension prerequsite...
      //   require("brace/mode/html");
      require("brace/mode/javascript"); //language
      //   require("brace/mode/less");
      require("brace/mode/json");
      require("brace/theme/chrome");
      require("brace/snippets/javascript"); //snippet
    },
    handleOpen() {
      this.visible = true;
    },
    handleClose() {
      this.visible = false;
    },
    formValidate() {
      return new Promise((resolve, reject) => {
        if (!this.form.reqUrl) {
          reject("请填写请求url！");
          return;
        }
        if (!this.form.backend) {
          reject("请填写后端环境！");
          return;
        }
        if (!this.form.token) {
          reject("请填写请求头部！");
          return;
        }
        resolve();
      });
    },
    async handleSubmit() {
      try {
        await this.formValidate();
        this.isLoading = true;
        api.apiDebug
          .debugger(this.form)
          .then((res) => {
            if (res.success) {
              Object.assign(this.resData, {
                data: res.data.data ? JSON.stringify(res.data.data, null, 4) : "",
                status: res.data.status,
                timing: res.data.timing.contentDownload,
                size: res.data.size,
              });
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((e) => {
            this.$message.error(e.message);
          })
          .finally(() => {
            this.isLoading = false;
          })
      } catch (e) {
        this.$message.error(e);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.ant-input-group.ant-input-group-compact {
  display: flex;
}
.response {
  position: relative;
  .status-bar {
    position: absolute;
    right: 0;
    top: 4px;
    .status-item {
      margin-right: 12px;
    }
  }
}
</style>