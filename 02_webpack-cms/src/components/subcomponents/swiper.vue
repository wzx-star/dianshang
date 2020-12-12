<template>
    <div>
        <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <!-- 在组件中，使用v-for循环的话，一定要使用 key -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item">
        <img :src="item" alt="">
      </mt-swipe-item>
    </mt-swipe>
    </div>
</template>
<script>
export default {
    props:['lunbotuList']
}
</script>
<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
   img{
     width: 100%;
     height: 200px;
   }
  }
}
</style>