<template>
  <div class="explain">
    <p>
      node-elm后台管理系统<br />

      第一次登录的用户自动注册成为普通管理员<br />

      普通管理员可以添加，修改信息<br />

      超级管理员可以删除信息
    </p>
  </div>
</template>

<script>
export default {
  name: "Explain",
  data() {
    return {
      msg: "A"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.explain{
    width: 100%;
    text-align: center;
    font-size: 20px;
    line-height: 50px;
}
</style>