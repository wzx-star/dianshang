<template>
  <div class="good-list">
    <div class="good-item" v-for="item in goodsList" :key="item.id" @click="getDetail(item.id)">
      <img
        :src="item.images"
        alt=""
      />
      <h1 class="title">{{item.theme}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥23</span>
          <span class="old">$dsa</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>省90</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      pageindex:1,
      goodsList:[]
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    getGoodsList(){
      this.$http.get('goodsList?pageIndex='+this.pageindex).then(result=>{
        if(result.body){
          this.goodsList=this.goodsList.concat(result.body);
        } 
      })
    },
    getMore(){
      this.pageindex++;
      this.getGoodsList();
    },
    getDetail(id){
    //  this.$router.push('/home/goodsinfo/'+id);
    //  this.$router.push({path:'/home/goodsinfo/'+id});
    this.$router.push({ name: 'goodsinfo', params: { id}})
    
    }
  },
};
</script>

<style lang="scss" scoped>
.good-list {
  display: flex;
  flex-wrap: wrap;
  padding: 6px;
  justify-content: space-between;
  margin: 3px 0;
  .good-item {
    padding: 2px;
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 210px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }
    }
  }
}
</style>