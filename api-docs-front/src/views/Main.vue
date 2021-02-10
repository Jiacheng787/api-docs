<template>
  <div class="main">
    <div class="header">
      <span>
        <a-icon type="money-collect" />
        <span class="title">api-docs 接口文档</span>
      </span>
      <a-popover>
        <template slot="content">
          <a>退出登录</a>
        </template>
        <a-avatar size="large">USER</a-avatar>
      </a-popover>
    </div>
    <div class="body">
      <div class="left-aside">
        <a-menu
          style="width: 100%;"
          v-model="selectedKeys"
          mode="inline"
          @click="handleClick">
          <a-menu-item key="-1">
            <a-icon type="profile" />
            首页
          </a-menu-item>

          <a-sub-menu v-for="(item, itemIndex) in navMenu" :key="itemIndex">
            <span slot="title">
              <a-icon :type="item.icon" />
              <span>{{ item.title }}</span>
            </span>
            <a-menu-item v-for="(child, childIndex) in item.children" :key="`${itemIndex}-${childIndex}`">
              <!-- <a-icon :type="child.icon" /> -->
              <span>{{ child.title }}</span>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
export default {
  name: 'menu-list',
  data() {
    return {
      selectedKeys: ["-1"],
      navMenu: []
    }
  },
  // watch: {
  //   '$route': {
  //     handler(to, from) {
  //       // 监听路由变化激活菜单
  //       this.navMenu.forEach((item, index) => {
  //         if (to.path.includes(item.path)) {
  //           this.selectedKeys = [`${index}`];
  //         }
  //       })
  //     },
  //     immediate: true
  //   }
  // },
  mounted() {
    this.getApiNavMenu()
  },
  methods: {
    getApiNavMenu() {
      api.systemInfo.getApiList()
        .then(res => {
          this.navMenu = res.data;
        })
        .catch(e => {
          this.$message.error(e.message);
        })
    },
    handleClick(e) {
      if (e.key == "-1") {
        this.$router.push(`/docs`);
        return
      }
      const selected = e.key.split("-"),
            selectedItem = selected[0],
            selectedChild = selected[1];
      const path = this.navMenu[selectedItem].children[selectedChild].path;
      if (this.$route.params.id !== path) {
        this.$router.push(`/docs/${path}`);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    flex-basis: 60px;
    flex-shrink: 0;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    color: aliceblue;
    background: rgb(84, 92, 100);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    .title {
      margin-left: 12px;
    }
    .user-avatar {
      cursor: pointer;
    }
  }
  .body {
    flex-grow: 1;
    display: flex;
    .left-aside {
      flex-basis: 256px;
      flex-shrink: 0;
    }
    .content {
      flex-grow: 1;
      padding: 12px;
      height: calc(100vh - 60px);
      overflow-y: auto;
    }
  }
}
</style>