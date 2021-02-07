<template>
  <div class="main">
    <div class="header">
      Fin-stat管理平台
    </div>
    <div class="content">
      <div class="user-login">
        <div class="title">
          用户登录
        </div>
        <div class="rule-form">
          <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="handleSubmit"
          >
            <a-form-item>
              <a-input
                v-decorator="[
                  'username',
                  { rules: [{ required: true, message: '请输入用户名！' }] },
                ]"
                placeholder="用户名"
              >
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                v-decorator="[
                  'password',
                  { rules: [{ required: true, message: '请输入密码！' }] },
                ]"
                type="password"
                placeholder="密码"
              >
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-checkbox
                v-decorator="[
                  'remember',
                  {
                    valuePropName: 'checked',
                    initialValue: false,
                  },
                ]"
              >
                30天内免密登录
              </a-checkbox>
              <a-popover>
                <template slot="content">
                  <span>
                    <a-icon type="exclamation-circle" />
                    请及时与管理员联系
                  </span>
                </template>
                <a class="login-form-forgot">
                  忘记密码
                </a>
              </a-popover>
              <a-button type="primary" html-type="submit" class="login-form-button" :loading="loading">
                登录
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import { mapState } from 'vuex'
export default {
    name: "login",
    data() {
      return {
        loading: false,
      };
    },
    beforeCreate() {
      this.form = this.$form.createForm(this, { name: 'normal_login' });
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            this.loading = true;
            api.systemInfo.login(values)
              .then(res => {
                if (!res.success) {
                  this.$message.error(res.msg);
                } else {
                  console.log('登录成功')
                  this.$router.push('/fin-stat');
                }
              })
              .catch(e => {
                this.$message.error(e.message);
              })
              .finally(() => {
                this.loading = false;
              })
          }
        });
      },
    }
}
</script>

<style lang="less" scoped>
.main {
  height: 100%; /* 页面级组件需要指定高度 */
  display: flex;
  flex-direction: column;
  .header {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: aliceblue;
    background: rgb(84, 92, 100);
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
  .content {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .user-login {
      height: 400px;
      width: 400px;
      // display: flex;
      // flex-direction: column;
      // justify-content: space-between;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .title {
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
      }
      .rule-form {
        padding: 20px;
        padding-top: 0;
      }
    }
  }
}
</style>

<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>