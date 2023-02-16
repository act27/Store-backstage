<template>
  <h1>hello world!</h1>
  <p v-text="name"></p>
  <p>{{ name }}</p>
  <p v-html="info"></p>
  <p v-bind:data="dataVal">我有属性data</p>
  <p :class="isred">我是红色的</p>
  <!-- v-if -->
  <!-- v-show -->
  <p v-if="isFalse">我是v-if我会改变Dom渲染</p>
  <p v-else>我是v-else</p>
  <p v-show="isTrue">我是v-show我只修改css的display</p>

  <!-- for循环 -->
  <ul>
    <!-- v-for=(每一个对象的变量，下表) in 数组 ;   必须加 :key='index' 以优化性能-->
    <li v-for="(item,index) in userList" :key="index">
      姓名：{{ item.username }}
      年龄：{{ item.age }}
    </li>
  </ul>
</template>

<script>
import { reactive,toRefs } from 'vue'

export default {
  name:"home",
  setup() {
    // beforeCreate 和 created 连接两个生命周期
    const data = reactive({
      name:"act27",
      age:23,
      info:"<i>我是斜体字</i>",
      dataVal:2333,
      isred:"red",
      isTrue:true,
      isFalse:false,
      userList:[
        {
          username:"张山",
          age:19
        },{
          username:"李斯",
          age:23
        },
        {
          username:"王武",
          age:18
        },
        {
          username:"赵六",
          age:21
        },
        {
          username:"叶文洁",
          age:20
        }
      ]
    })

    return {
      ...toRefs(data)
    }
  }

}

</script>
<style>
.red{
  color: red;
}</style>
