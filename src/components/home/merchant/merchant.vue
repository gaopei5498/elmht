<template>
  <div class="mer">
    <div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="店铺名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="店铺介绍">
                <span>{{ props.row.description }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="评分">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="销售量">
                <span>{{ props.row.recent_order_num }}</span>
              </el-form-item>
              <el-form-item label="分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column label="商品名称" prop="name"> </el-table-column>
        <el-table-column label="商铺地址" prop="address"> </el-table-column>
        <el-table-column label="商铺介绍" prop="description"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button size="mini" @click="handleSet(scope.$index, scope.row)"
              >添加食品</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
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
    <div class="com"></div>
    <div class="com_alert">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="店铺名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="店铺介绍">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺分类">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="button">
          <el-button>取消</el-button>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Merchant",
  data() {
    return {
      msg: "A",
      currentPage1: 5,
      total: 20,
      pageNo: 1,
      form: {
        name: "",
        region: "111",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      tableData: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987123",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987125",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          id: "12987126",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        }
      ]
    };
  },
  mounted() {
    this.axios
      .get("https://elm.cangdu.org/shopping/restaurants/count")
      .then(res => {
        this.total = res.data.count;
      });
    if (this.getCookie("mer_pageNo")) {
      this.pageNo = this.getCookie("mer_pageNo");
      this.axios
        .get(
          "https://elm.cangdu.org/shopping/restaurants?latitude=39.90469&longitude=116.407173&offset=" +
            (this.mer_pageNo * 20 - 20) +
            "&limit=20"
        )
        .then(res => {
          this.tableData = res.data;
        });
    } else {
      this.axios
        .get(
          "https://elm.cangdu.org/shopping/restaurants?latitude=39.90469&longitude=116.407173&offset=0&limit=20"
        )
        .then(res => {
          this.tableData = res.data;
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
      this.setCookie("mer_pageNo", val, 7);
      this.axios
        .get(
          "https://elm.cangdu.org/shopping/restaurants?latitude=39.90469&longitude=116.407173&offset=" +
            (val * 20 - 20) +
            "&limit=20"
        )
        .then(res => {
          console.log(res.data);
          this.tableData = res.data;
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleSet(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.com {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* display: none; */
  z-index: 10;
  background: black;
  opacity: 0.5;
}
.com_alert{
  position: fixed;
  top: 15%;
  bottom: 15%;
  left: 25%;
  right: 25%;
  padding: 10px;
  border-radius: 3px;
  /* display: none; */
  z-index: 11;
  background:#fff;
}
.button{
  text-align: right;
}
</style>