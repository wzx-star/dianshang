<template>
  <div class="photoinfo-container">
    <h3>{{ photoinfo.theme }}</h3>
    <p class="subtitle">
      <span>发表时间:{{ photoinfo.time | dataFormat }}</span>
      <span>点击次数:{{ photoinfo.num }}</span>
    </p>
    <hr />
    <!-- 缩略图区域 -->
    <div class="thubs">
        <img
      class="preview-img"
      v-for="(item, index) in list"
      :src="item.images"
      height="100"
      @click="$preview.open(index, list)"
      :key="item.id"
    />
    </div>
    <!-- 图片内容区 -->
    <div class="content" v-html="photoinfo.theme"></div>
    <!--评论子组件  -->
    <cmt-box :id="id"></cmt-box>
  </div>
</template>
<script>
// 导入评论子组件
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoinfo: {},
      list: []//缩略图
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs()
  },
  methods: {
    getPhotoInfo() {
      this.$http.get("newsInfo/" + this.id).then((result) => {
        this.photoinfo = result.body[0];
      });
    },
   getThumbs() {
      // 获取缩略图
      this.$http.get("getcomments01/" + this.id).then(result => {
        if (result.body) {
            
          // 循环每个图片数据，补全图片的宽和高
          result.body.forEach(item => {
            item.w = 600;
            item.h = 400;
          });
          // 把完整的数据保存到 list 中
          this.list = result.body;
        }
      });
    }
  },
  components: {
    // 注册 评论子组件
    "cmt-box": comment,
  },
};
</script>
<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
  .thubs{
      img{
          margin: 10px;
          box-shadow: 0 0  8px #999;
      }
  }
}
</style>