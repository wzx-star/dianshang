<template>
    <div>
       <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.images">
					<router-link :to="'/home/newsInfo/'+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.images">
						<div class="mui-media-body">
							<h1>{{item.theme}}</h1>
							<p class='mui-ellipsis'>
                                <span>发表时间:{{item.time|dataFormat}}</span>
                                <span>点击:{{item.num}}次</span>
                            </p>
						</div>
					</router-link>
				</li>
				
			

			</ul>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
    data(){
        return {
            newsList:[]
        };
    },
    created() {
        this.getNewsList();
    },
    methods:{
        getNewsList(){
        this.$http.get("newsList").then(result => {
        if (result.body.message) {
          // 如果没有失败，应该把数据保存到 data 上
          this.newsList = result.body.message;
          console.log(result.body);
         
        } else {
          Toast("获取新闻列表失败！");
        }
      });
        }
    }
}
</script>
<style lang="scss" scoped>
.mui-table-view{
    li{
        h1{
            font-size: 14px;
        }
        .mui-ellipsis{
            font-size:12px;
            color: #222aff;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>