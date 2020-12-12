<template>
    <div class="newsInfo">
        <!-- 标题 -->
        <h3 class="title">{{newsinfo.theme}}</h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>时间:{{newsinfo.time|dataFormat}}</span>
            <span>点击:{{newsinfo.num}}次</span>
        </p>
        <hr>
        <!-- 内容区 -->
        <div class="content" v-html="newsinfo.theme"></div>
        <!-- 评论区 -->
        <comment-box :id="this.id"></comment-box>
    </div>    
</template>
<script>
// 导入评论子组件
import comment from '../subcomponents/comment.vue'
export default {
    data(){
        return {id:this.$route.params.id,newsinfo:{}}
    },
    created() {
        this.getNewsInfo();
    },
    methods: {
        getNewsInfo(){
            this.$http.get('newsInfo/'+this.id).then(result=>{
               this.newsinfo=result.body[0];
            });
        }
    },
    components:{
        // 用来注册子组件的节点
        'comment-box':comment
    }
}
</script>
<style lang="scss">
.newsInfo{
    padding: 0 4px;
    .title{
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: red;
       
    }
     .subtitle{
            font-size: 13px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
}
</style>