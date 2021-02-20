<template>
  <div class="overviews">
    <a-spin :spinning="apiDetailSpinning" size="large">
      <!-- 接口概览 -->
      <InterfaceSummary
        :summary="apiDetail.summary"
        @openDebuggerPanel="openDebuggerPanel"
        @onUpdateDetail="handleUpdateDetail"
        @onDeleteDetail="handleDeleteDetail"
      />
      <!-- 接口描述 -->
      <InterfaceDescription
        v-show="apiDetail.description"
        :description="apiDetail.description"
      />
      <!-- 请求示例 -->
      <CodeExample
        v-show="apiDetail.reqExample"
        :type="0"
        :example="apiDetail.reqExample || {}"
      />
      <!-- 请求参数 -->
      <RequestParams :reqParams="apiDetail.reqParams" />
      <!-- 响应状态 -->
      <ResponseStatus :resStatus="apiDetail.resStatus" />
      <!-- 响应参数 -->
      <ResponseParams :resParams="apiDetail.resParams" />
      <!-- 响应示例 -->
      <CodeExample
        v-show="apiDetail.resExample"
        :type="1"
        :example="apiDetail.resExample || {}"
      />
    </a-spin>
    <DebuggerPanel ref="debugger-panel" />
  </div>
</template>

<script>
import api from "@/api";
import { mapGetters, mapActions } from "vuex";
import InterfaceSummary from "@/components/InterfaceSummary";
import InterfaceDescription from "@/components/InterfaceDescription";
import RequestParams from "@/components/RequestParams";
import ResponseStatus from "@/components/ResponseStatus";
import ResponseParams from "@/components/ResponseParams";
import CodeExample from "@/components/CodeExample";
import DebuggerPanel from "@/components/DebuggerPanel";
export default {
  name: "overviews",
  components: {
    InterfaceSummary,
    InterfaceDescription,
    RequestParams,
    ResponseStatus,
    ResponseParams,
    CodeExample,
    DebuggerPanel,
  },
  data() {
    return {
      // apiDetail: {},
      // spinning: false,
    };
  },
  computed: {
    ...mapGetters(["apiDetail", "apiDetailSpinning"]),
  },
  watch: {
    "$route.params.id": {
      handler(val) {
        this.getApiDetail(val);
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions(["getApiDetail", "deleteApiDetail"]),
    openDebuggerPanel() {
      this.$refs["debugger-panel"].handleOpen();
    },
    handleUpdateDetail() {
      this.$router.push('/docs/edit')
    },
    handleDeleteDetail() {
      this.$confirm({
        title: `确认删除《${this.apiDetail.summary.title}》接口吗？`,
        content: '删除之后无法恢复',
        onOk: () => {
          let operationId = this.$route.params.id;
          let { parentMenuId } = this.apiDetail;
          this.deleteApiDetail({operationId, parentMenuId});
        },
        onCancel() {},
      });
    },
  },
};
</script>

<style lang="less" scoped>
.overviews {
  padding: 12px;
}
</style>