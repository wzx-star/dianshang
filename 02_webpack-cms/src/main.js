import Vue from 'vue'
import app from './app.vue'
// 导入路由包
import VueRouter from 'vue-router'
// 安装路由模块
Vue.use(VueRouter);
// 导入自己router.js模块
import router from './router.js'
// 注册vuex
import Vuex from 'vuex'
Vue.use(Vuex);
var car = JSON.parse(localStorage.getItem('car') || '[]');
var store = new Vuex.Store({
    state: {
        car: car//将购物车中数据用数组存储起来
    },
    mutations: {

        addToCar(state, goodsinfo) {
            var flag = false;
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true;
                }
            })
            if (!flag) {
                state.car.push(goodsinfo)
            }
            //当更新car之后，把car数组存储到本地的localStorage
            localStorage.setItem('car', JSON.stringify(state.car));

        },
        update(state, goodsinfo) {
            state.car.some(item => {
                if (item.id = goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count);
                    return true;
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        remove(state, id) {
            console.log(4);
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1);
                    return true
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        updateGoodsSelected(state, info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected;
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car));
        }
    },
    getters: {
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCount(state) {
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.count;
            })
            return o;
        },
        getGoodsSelected(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state) {
            var o = { count: 0, amount:0};
            state.car.forEach(item=>{
                if(item.selected==true){
                    o.count+=item.count;
                    o.amount=item.price*item.count;
                }
            })
            return o
        }
        
    }
})
// 导入mui组件

import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
// 轮播图mint-ui组件
// import { Swipe, SwipeItem } from 'mint-ui';
// import { Lazyload } from 'mint-ui';
// import { Header,Button } from 'mint-ui'
// Vue.component(Header.name, Header);
// Vue.use(Lazyload);
// Vue.component(Swipe.name, Swipe);
// Vue.component(Button.name, Button);
// Vue.component(SwipeItem.name, SwipeItem);

import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'
// 导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource);
// 全局配置请求根路径
// 定义全局过滤器
import moment from 'moment'
Vue.filter('dataFormat', function (dataStr, pattern = "YYYY-MM-DD") {
    return moment(dataStr).format(pattern)
})
// 安装图片预览插件
import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview)
// 设置post全局post的时候表单数据格式
Vue.http.options.emulateJSON = true;
Vue.http.options.root = 'http://127.0.0.1:8080';
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,   //挂载路由对象到vm实例上
    store
});