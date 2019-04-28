<template>
  <div class="home_back">
    <p class="home_title">elm后台管理系统</p>
    <div class="home_login">
      <el-input
        v-model="user"
        placeholder="用户名"
        class="home_user"
        v-on:change="homeInput"
        placement
      ></el-input>
      <p class="home_hint">
        <span v-show="user_hint" class="user_hint">请输入用户名</span>
      </p>
      <el-input
        placeholder="密码"
        v-model="pass"
        show-password
        v-on:change="homePass"
        class="home_pass"
      ></el-input>
      <p class="home_hint">
        <span v-show="pass_hint" class="user_hint">请输入密码</span>
      </p>
      <el-button plain @click="open6" class="home_login_but">
        登录
      </el-button>
      <p class="home_login_hint">
        温馨提示：<br />未登录过的新用户，自动注册<br />注册过的用户可凭账号密码登录
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      msg: "home",
      user: "",
      pass: "",
      pass_hint: false,
      user_hint: false
    };
  },
  methods: {
    homeInput: function(val) {
      console.log(val);
      if (val.length === 0) {
        this.user_hint = true;
      } else {
        this.user_hint = false;
      }
    },
    homePass: function(val) {
      console.log(val);
      if (val.length === 0) {
        this.pass_hint = true;
      } else {
        this.pass_hint = false;
      }
    },
    open6() {
      if (this.user.length === 0 || this.pass.length === 0) {
        this.$notify.error({
          title: "错误",
          message: "请输入正确的用户名密码"
        });
      } else {
        let data = {
          user_name: this.user,
          password: this.pass
        };
        this.axios
          .post("https://elm.cangdu.org/admin/login", data)
          .then(res => {
            if (res.data.success) {
              this.setCookie('user',this.user,7)
              this.setCookie('pass',this.pass,7)
              this.$router.push({ path: "/a" });
            } else {
              this.$notify.error({
                title: "错误",
                message: res.data.message
              });
            }
          });
      }
    },
    setCookie(name, value, day) {
       if(day !== 0){     //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
         var expires = day * 24 * 60 * 60 * 1000;
        var date = new Date(+new Date()+expires);
         document.cookie = name + "=" + escape(value) + ";expires=" + date.toUTCString();
      }else{
         document.cookie = name + "=" + escape(value);
      }
    }
  }
};
</script>
<style scoped>
.home_back {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #324057;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.home_title {
  font-size: 35px;
  color: #fff;
}
.home_login {
  width: 350px;
  height: 240px;
  background: #fff;
  border-radius: 5px;
  padding: 25px;
}
.home_login_but {
  width: 100%;
  font-size: 16px;
  background: #4db3ff;
  color: #fff;
}
.home_login_hint {
  font-size: 12px;
  color: red;
}
.user_hint {
  float: left;
  font-size: 12px;
  color: red;
}
.home_hint {
  height: 24px;
  margin: 0;
  padding: 0;
}
</style>
