import Vue from 'vue'
import axios from 'axios'
import Qs from 'qs'
let vm = new Vue();
let requestUrl = {};

export default {
    /**
     ajax方法
     */
    ajax(obj) {
        let _this = this;
        if (requestUrl[obj.url] && JSON.stringify(obj.data) === requestUrl[obj.url]) {
            return;
        }
        //检测传入数据类型
        if (typeof obj !== "object") {
            console.warn('参数必须是对象');
            return
        }
        let data = {};
        data = obj.data ? obj.data : {};
        data = _this.htmlDecodeAll(data);
        if (JSON.stringify(data) !== "{}") {
            data = Qs.stringify(data);
        } else {
            data = null;
        }
        axios({
            // `url` 是用于请求的服务器 URL
            url: obj.url,

            // `method` 是创建请求时使用的方法
            method: obj.method ? obj.method : 'post', // 默认是 get

            // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
            // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL

            // `transformRequest` 允许在向服务器发送前，修改请求数据
            // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
            // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
            transformRequest: [function(data) {
                // 对 data 进行任意转换处理
                return data;
            }],

            // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
            transformResponse: [function(data) {
                // 对 data 进行任意转换处理
                return data;
            }],

            // `headers` 是即将被发送的自定义请求头
            headers: { 'X-Requested-With': 'XMLHttpRequest' },

            // `params` 是即将与请求一起发送的 URL 参数
            // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
            params: {},
            // `paramsSerializer` 是一个负责 `params` 序列化的函数
            // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
            paramsSerializer: function(params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
            // `data` 是作为请求主体被发送的数据
            // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
            // 在没有设置 `transformRequest` 时，必须是以下类型之一：
            // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
            // - 浏览器专属：FormData, File, Blob
            // - Node 专属： Stream
            data: data,
            // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
            // 如果请求话费了超过 `timeout` 的时间，请求将被中断
            timeout: typeof(obj.timeout) == 'number' ? obj.timeout : 50000,
            // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
            responseType: 'json', // 默认的
            // `maxContentLength` 定义允许的响应内容的最大尺寸
            maxContentLength: 2000,
            // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
            validateStatus: function(status) {
                let message;
                switch (status) {
                    case 400:
                        message = '请求错误';
                        break;
                    case 401:
                        message = '未授权，请登录';
                        break;
                    case 403:
                        message = '拒绝访问';
                        break;
                    case 404:
                        message = `请求地址出错: ${obj.url}`;
                        break;
                    case 408:
                        message = '请求超时'
                        break;
                    case 500:
                        message = '服务器内部错误'
                        break;
                    case 501:
                        message = '服务未实现'
                        break;
                    case 502:
                        message = '网关错误'
                        break;
                    case 503:
                        message = '服务不可用'
                        break;
                    case 504:
                        message = '网关超时'
                        break;
                    case 505:
                        message = 'HTTP版本不受支持'
                        break;
                    default:
                        break;
                }
                if (message) {
                    vm.$message({
                        message: message,
                        type: 'warning'
                    });

                }
                return status >= 200 && status < 300; // 默认的
            },
        }).then(function(e) {
            if (obj.success) {
                obj.success(JSON.parse(e.data))
            }
            if (obj.complete) {
                obj.complete()
            }
        }).catch(function(e) {
            if (obj.fail) {
                obj.fail(e)
            }
            if (obj.complete) {
                obj.complete()
            }
        });
    },
    htmlDecodeAll(data) {
        if (typeof data == 'object' && JSON.stringify(data) != '{}') {
            let dataStr = JSON.stringify(data);
            dataStr = this.htmlDecode(dataStr);
            try {
                JSON.parse(dataStr);
            } catch (e) {
                dataStr = JSON.stringify(data);
            } finally {
                data = JSON.parse(dataStr);
            }
        }
        return data;
    },
    //解码html
    htmlDecode(html) {
        if (!html) return '';
        html = html.replace(/&bksh;/g, '\\');
        let el = document.createElement('div');
        el.innerHTML = html;
        let output = el.innerText;
        el = null;
        return output;
    },
    //编码html
    htmlEncode(html) {
        if (!html) return '';
        let el = document.createElement('div');
        'textContent' in el ? (el.textContent = html) : (el.innerText = html);
        let output = el.innerHTML;
        el = null;
        return output;
    },
    getUrlParameters(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return '';
    },
    /**
     * 对Date的扩展，将 Date 转化为指定格式的String
     * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2018-01-12 08:09:04.423
     * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2018-01-12 8:9:4.18
     * @param fmt
     * @returns {*}
     * @constructor
     */
    dateFormat(date, fmt) { // author: meizz
        if (!date) return '';
        if (typeof date === 'string') date = date.replace(/-/g, '/');
        if (!date.hasOwnProperty('getMonth')) date = new Date(date);
        let o = {
            "M+": date.getMonth() + 1, // 月份
            "d+": date.getDate(), // 日
            "h+": date.getHours(), // 小时
            "m+": date.getMinutes(), // 分
            "s+": date.getSeconds(), // 秒
            "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
            "S": date.getMilliseconds()
                // 毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (let k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    },
    /**
     * 检测一个值是否非空
     * @param val 要检测的值
     * @return boolean 检测结果
     */
    isEmpty(val) {
        if (typeof val === 'number') {
            return !isFinite(val); // 排除NaN和Infinity
        }
        if (Array.isArray(val)) {
            if (val.length === 0) {
                return true;
            } else {
                return false;
            }
        }
        if (typeof val === 'object') {
            if (JSON.stringify(val) === '{}' || val === null) {
                return true;
            } else {
                return false;
            }
        }
        return (!val || val === undefined || typeof val === 'undefined' || val === null || !val.trim())
    },
    /**
     * 中文验证
     * @param value 
     * @return boolean
     * */
    decideChinese(value) {
        let reg = /^[\u4E00-\u9FA5]{0,}$/;
        return !reg.test(value);
    },
    /**
     * 手机验证
     * @param value 
     * @return boolean
     * */
    decidePhone(value) {
        let reg = /^0?1[3476589]\d{9}$/;
        return !reg.test(value);
    },
    /**
     * 邮箱验证
     * @param value 
     * @return boolean
     * */
    decideEmail(value) {
        let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        return !reg.test(value);
    },
    getAgeStr(val) {
        let data = sessionStorage.getItem('ageList');
        let arr = JSON.parse(data);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].value == val) {
                return arr[i].text;
            }
        }
        return ''
    },
    getSignStr(val) {
        let data = sessionStorage.getItem('signsList');
        let arr = JSON.parse(data);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].value == val) {
                return arr[i].text;
            }
        }
        return ''
    }

}