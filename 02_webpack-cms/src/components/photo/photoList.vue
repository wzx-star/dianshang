<template>
  <div>
    <!-- 顶部滑动条 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']"
            v-for="item in cates"
            :key="item.id"
            @click="getPhotoListByCateId(item.id)"
          >
            {{ item.title }}
          </a>
        </div>
      </div>
      <!-- 图片列表区域 -->
      <ul class="photo-list">
        <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
          <img v-lazy="item.images" />
          <div class="info">
            <h1 class="info-title">{{ item.theme }}</h1>
            <div class="info-body">{{ item.theme }}</div>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui";
// 初始化滑动文件

export default {
  data() {
    return {
      cates: [], // 所有分类的列表数组
      list: [], // 图片列表的数组
    };
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  created() {
    this.getAllCategory(),
      // 默认进入页面请求
      this.getPhotoListByCateId(0);
  },
  methods: {
    getAllCategory() {
      // 获取所有的图片分类
      this.$http.get("getimgcategory").then((result) => {
        if (result.body.message) {
          // 手动拼接出一个最完整的 分类列表
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cates = result.body.message;
        }
      });
    },
    getPhotoListByCateId(cateId) {
      this.$http.get("getimages/" + cateId).then((result) => {
        if (result.body) {
          this.list = result.body;
        }
      });
    },
  },
};
</script>
<style lang="scss">
* {
  touch-action: pan-x;
}
.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;

  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    padding-bottom: 0;
    box-shadow: 0 0 6px #999;
    position: relative;
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    img {
      width: 355px;
      height: auto;
      margin: auto;
      vertical-align: middle;
    }
    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>