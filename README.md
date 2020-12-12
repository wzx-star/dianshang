# 这是一个nb的项目
## 代码实行演绎
### 有灵魂的
#### 数据库
## [开源项目区别](https://www.v2ex.com/t/531283)
## 用传统的方式吧修改后的代码上传到码云
1. `git add  .`
2. `git commit -m "提交信息"`
3. `git  push`
## `git remote add origin https://gitee.com/wang-zhixin/template.git`
`git push -u origin master`

## 制作首页app组件
1. 完成Header区域,使用的是Mint-UI中的Header组件
2. 制作底部tabbar区域，使用的是mui的tabar.html
    + 在制作购物车小图标的时候，操作相对多一些
    + 先把扩展图标css的样式，拷贝到项目中
    + 再拷贝扩展字体库的ttf文件
    + 为购物车图标添加样式
3. 中间区域放置一个router-view来展示路由匹配到的组件

## 改造tabberbar为router-link
## 设置路由高亮

## 点击tabbar中的路由连接展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
1.  获取数据，如何获取，使用vue-resource
2.  使用vue-resource的this.$http.get获取数据
3.  配置全局路由Vue.http.options.root = '/root';
4.  获取到的数据要保存到data身上
5.  使用v-for循环渲染每个item项
   
## 服务器的地址`http://127.0.0.1:8080`
+ 项目开始前要先运行服务器
+ 获取轮播图地址`http://127.0.0.1:8080/lunbotu` 

## 改造九宫格区域样式

## 改造新闻资讯路由链接

## 新闻资讯页面制作
1. 绘制界面,使用`mui`中的media-list.html
2. 使用`vue-resource`获取数据
3. 渲染真实数据
4. 其中格式化时间可以用`moment`插件，也可以用padStart方法

## 实现新闻资讯列表，点击跳转到新闻详情
1. 把列表中的每一项改造为router-link,同时在跳转的时候应该提供唯一的id标识符($route.params.id获取/id形式传过来的参数)
2. 创建新闻详情页面组件NewsInfo.vue
3. 在路由模块中将新闻详情的路由地址和组件页面对应起来

## 实现新闻详情的页面布局和数据渲染

## 单独封装一个comment.vue子组件
1. 先创建一个单独的comment.vue组件模板
2. 在需要使用comment组件的页面中，先手动导入comment组件
3. 在父组件中使用`components`属性，将刚才导入的comment组件，注册为自己的子组件
4. 将注册子组件时候的注册名称以标签形式引用即可

## 获取所有评论数据显示到页面中

## 实现点击加载更多评论功能
1. 为加载按钮添加点击事件，在事件中，请求下一页数据
2. 点击加载按钮，让pageIndex加1，然后重新调用方法
3. 数组中拼接方法concat

## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定事件
3. 校验评论内容是否为空，如果为空则提示用户评论内容不能为空
4. 通过vue-resource发送一个请求，把评论内容发送给服务器
5. 当发表评论后重新刷新列表，已查看最新评论
   + 如果调用getComments方法刷新评论列表的话，可能只能得到最后一页的评论，前几页的评论获取不到
   + 当评论成功后，在客户端手动拼接最新的评论对象，然后调用数组的unshift方法，把最新的评论追加到data的comments中
  
## 改造图片分析,按钮为路由链接显示对应组件页面

## 绘制图片列表样式
1. 顶部滑动条制作
2. 制作底部图片列表
3. 滑动条无法正常触发滑动，通过检查官方文档发现这是一个js文件，需要初始化
   ```javascript
   mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
   });
   ```
4. 在初始化导入mui报错`Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them`
    + mui.js中用到这个，webpack打包默认启用严格模式,两者冲突
    + 禁用webpack打包时候的严格模式
         1. 安装`babel-plugin-transform-remove-strict-mode`
         2. 指定用户区域操作(谷歌浏览器提高流畅度)`touch-action: pan-y;`
         3. 初始化滚动条，要把他代码写入到`mounted`生命周期函数中
5. 获取所有分类，并渲染分类列表

## 制作图片列表区域
1. 图片列表使用懒加载，使用mint-UI提供的现成的组件,`lazy-load`
2. 渲染图片列表数据

## 实现图片图片懒加载美化和样式美化

## 实现点击图片跳转到图片详情页面
1. 改造li到router-link的时候需要使用tag属性指定要渲染为那种元素
## 实现详情页面的布局和美化，同时获取数据渲染页面

## 实现图片详情中缩略图的功能
1. 使用插件vue-preview这个缩略图插件
2. 获取到所有图片列表，然后使用v-for指令渲染数据
3. 每个图片中必须有w和h属性

## 绘制商品列表页面基本结构并美化

## 尝试在手机上去进行项目的预览和测试
1. 保证自己的手机正常运行
2. 要保证手机和电脑和开发项目的电脑处于同一个wifi环境中,也就是说手机可以访问到电脑ip
3. 打开自己的项目中package.json文件,在dev脚本中添加一个--host指令，把当前电脑主机的wifi IP地址设置为--host的指令值
   
## 加载商品列表中数据实现加载更多功能

## vue-router编程式导航
 1. 最简单的`this.$router.push("/home/goodsinfo/" + id);`
 2. 传递对象`this.$router.push({ path: "/home/goodsinfo/" + id });`
 3. 传递命名的路由

## 绘制商品详情页视图
+ 利用mui中的card组件

## 小球动画优化思路：
 1. 先分析导致 动画 不准确的 本质原因： 我们把 小球 最终 位移到的 位置，已经局限在了某一分辨率下滚动条未滚动的情况下；
 2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后， 问题就出现了；
3. 因此，我们经过分析，得到结论： 不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态这个坐标值；
 4. 经过分析，得出解题思路： 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， 值也求 差，得到 的结果，就是横纵坐标要位移的距离
 5. 如何 获取 徽标和小球的 位置  domObject.getBoundingClientRect()
   
## 过去dom元素距离窗口距离方法
+ domObject.getBoundingClientRect()
+ domObject.getBoundingClientRect().left获取元素距离窗口左边距离

## 使用vuex
>公共数据管理工具，它可以把一些共享的数据，保存到 vuex 中，方便 整个程序中的任何组件直接获取或修改我们的公共数据；
+ 安装`npm i npm install vuex --save`
+ 使用例子
    1.  ```javascript
          // 入口文件
          import Vue from 'vue'
          // 配置vuex的步骤
          // 1. 运行 cnpm i vuex -S 
          // 2. 导入包
          import Vuex from 'vuex'
          // 3. 注册vuex到vue中
          Vue.use(Vuex)
          // 4. new Vuex.Store() 实例，得到一个 数据仓储对象
          var store = new Vuex.Store({
            state: {
              // 大家可以把 state 想象成 组件中的 data ,专门用来存储数据的
              // 如果在 组件中，想要访问，store 中的数据，只能通过 this.$store.state.*** 来访问
              count: 0
            },
            mutations: {
              // 注意： 如果要操作 store 中的 state 值，只能通过 调用 mutations 提供的方法，才能操作对应的数据，不推荐直接操作 state 中的数据，因为 万一导致了数据的紊乱，不能快速定位到错误的原因，因为，每个组件都可能有操作数据的方法；
              increment(state) {
                state.count++
              },
              // 注意： 如果组件想要调用 mutations 中的方法，只能使用 this.$store.commit('方法名')
              // 这种 调用 mutations 方法的格式，和 this.$emit('父组件中方法名')
              subtract(state, obj) {
                // 注意： mutations 的 函数参数列表中，最多支持两个参数，其中，参数1： 是 state 状态； 参数2： 通过 commit 提交过来的参数；
                console.log(obj)
                state.count -= (obj.c + obj.d)
              }
            },
            getters: {
              // 注意：这里的 getters， 只负责 对外提供数据，不负责 修改数据，如果想要修改 state 中的数据，请 去找 mutations
              optCount: function (state) {
                return '当前最新的count值是：' + state.count
              }
              // 经过咱们回顾对比，发现 getters 中的方法， 和组件中的过滤器比较类似，因为 过滤器和 getters 都没有修改原数据， 都是把原数据做了一层包装，提供给了 调用者；
              // 其次， getters 也和 computed 比较像， 只要 state 中的数据发生变化了，那么，如果 getters 正好也引用了这个数据，那么 就会立即触发 getters 的重新求值；
            }
          })

         


          import App from './App.vue'

          const vm = new Vue({
            el: '#app',
            render: c => c(App),
            store // 5. 将 vuex 创建的 store 挂载到 VM 实例上， 只要挂载到了 vm 上，任何组件都能使用 store 来存取数据
          })
          ```
   2. 调用总结
      ```javascript
       // 总结：
          // 1. state中的数据，不能直接修改，如果想要修改，必须通过 mutations
          // 2. 如果组件想要直接 从 state 上获取数据： 需要 this.$store.state.***
          // 3. 如果 组件，想要修改数据，必须使用 mutations 提供的方法，需要通过 this.$store.commit('方法的名称    '， 唯一的一个参数)
          // 4. 如果 store 中 state 上的数据， 在对外提供的时候，需要做一层包装，那么 ，推荐使用 getters, 如果需要    使用 getters ,则用 this.$store.getters.***
      ```

## 利用vuex存储购物车信息
+ { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }

## 持久化存储数据
1. 每次刚进入 网站，肯定会 调用 main.js 在刚调用的时候，先从本地存储中，把 购物车的数据读出来，放到 store 中
  var car = JSON.parse(localStorage.getItem('car') || '[]')
2. 问题：如何从购物车中获取商品的数量呢 -->
    + 我们可以先创建一个 空对象，然后循环购物车中所有商品的数据， 把 当前循环这条商品的 Id， 作为 对象 的 属性名，count值作为 对象的 属性值，这样，当把所有的商品循环一遍，就会得到一个对象： { 88: 2, 89: 1, 90: 4 }