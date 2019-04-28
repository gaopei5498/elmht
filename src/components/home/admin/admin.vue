 <template>
 <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="user_name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="日期"
        width="180">
      </el-table-column>
      
      <el-table-column
        prop="city"
        label="地址">
      </el-table-column>
       <el-table-column
        prop="admin"
        label="权限">
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="20"
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
  name: 'Admin',
  data () {
    return {
      msg: 'A',
      currentPage1: 5,
      total:20,
      pageNo:1,
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
          }]
    }
  },
  mounted() {
    this.axios.get("https://elm.cangdu.org/admin/count").then(res => {
      this.total = res.data.count;
    });
    if (this.getCookie("admin_pageNo")) {
      this.pageNo = this.getCookie("admin_pageNo");
      this.axios
        .get(
          "https://elm.cangdu.org/admin/all?offset=" +
            (this.pageNo * 20 - 20) +
            "&limit=20"
        )
        .then(res => {
            console.log(res)
          this.tableData = res.data.data;
        });
    } else {
      this.axios
        .get("https://elm.cangdu.org/admin/all?offset=0&limit=20")
        .then(res => {
            console.log(res)
          this.tableData = res.data.data;
        });
    }
  },
  methods: {
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
      this.setCookie("admin_pageNo", val, 7);
      this.axios
        .get(
          "https://elm.cangdu.org/admin/all?offset=" +
            (val * 20 - 20) +
            "&limit=20"
        )
        .then(res => {
            console.log(res.data)
          this.tableData = res.data.data;
        });
    },
    handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>