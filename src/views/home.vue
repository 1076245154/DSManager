<template>
  <div class="home">
    <div class="navWrap">
      <div class="logo">
        <img src="../assets/logo.png" />
      </div>
      <el-menu
        :default-active="currentIndex"
        class="el-menu-vertical-demo"
        background-color="#fff"
        text-color="#666"
        @select="selectNav"
        active-text-color="#409EFF">
        <template v-for="(item,index) in navList">
          <template v-if="item.children.length>0">
            <el-submenu :index="index+''">
              <template slot="title">
                <span>{{item.name}}</span>
              </template>
<template v-for="(sitem,sindex) in item.children">
                <el-menu-item :index="index+'-'+sindex">{{sitem.name}}</el-menu-item>
              </template>
</el-submenu>
</template>
<template v-else>
            <el-menu-item :index="index+''">
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </template>
</template>
</el-menu>
</div>
<div class="contentWrap">
    <div class="toparea">
        <div class="taplist">
            <template v-for="(item,index) in tabList">
            <div class="tapItem" :class="currentIndex==item.index?'selectItem':''">
              {{item.name}}
              <i class="el-icon-circle-close" @click="closeTab(index)"></i>
            </div>
          </template>
        </div>
        <el-popover placement="bottom-start" width="60" trigger="click">
            <div class="list">
                <div class="listItem">
                    基本信息
                </div>
                <div class="listItem">
                    退出登录
                </div>
            </div>
            <div slot="reference">你好,<span style="color:#409EFF">xxxx</span></div>
        </el-popover>
    </div>
    <div class="contentArea">
        <router-view></router-view>
    </div>
</div>
</div>
</template>
<script>
    import navData from '../util/config.js'
    export default {
        name: 'home',
        data() {
            return {
                navList: [], //目录列表
                currentIndex: '0', //当前目录
                tabList: [{
                    children: [],
                    index: "0",
                    name: "首页",
                    path: "index",
                }], //打开的目录列表
            };
        },
        created() {
            this.navList = navData;
        },
        methods: {
            //选择目录
            selectNav(index, indexPath) {
                this.currentIndex = index;
                let num = index.replace('-', '');
                let arr = num.split('');
                if (arr.length == 1) {
                    let obj = this.navList[Number(arr[0])];
                    let cloneObj = JSON.parse(JSON.stringify(obj));
                    cloneObj.index = index;
                    let bol = this.judgeTap(cloneObj);
                    if (!bol) {
                        this.tabList.push(cloneObj);
                    }
                    this.openTab(cloneObj.path);
                }
                if (arr.length == 2) {
                    let obj = this.navList[Number(arr[0])].children[Number(arr[1])];
                    let cloneObj = JSON.parse(JSON.stringify(obj));
                    cloneObj.index = index;
                    let bol = this.judgeTap(cloneObj);
                    if (!bol) {
                        this.tabList.push(cloneObj);
                    }
                    this.openTab(cloneObj.path);
                }
            },
            //打开目录
            openTab(path) {
                if (path == '') {
                    return;
                }
                this.$router.push({
                    path: path
                })
            },
            //判断是否存在已打开的目录
            judgeTap(obj) {
                for (let i = 0; i < this.tabList.length; i++) {
                    let item = this.tabList[i];
                    if (obj.name == item.name) {
                        return true;
                    }
                }
                return false;
            },
            //关闭目录
            closeTab(index) {
                this.tabList.splice(index, 1);
            }
        }
    }
</script>
<style lang="less" scoped>
    .home {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        overflow-y: hidden;
        .navWrap {
            width: 200px;
            height: 100%;
            background: #fff;
            padding: 12px;
            .logo {
                height: 40px;
                text-align: center;
                img {
                    max-height: 40px;
                }
            }
        }
        .contentWrap {
            flex: 1;
            height: 100%;
            background: #F6F7FC;
            padding-left: 20px;
            display: flex;
            flex-direction: column;
            .toparea {
                width: 100%;
                height: 40px;
                line-height: 40px;
                border-bottom: 2px solid #409EFF;
                padding-right: 12px;
                box-sizing: border-box;
                font-size: 12px;
                display: flex;
                flex-direction: row;
                .taplist {
                    flex: 1;
                    padding-top: 8px;
                    overflow-x: auto;
                    .tapItem {
                        float: left;
                        padding: 0 6px;
                        line-height: 30px;
                        padding-right: 26px;
                        cursor: pointer;
                        background: #fff;
                        margin-right: 6px;
                        position: relative;
                        i {
                            font-size: 16px;
                            position: absolute;
                            top: 50%;
                            right: 4px;
                            transform: translateY(-50%);
                        }
                        &.selectItem {
                            background: #409EFF;
                            color: #fff;
                        }
                    }
                }
            }
            .contentArea {
                flex: 1;
            }
        }
    }
    
    .list {
        .listItem {
            line-height: 40px;
            text-align: left;
            border-bottom: 1px solid #d2d2d2;
            cursor: pointer;
            &:hover {
                color: #409EFF;
            }
            &:last-child {
                border-bottom: none;
            }
        }
    }
</style>