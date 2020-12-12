<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <textarea
      placeholder="请输入要评论的内容，最多120字"
      maxlength="120"
      v-model="msg"
    ></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in comments" :key="item.time">
        <div class="cmt-title">
          第{{ i + 1 }}楼&nbsp;&nbsp;用户：{{
            item.theme
          }}&nbsp;&nbsp;发表时间：{{ item.time | dataFormat }}
        </div>
        <div class="cmt-body">
          {{ item.theme === "undefined" ? "此用户很懒，嘛都没说" : item.theme }}
        </div>
      </div>
    </div>
    <mt-button type="danger" plain size="large" @click="getMore"
      >加载更多</mt-button
    >
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageIndex: 1, // 默认展示第一页数据
      comments: [], // 所有的评论数据
      msg:''//评论输入的内容
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      this.$http
        .get("getcomments/" + this.id + "?pageIndex=" + this.pageIndex)
        .then((result) => {
          this.comments = this.comments.concat(result.body);
        });
    },
    getMore() {
      this.pageIndex++;
      this.getComments();
    },
    postComment(){
        // 发表评论
    if(this.msg.trim().length===0){
        return Toast('评论内容不能为空');
    }
    this.$http
        .post("postcomment/" + this.$route.params.id, {
          content: this.msg.trim()
        })
        .then(function(result){
           if(result.body==='ok'){
                var cmt = {
          
              time: Date.now(),
             theme: this.msg.trim()
            };
            this.comments.unshift(cmt);
            this.msg = "";
           }
        })
    }
  },
  props: ["id"],
};
</script>
<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 35px;
        background-color: #ccc;
      }
      .cmt-body {
        text-indent: 2em;
      }
    }
  }
}
</style>