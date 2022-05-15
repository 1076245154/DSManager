<template>
  <div class="login">
    <div class="loginBox">
      <div class="left">
        <div class="logo">
          <img src="../assets/logo.png" />
        </div>
      </div>
      <div class="right">
        <div class="title">鼎硕文豪后台管理系统</div>
        <div class="row">
          <el-input
            placeholder="请输入内容"
            v-model="accout">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </div>
          <div class="row">
            <el-input
              placeholder="请输入内容"
              v-model="password">
              <i slot="prefix" class="el-input__icon el-icon-lock"></i>
            </el-input>
        </div>
        <div class="row" style="margin-top:60px">
          <el-button type="primary" round style="width:100%" @click="loginFn">登   录</el-button>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
  let vm = this;
export default {
  name: 'HelloWorld',
  data () {
    return {
      accout:'',//账号
      password:'',//密码
    }
  },
  created(){
    vm = this;
  },
  methods:{
    //登录方法
    loginFn(){
      this.$router.push({name:'home'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
 .login{
   width: 100%;
   height: 100%;
   overflow: hidden;
   background: url("../assets/bg.png") no-repeat;
   background-size: 100% auto;
   position: relative;
   .loginBox{
     width: 900px;
     height:500px;
     position: absolute;
     top:50%;
     left:50%;
     transform:translate(-50%,-50%);
     display: flex;
     flex-direction: row;
     align-items: center;
     .left{
       height: 100%;
       flex: 1;
       background: linear-gradient(160deg,#A5CFF6,#448BC6);
       position: relative;
       .logo{
        position: absolute;
         top:50%;
         left:50%;
         transform:translate(-50%,-50%);
         width:300px;
         img{
           max-width: 300px;
         }
       }
     }
     .right{
       height: 100%;
       flex: 1;
       background: #fff;
       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: center;
       position: relative;
       .title{
         font-size: 20px;
         font-weight:bold;
         position: absolute;
         top:30px;
         left:50%;
         transform:translateX(-50%);
       }
       .row{
         width: 80%;
         margin-bottom:20px;
         &:last-child{
          margin-bottom:0px;
         }
       }
     }
   }

 }
</style>
