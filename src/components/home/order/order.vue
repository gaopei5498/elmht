<template>
  <div>
      <div>
           <el-table
    :data="tableData"
    style="width: 100%"
     @expand-change="tableExpand"
     >
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="用户名">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺名称">
            <span>{{ props.row.restaurant_name }}</span>
          </el-form-item>
          
          <el-form-item label="收货地址">
            <span>{{ props.row.description }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.restaurant_id }}</span>
          </el-form-item>
          <el-form-item label="商铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          
        </el-form>
      </template>
    </el-table-column>
    
    <el-table-column
      label="订单ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="总价格"
      prop="total_amount">
    </el-table-column>
    <el-table-column
      label="订单状态"
      prop="status_bar.title">
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
  </div>
</template>

<script>
export default {
  name: "Merchant",
  data() {
      
    return {
      msg: "A",
      i:'',
      currentPage1: 5,
      total:20,
      pageNo:1,
       tableData: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }]
    };
  },
  mounted() {
    this.axios.get("https://elm.cangdu.org/bos/orders/count?restaurant_id=undefined").then(res => {
      this.total = res.data.count;
    });
    if (this.getCookie("order_pageNo")) {
      this.pageNo = this.getCookie("order_pageNo");
      this.axios
        .get(
          "https://elm.cangdu.org/bos/orders?offset=" +
            (this.pageNo * 20 - 20) +
            "&limit=20&restaurant_id=undefined"
        )
        .then(res => {
          this.tableData = res.data;
        });
    } else {
      this.axios
        .get("https://elm.cangdu.org/bos/orders?offset=0&limit=20&restaurant_id=undefined")
        .then(res => {
          this.tableData = res.data;
        });
    }
  },
  methods: {
    tableExpand(row){
      console.log(row)
      this.axios.get('https://elm.cangdu.org/shopping/restaurant/'+row.restaurant_id)
      .then(res=>{
        for(let i = 0; i<this.tableData.length;i++){
          if(this.tableData[i].id===row.id){
            this.tableData[i].address=res.data.address
            this.tableData[i].restaurant_name=res.data.name
            console.log(res.data.address)
          }
        }
          console.log(res.data)
          
      })
    },
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
      this.setCookie("order_pageNo", val, 7);
      this.axios
        .get(
         "https://elm.cangdu.org/bos/orders?offset=" +
            (val * 20 - 20) +
            "&limit=20&restaurant_id=undefined"
        )
        .then(res => {
            console.log(res.data)
          this.tableData = res.data;
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
</style>