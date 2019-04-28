<template>
  <div>
    <div class="adminset">
      <p class="adminset_title">
        管理员信息
      </p>
      <div class="adminset_con">
        <p>{{ "姓名:" + name }}</p>
        <p>{{ "注册时间:" + create_time }}</p>
        <p>{{ "管理员权限" }}</p>
        <p>{{ "管理员id:" + id }}</p>
        <p>更换头像</p>
        <div class="admin_img">
          <input type="file" accept="image/*" @change="handFile($event)" />
          <img :src="avatar" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      name: "aa",
      create_time: "",
      id: null,
      avatar: ""
    };
  },
  mounted() {
    this.axios("https://elm.cangdu.org/admin/info").then(res => {
      console.log(res);
      this.name = res.data.data.user_name;
      this.create_time = res.data.data.create_time;
      this.id = res.data.data.id;
      this.avatar = "//elm.cangdu.org/img/" + res.data.data.avatar;
    });
  },
  methods: {
    //点击上传头像
    handFile(e) {
        console.log(e)
      e.preventDefault();
      let $target = e.target || e.srcElement;
      let file = $target.files[0];
      var reader = new FileReader();
      let formData = new FormData();
      formData.append("file", file);
      this.axios
        .post("https://elm.cangdu.org/admin/update/avatar/" + this.id, formData)
        .then(res => {
          console.log(res);
          avatar:"//elm.cangdu.org/img/"+res.data.image_path
        });
      reader.readAsDataURL(file);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.adminset {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.adminset_title {
  font-size: 25px;
}
.adminset_con {
  width: 50%;
  background: #f9fafc;
  padding: 0 20px 20px;
  border-radius: 5px;
  line-height: 50px;
}
.admin_img {
  width: 120px;
  height: 120px;
  border: 1px dashed black;
}
.admin_img input {
  display: block;
  position: absolute;
  width: 95%;
  height: 100%;
  opacity: 0;
}
.admin_img img {
  width: 100%;
}
</style>