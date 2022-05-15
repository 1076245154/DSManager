<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }
    
    html,
    body {
        width: 100%;
        height: 100%;
    }
    
    #app {
        width: 100%;
        height: 100%;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #666;
    }
    
    .el-submenu__title:hover {
        background-color: rgba(64, 158, 255, 0.2) !important;
    }
    
    .el-menu-item:hover {
        background-color: rgba(64, 158, 255, 0.2) !important;
    }
    
    .el-menu {
        border-right: none!important;
    }
</style>