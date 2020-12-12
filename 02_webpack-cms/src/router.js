
import VueRouter from 'vue-router'
// 导入对应路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photo/photoList.vue'
import PhotoInfo from './components/photo/photoInfo.vue'
import GoodList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/goodsInfo.vue'
import GoodDesc from './components/goods/GoodsDesc.vue'
import GoodsComment from './components/goods/Goodscomment.vue'
var router = new VueRouter({
    routes: [
      {path:'/',redirect:'/home'},
      {path:'/home',component:HomeContainer},
      {path:'/member',component:MemberContainer},
      {path:'/shopcar',component:ShopcarContainer},
      {path:'/search',component:SearchContainer},
      {path:'/home/newsList',component: NewsList},
      {path:'/home/newsInfo/:id',component:NewsInfo},
      {path:'/home/photoList',component:PhotoList},
      {path:'/home/photoinfo/:id',component:PhotoInfo},
      {path:'/home/goodsList',component:GoodList}, 
      {path:'/home/goodsinfo/:id',component:GoodsInfo,name:'goodsinfo'},
      {path:'/home/goodsdesc/:id',component:GoodDesc,name:'goodsdesc'},
      {path:'/home/goodscomment/:id',component:GoodsComment,name:'goodscomment'}
    ],
    linkActiveClass:'mui-active'//覆盖默认路由高亮类router-link-active
});
export default router