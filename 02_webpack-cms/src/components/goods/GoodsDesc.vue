<template>
    <div class="goodsdesc-container">
        <h3>{{info.theme}}</h3>
        <hr>
        <div class="content" v-html="info.theme">
           
        </div>
         <img :src="info.images" alt="">
    </div>
</template>
<script>
export default {
    data(){
        return {
            info:{}
        };
    },
    created() {
        this.getGoodSDesc();
    },
    methods: {
        getGoodSDesc(){
            this.$http.get('newsInfo/'+this.$route.params.id).then(result=>{
               if(result.body){
                   this.info=result.body[0];
               }
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.goodsdesc-container{
    padding: 4px;
    h3{
        font-size: 16px;
        color: #226aFF;
        text-align: center;
        margin: 15px 0;
    }
    img{
        width: 100%;
    }
}
</style>