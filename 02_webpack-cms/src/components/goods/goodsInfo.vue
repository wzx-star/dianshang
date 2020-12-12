<template>
  <div class="goods-container">
 <transition
 @before-enter="beforeEnter"
 @enter="enter"
 @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
 </transition>
    <!-- 商品轮播图 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotu"></swiper>
        </div>
      </div>
    </div>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{ goodsinfo.theme }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:<del>￥2399</del>&nbsp;&nbsp;销售价:<span class="now_price"
              >￥2199</span
            >
          </p>
          <p>购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.num"></numbox></p>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsinfo.pageIndex }}</p>
          <p>库存情况：{{ goodsinfo.num }}件</p>
          <p>上架时间：{{goodsinfo.time|dataFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" @click="goDesc(id)" plain>图文介绍</mt-button>

        <mt-button type="danger" size="large" @click="goComment(id)" plain>商品详情</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import swiper from "../subcomponents/swiper.vue";
// 导入数字选择框组件
import numbox from "../subcomponents/goodsinfo_numbox.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: [],
      goodsinfo: {},
      // 控制小球隐藏和显示
      ballFlag:false,
      selectedCount:1
    };
  },
  created() {
    this.getLunbotu(), this.getgoodsInfo();
  },
  methods: {
    getLunbotu() {
      this.$http.get("getcomments01/" + this.id).then((result) => {
        if (result.body) {
          var a = [];
          result.body.forEach((item) => {
            a.push(item.images);
          });
          this.lunbotu = a;
        }
      });
    },
    getgoodsInfo() {
      this.$http.get("newsInfo/" + this.id).then((result) => {
        if (result.body) {
          this.goodsinfo = result.body[0];
        }
      });
    },
    goDesc(id){
        this.$router.push({name:'goodsdesc',params:{id}})
    },
    goComment(id){
 this.$router.push({name:'goodscomment',params:{id}})
    },
    addToShopCar(){
      // 添加到购物车
      this.ballFlag=!this.ballFlag;
      var goodsinfo={ id:this.id, count: this.selectedCount,price:this.goodsinfo.num,selected:true};
      this.$store.commit('addToCar',goodsinfo);
    },
    beforeEnter(el){
      el.style.transform="translate(0,0)"
    },
     enter(el,done){
        el.offsetWidth;
        const ballPosition=this.$refs.ball.getBoundingClientRect();
        const badgePosition=document.getElementById('badge').getBoundingClientRect();
        const [x,y]=[badgePosition.left-ballPosition.left,badgePosition.top-ballPosition.top]
       
        el.style.transform=`translate(${x}px,${y}px)`;
        el.style.transition="all 0.5s  cubic-bezier(0.4, -0.3, 1.0, 0.68)";
        done();
      },
      afterEnter(el){
        this.ballFlag=!this.ballFlag
      },
      getSelectedCount(count){
        this.selectedCount=count;

      }
  },
  components: {
    swiper,
    numbox,
  }
};
</script>
<style lang="scss" scoped>
.goods-container {

  background-color: #eee;
  overflow: hidden;
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-header,
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball{
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 999;
    left: 146px;
    top: 390px;
  
  }
}
</style>