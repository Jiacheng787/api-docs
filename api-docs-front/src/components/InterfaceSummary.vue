<template>
  <div class="interface-summary">
    <div class="detail-header">
      <a-descriptions :title="summary.title"></a-descriptions>
      <div class="button-group">
        <a-button
          type="primary"
          style="margin-right: 12px"
          @click="openDebuggerPanel"
        >
          <a-icon type="tool" />
          调试
        </a-button>
        <a-button style="margin-right: 12px" @click="handleUpdateDetail">
          <a-icon type="edit" />
          编辑
        </a-button>
        <a-button type="danger" @click="handleDeleteDetail">
          <a-icon type="delete" />
          删除
        </a-button>
      </div>
    </div>
    <div
      class="summary"
      :style="{ background: colorMap[summary.method || 'GET'].summary }"
    >
      <div
        class="summary-met"
        :style="{ background: colorMap[summary.method || 'GET'].met }"
      >
        {{ summary.method }}
      </div>
      <div class="summary-pet">{{ summary.url }}</div>
    </div>
    <a-descriptions title="" :column="2">
      <a-descriptions-item label="请求数据类型">
        {{ summary.consumes }}
      </a-descriptions-item>
      <a-descriptions-item label="响应数据类型">
        {{ summary.produces }}
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
export default {
  name: "interface-summary",
  props: {
    summary: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      reuqestMethod: "POST",
      colorMap: {
        GET: {
          summary: "rgba(97,175,254,.1)",
          met: "#61affe",
        },
        POST: {
          summary: "rgba(73,204,144,.1)",
          met: "#49cc90",
        },
        PUT: {
          summary: "rgba(250,173,20,.1)",
          met: "#faad14",
        },
        DELETE: {
          summary: "rgba(255,77,79,.1)",
          met: "#ff4d4f",
        },
      },
    };
  },
  methods: {
    openDebuggerPanel() {
      this.$emit("openDebuggerPanel");
    },
    handleUpdateDetail() {
      this.$emit("onUpdateDetail");
    },
    handleDeleteDetail() {
      this.$emit("onDeleteDetail");
    }
  },
};
</script>

<style lang="less" scoped>
.interface-summary {
  .detail-header {
    display: flex;
    justify-content: space-between;
    .button-group {
      display: flex;
    }
  }
  .summary {
    display: flex;
    align-items: center;
    height: 38px;
    margin-bottom: 12px;
    .summary-met {
      font-size: 14px;
      font-weight: 700;
      width: 80px;
      height: 32px;
      padding: 6px 15px;
      text-align: center;
      border-radius: 3px;
      text-shadow: 0 1px 0 rgb(0 0 0 / 10%);
      font-family: Titillium Web, sans-serif;
      color: #fff;
    }
    .summary-pet {
      padding: 0 32px;
    }
  }
}
</style>