<template>
  <div class="code-example">
    <div class="sub-title">{{ codeType[type] }}</div>
    <Editor
      ref="editor"
      v-model="content"
      @init="editorInit"
      lang="json"
      theme="chrome"
      width="100%"
      :height="editorHeight"
    ></Editor>
  </div>
</template>

<script>
export default {
  name: "code-example",
  components: {
    Editor: require("vue2-ace-editor"),
  },
  props: {
    type: {
      type: Number,
      default: 0,
    },
    example: {
      type: [Object, Array],
      default: () => {
        return {};
      },
    },
  },
  watch: {
    example: {
      handler(val) {
        this.content = Object.keys(val).length ? JSON.stringify(val, null, 4) : "";
        this.$nextTick(() => {
          this.setEditorHeight();
        });
      },
      // immediate: true
    },
  },
  data() {
    return {
      content: "",
      editorHeight: "100",
      codeType: ["请求示例", "响应示例"],
    };
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
      editor.setReadOnly(true); // 编辑器设为只读
    },
    setEditorHeight() {
      const length = this.$refs.editor.editor.session.getLength(), // 编辑器代码行数
        height = length * 15, // 每行高度约14px
        minHeight = 64, // 设置最小高度
        maxHeight = 300; // 设置最大高度
      this.editorHeight = `${Math.min(Math.max(height, minHeight), maxHeight)}`;
    },
  },
};
</script>

<style lang="less" scoped>
.code-example {
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