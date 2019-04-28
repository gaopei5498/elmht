<template>
  <div>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column type="index" width="100"> </el-table-column>
      <el-table-column property="registe_time" label="日期" width="300">
      </el-table-column>
      <el-table-column property="username" label="姓名" width="300">
      </el-table-column>
      <el-table-column property="city" label="地址"> </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="100"
        :current-page="pageNo"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Userlist",
  data() {
    return {
      msg: "A",
      currentPage1: 5,
      total: 20,
      tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
      pageNo: 1
    };
  },
  mounted() {
    this.axios.get("https://elm.cangdu.org/v1/users/count").then(res => {
      this.total = res.data.count;
    });
    if (this.getCookie("pageNo")) {
      this.pageNo = this.getCookie("pageNo");
      this.axios
        .get(
          "https://elm.cangdu.org/v1/users/list?offset=" +
            (this.pageNo * 20 - 20) +
            "&limit=20"
        )
        .then(res => {
          this.tableData = res.data;
        });
    } else {
      this.axios
        .get("https://elm.cangdu.org/v1/users/list?offset=0&limit=20")
        .then(res => {
          this.tableData = res.data;
        });
    }
  },
  methods: {
    //设置cookie
    setCookie(name, value, day) {
      if (day !== 0) {
        //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
        var expires = day * 24 * 60 * 60 * 1000;
        var date = new Date(+new Date() + expires);
        document.cookie =
          name + "=" + escape(value) + ";expires=" + date.toUTCString();
      } else {
        document.cookie = name + "=" + escape(value);
      }
    },
    //获取名为name的cookie值
    getCookie(name) {
      var strcookie = document.cookie; //获取cookie字符串
      var arrcookie = strcookie.split("; "); //分割
      //遍历匹配
      for (var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] == name) {
          return arr[1];
        }
      }
      return "";
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.setCookie("pageNo", val, 7);
      this.axios
        .get(
          "https://elm.cangdu.org/v1/users/list?offset=" +
            (val * 20 - 20) +
            "&limit=20"
        )
        .then(res => {
          this.tableData = res.data;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
