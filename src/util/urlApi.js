import Vue from 'vue';
let prefix = process.env.NODE_ENV == 'development' ? 'api/' : 'api/' //api/
let postfix = process.env.NODE_ENV == 'development' ? '' : '';
let urlApi = {
    // 全局接口
    putInfoOrder: 'BoxOpen/putInfoOrder', //首页装修配置
};

urlApi = {...urlApi };

for (let url in urlApi) {
    urlApi[url] = prefix + urlApi[url] + postfix;
}

Vue.prototype.urlApi = urlApi;