<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表区 -->
      <div class="mui-card" v-for="(item, i) in goodList" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
            @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"
            ></mt-switch>
            <img :src="item.images" alt="" />
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p>
                <span class="price">${{ item.num }}</span>
                <numbox
                  :goodsid="item.id"
                  :initcount="$store.getters.getGoodsCount[item.id]"
                ></numbox>
                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- 结算区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
            <div class="left">
              <p>总计（不含运费）</p>
              <p>已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件，总价<span class="red">{{$store.getters.getGoodsCountAndAmount.amount}}</span>元</p>
            </div>
             <mt-button type="danger">去结算</mt-button>
          </div>
         
        </div>
      </div>
      <p></p>
    </div>
  </div>
</template>

<script>
import numbox from "../subcomponents/shopcar_numbox.vue";
export default {
  data() {
    return {
      goodList: [],
    };
  },
  created() {
    this.getGoodLists();
  },
  methods: {
    getGoodLists() {
      var idArr = [];
      this.$store.state.car.forEach((item) => {
        idArr.push(item.id);
      });

      if (idArr.length <= 0) {
        return;
      }
      this.$http.get("getGoodList/" + idArr.join(",")).then((result) => {
        this.goodList = result.body;
      });
    },
    remove(id, index) {
      this.goodList.splice(index, 1);
      this.$store.commit("remove", id);
    },
    selectedChanged(id,val){
      console.log(id,val);
      this.$store.commit('updateGoodsSelected',{id,selected:val})
    }
  },
  components: {
    numbox,
  },
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: 700;
      }
    }
  }
  .jiesuan{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .red{
    color: red;
    font-weight: 700;
    font-size: 16px;
  }
}
</style>
