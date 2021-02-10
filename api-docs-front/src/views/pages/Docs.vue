<template>
  <div class="overviews">
    <a-spin :spinning="spinning" size="large">
      <!-- 接口概览 -->
      <InterfaceSummary :summary="apiDetail.summary" />
      <!-- 接口描述 -->
      <InterfaceDescription :description="apiDetail.description" />
      <!-- 请求示例 -->
      <CodeExample :type="0" :example="apiDetail.reqExample" />
      <!-- 请求参数 -->
      <RequestParams :reqParams="apiDetail.reqParams" />
      <!-- 响应状态 -->
      <ResponseStatus :resStatus="apiDetail.resStatus" />
      <!-- 响应参数 -->
      <ResponseParams :resParams="apiDetail.resParams" />
      <!-- 响应示例 -->
      <CodeExample :type="1" :example="apiDetail.resExample" />
    </a-spin>
  </div>
</template>

<script>
import api from "@/api";
import InterfaceSummary from "@/components/InterfaceSummary";
import InterfaceDescription from "@/components/InterfaceDescription";
import RequestParams from "@/components/RequestParams";
import ResponseStatus from "@/components/ResponseStatus";
import ResponseParams from "@/components/ResponseParams";
import CodeExample from "@/components/CodeExample";
export default {
  name: "overviews",
  components: {
    InterfaceSummary,
    InterfaceDescription,
    RequestParams,
    ResponseStatus,
    ResponseParams,
    CodeExample,
  },
  data() {
    return {
      apiDetail: {},
      spinning: false,
    };
  },
  watch: {
    "$route.params.id": {
      handler(val) {
        console.log(val);
        this.getApiDetail(val);
      },
      immediate: true,
    },
  },
  methods: {
    getApiDetail(id) {
      this.spinning = true;
      api.systemInfo.getApiDetail(id)
        .then((res) => {
          console.log(res);
          this.apiDetail = res.data;
        })
        .catch(e => {
          this.$message.error(e.message);
        })
        .finally(() => {
          this.spinning = false;
        })
    },
  },
};
</script>

<style lang="less" scoped>
.overviews {
  padding: 12px;
}
</style>