<template>
  <div class="pageWrap">
    <div class="searchArea">
      <div class="searchWrap">
        <div class="searchItem">
          <el-input placeholder="姓名" v-model="name" clearable>
          </el-input>
        </div>
        <div class="searchItem">
          <el-select v-model="sex" placeholder="性别">
            <el-option v-for="item in sexList" :key="item.value" :label="item.text" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="searchBtn">
        <el-button type="primary" plain>搜索</el-button>
        <el-button plain>重置</el-button>
      </div>
    </div>
    <div class="listArea">
      <div class="operateRow">
        <div class="operateBtn" @click="addUser">新增</div>
        <div class="operateBtn">编辑</div>
      </div>
      <div class="tableLis">
        <table class="commonTable">
          <tr>
            <th>序号</th>
            <th>姓名</th>
            <th>性别</th>
            <th>年龄</th>
            <th>操作</th>
          </tr>
          <template v-for="(item,index) in contentList">
            <tr>
              <td>{{index+1}}</td>
              <td>{{item.name}}</td>
              <td>{{item.sex}}</td>
              <td>{{item.age}}</td>
              <td>
                <div class="editBtn">编辑</div>
              </td>
            </tr>
          </template>
        </table>
      </div>
    </div>
    <div class="page">
      <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10"
        layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="新增用户信息" :visible.sync="showDia" center width="30%">
      <div class="dialogWrap">
        <div class="row">
          <div class="rowTitle">姓名</div>
          <div class="rowContent">
            <el-input placeholder="姓名" v-model="formData.name" clearable>
            </el-input>
          </div>
        </div>
        <div class="row">
          <div class="rowTitle">性别</div>
          <div class="rowContent">
            <el-select v-model="formData.sex" placeholder="性别">
              <el-option v-for="item in sexList" :key="item.value" :label="item.text" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="row">
          <div class="rowTitle">年龄</div>
          <div class="rowContent">
            <el-input placeholder="年龄" v-model="formData.age" clearable>
            </el-input>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDia = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'userManage',
    data() {
      return {
        name: '', //姓名
        sex: '', //性别
        showDia: false, //显示弹框
        sexList: [{
          text: '男',
          value: 1,
        }, {
          text: '女',
          value: 2,
        }], //性别列表
        contentList: [{
          name: '张三',
          sex: '男',
          age: 12
        }],
        currentPage: 1, //当前页码
        total: 10, //内容总条数
        formData: {
          name: '',
          age: '',
          sex: ''
        }
      };
    },
    created() {},
    methods: {
      addUser() {
        this.showDia = true;
      },
      //分页
      handleCurrentChange() {

      }
    }
  }

</script>
<style lang="less" scoped>

</style>
