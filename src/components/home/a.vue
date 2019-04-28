<template>
  <div class="a_back">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside width="200px" style="background:#324057;">
        <el-menu active-text-color="#ffd04b" text-color='#fff' :default-openeds="['1', '3']" background-color="#1F2D3D">
          <el-menu-item index="0-1"
            ><i class="el-icon-menu"></i>首页</el-menu-item
          >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-document"></i>
              数据管理
            </template>
            <router-link to='/userlist'>
            <el-menu-item index="1-1">用户列表</el-menu-item>
            </router-link>
            <router-link to='/merchant'>
            <el-menu-item index="1-2">商家列表</el-menu-item>
            </router-link>
            <el-menu-item index="1-3">食品列表</el-menu-item>
            <router-link to='/order'>

            <el-menu-item index="1-4">订单列表</el-menu-item>
            </router-link>

            <router-link to='/admin'>
            <el-menu-item index="1-5">管理员列表</el-menu-item>
            </router-link>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-plus"></i>添加数据</template
            >
            <el-menu-item index="2-1">添加商铺</el-menu-item>
            <el-menu-item index="2-2">添加商品</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-star-on"></i>图表</template
            >
            <el-menu-item index="3-1">用户分布</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"
              ><i class="el-icon-edit"></i>编辑</template
            >
            <el-menu-item index="4-1">文本编辑</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"
              ><i class="el-icon-s-tools"></i>设置</template
            >
            <router-link to='/adminSet'>

            <el-menu-item index="5-1">管理员设置</el-menu-item>
            </router-link>

          </el-submenu>
          <el-submenu index="6">
            <template slot="title"
              ><i class="el-icon-warning"></i>说明</template
            >
          <router-link to='/explain'>

            <el-menu-item index="6-1">说明</el-menu-item>
            </router-link>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <div></div>
          <el-dropdown>
            <div class="user_img">
              <img :src="userImg" alt="">
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>首页</el-dropdown-item>
              <el-dropdown-item @click.native="singout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
  .a_back {
    position: fixed;
    top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.el-header {
  background-color: #eff2f7;
  color: #333;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-submenu__title {
  color: #bfcbd9;
}
.el-aside {
  color: #fff;
}
.el-menu-item {
  background: #1f2d3d;
  color: #bfcbd9;
}
.user_img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.user_img img{
  width: 100%;
  border-radius: 50%;
}
</style>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
    userImg:'',

      tableData: Array(20).fill(item)
    };
  },
  mounted(){
      this.axios('https://elm.cangdu.org/admin/info')
      .then((res)=>{
        this.userImg="//elm.cangdu.org/img/"+res.data.data.avatar
        console.log(this.userImg)
      })
    },
  methods: {
    
    clearCookie() {
      let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      if (keys) {
        for (var i = keys.length; i--; )
          document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString();
      }
    },
    singout() {
      this.clearCookie();
      this.$router.push({ path: "/" });
    }
  }
};
</script>