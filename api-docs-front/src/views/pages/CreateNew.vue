<template>
  <div class="create-new">
    <a-spin :spinning="spinning" size="large">
      <a-page-header
        style="border: 1px solid rgb(235, 237, 240)"
        :title="type == 'create' ? '添加接口' : '编辑接口'"
        :sub-title="subTitle"
        @back="() => $router.go(-1)"
      >
        <template slot="extra">
          <a-button key="1" type="primary" @click="handleSave">
            {{ type == "create" ? "添加" : "保存" }}
          </a-button>
          <a-button key="2" @click="() => $router.go(-1)"> 取消 </a-button>
        </template>
        <a-row type="flex">
          <div class="docs-form-group">
            <div class="docs-form-title">接口名称：</div>
            <a-input v-model="form.title" />
          </div>

          <div class="docs-form-group">
            <a-input-group compact>
              <a-select v-model="form.reqMethod" style="width: 100px">
                <a-select-option value="GET"> GET </a-select-option>
                <a-select-option value="POST"> POST </a-select-option>
                <a-select-option value="PUT"> PUT </a-select-option>
                <a-select-option value="DELETE"> DELETE </a-select-option>
              </a-select>
              <a-input v-model="form.reqUrl" />
            </a-input-group>
          </div>

          <div class="docs-form-group" style="display: flex">
            <div class="docs-group-item" style="margin-right: 12px">
              <div class="docs-form-title">请求数据类型：</div>
              <a-select v-model="form.reqType" style="width: 400px">
                <a-select-option
                  v-for="(item, index) in contentType"
                  :key="index"
                  :value="item"
                >
                  {{ item }}
                </a-select-option>
              </a-select>
            </div>
            <div class="docs-group-item">
              <div class="docs-form-title">响应数据类型：</div>
              <a-select v-model="form.resType" style="width: 400px">
                <a-select-option
                  v-for="(item, index) in contentType"
                  :key="index"
                  :value="item"
                >
                  {{ item }}
                </a-select-option>
              </a-select>
            </div>
          </div>

          <div class="docs-form-group">
            <div class="docs-form-title">
              接口描述（可选，字段为空将不展示）：
            </div>
            <a-textarea
              v-model="form.description"
              :rows="4"
              placeholder="please enter url description"
            />
          </div>

          <div class="docs-form-group">
            <div class="docs-form-title">
              请求示例（可选，字段为空将不展示）：
            </div>
            <Editor
              v-model="form.reqExample"
              @init="editorInit"
              lang="json"
              theme="chrome"
              width="100%"
              height="200"
            ></Editor>
          </div>

          <div class="docs-form-group">
            <div class="docs-form-title">请求参数：</div>
            <EditableRequestParams :reqParams="form.reqParams" />
          </div>

          <div class="docs-form-group">
            <div class="docs-form-title">响应状态：</div>
            <EditableResponseStatus :resStatus="form.resStatus" />
          </div>

          <div class="docs-form-group">
            <div class="docs-form-title">响应参数：</div>
            <EditableResponseParams :resParams="form.resParams" />
          </div>

          <div class="docs-form-group">
            <div class="docs-form-title">
              响应示例（可选，字段为空将不展示）：
            </div>
            <Editor
              v-model="form.resExample"
              @init="editorInit"
              lang="json"
              theme="chrome"
              width="100%"
              height="200"
            ></Editor>
          </div>
        </a-row>
      </a-page-header>
    </a-spin>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import api from "@/api";
import EditableRequestParams from "@/components/editable/RequestParams";
import EditableResponseStatus from "@/components/editable/ResponseStatus";
import EditableResponseParams from "@/components/editable/ResponseParams";
export default {
  name: "create-new",
  components: {
    Editor: require("vue2-ace-editor"),
    EditableRequestParams,
    EditableResponseStatus,
    EditableResponseParams,
  },
  data() {
    return {
      type: "", // 组件类型
      subTitle: "",
      contentType: [
        "application/json",
        "application/octet-stream",
        "application/x-www-form-urlencoded",
        "multipart/form-data",
      ],
      spinning: false,
      form: {
        title: "",
        reqMethod: "GET",
        reqUrl: "",
        reqType: "application/json",
        resType: "application/json",
        description: "",
        reqExample: "",
        reqParams: [
          {
            name: "Authorization",
            description: "令牌",
            in: "header",
            required: "true",
            type: "string",
            format: "",
            key: 0,
          },
        ],
        resStatus: [
          {
            code: "200",
            description: "OK",
            schema: "",
            key: 0,
          },
          {
            code: "401",
            description: "Unauthorized",
            schema: "",
            key: 1,
          },
          {
            code: "403",
            description: "Fobidden",
            schema: "",
            key: 2,
          },
        ],
        resParams: [],
        resExample: "",
      },
      operationId: "", // 编辑状态下使用
    };
  },
  computed: {
    ...mapGetters(["navMenu", "apiDetail"]),
  },
  mounted() {
    this.type = this.$route.meta.type; // 获取组件类型
    if (this.type == "create") {
      // 创建
      const operationId = this.$route.params.id;
      this.subTitle = this.navMenu.find(
        (item) => item._id == operationId
      ).title;
    } else {
      // 编辑
      const {
        summary,
        description,
        reqParams,
        resStatus,
        resParams,
        reqExample,
        resExample,
        parentMenuId,
        _id,
      } = this.apiDetail;
      this.form.title = summary.title;
      this.form.reqMethod = summary.method;
      this.form.reqUrl = summary.url;
      this.form.reqType = summary.consumes;
      this.form.resType = summary.produces;
      this.form.description = description;
      this.form.reqParams = reqParams;
      this.form.resStatus = resStatus;
      this.form.resParams = resParams;
      this.form.reqExample = reqExample
        ? JSON.stringify(reqExample, null, 4)
        : "";
      this.form.resExample = resExample
        ? JSON.stringify(resExample, null, 4)
        : "";

      this.subTitle = this.navMenu.find(
        (item) => item._id == parentMenuId
      ).title;
      this.operationId = _id;
    }
  },
  methods: {
    ...mapActions(["getApiNavMenu"]),
    editorInit: function (editor) {
      require("brace/ext/language_tools"); //language extension prerequsite...
      //   require("brace/mode/html");
      require("brace/mode/javascript"); //language
      //   require("brace/mode/less");
      require("brace/mode/json");
      require("brace/theme/chrome");
      require("brace/snippets/javascript"); //snippet
    },
    handleSave() {
      let menuId = this.$route.params.id;
      let detail = {
        summary: {
          title: this.form.title,
          method: this.form.reqMethod,
          url: this.form.reqUrl,
          consumes: this.form.reqType,
          produces: this.form.resType,
        },
        description: this.form.description,
        reqParams: this.form.reqParams,
        resStatus: this.form.resStatus,
        resParams: this.form.resParams,
        reqExample: this.form.reqExample
          ? JSON.parse(this.form.reqExample)
          : null,
        resExample: this.form.resExample
          ? JSON.parse(this.form.resExample)
          : null,
      };
      this.spinning = true;
      if (this.type == "create") {
        // 添加接口详情
        api.apiDetail
          .createNewDetail(menuId, detail)
          .then((res) => {
            this.spinning = false;
            this.$message.success(res.msg);
            this.getApiNavMenu(); // 获取最新的分类菜单
            this.$router.push("/docs");
          })
          .catch((e) => {
            this.spinning = false;
            this.$message.error(e.message);
          });
      } else {
        // 编辑接口详情
        api.apiDetail
          .updateDetail(this.operationId, this.apiDetail.parentMenuId, detail)
          .then((res) => {
            this.spinning = false;
            this.$message.success(res.msg);
            this.getApiNavMenu(); // 获取最新的分类菜单
            this.$router.go(-1);
          })
          .catch((e) => {
            this.spinning = false;
            this.$message.error(e.message);
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.ant-input-group.ant-input-group-compact {
  display: flex;
}
.docs-form-group {
  width: 100%;
  margin-bottom: 12px;
  .docs-form-title {
    color: rgba(0, 0, 0, 0.85);
    font-weight: bold;
    font-size: 14px;
  }
}
</style>