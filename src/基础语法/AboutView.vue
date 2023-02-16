<template>
  <div class="about">
    <h1>Vue3 的生命周期</h1>
    
    <div id="dom" >
      {{ msg }}
      <!-- v-on:事件名="事件方法" 简写 @事件名="事件方法"-->
      <button v-on:click="handleClick">Click me</button>
      <hr>
      <!-- v-model:双向绑定 -->
      <!-- input:输入事件
          blur: 失去焦点
          focus: 获取焦点
          change: 内容更改
      -->
      <input v-model="userName" type="text" placeholder="请输入姓名"><br/><br/>
      <input @focus="focusInput" @blur="blurInput" @change="changeInput" v-model="userPhone" type="text" placeholder="请输入手机号"><br/><br/>
      <textarea v-model="userInput" placeholder="倾诉" name="" id="" cols="30" rows="10"></textarea>
      <div>
        <p>你的姓名：{{ userName }}</p>
        <p>你的倾诉：{{ userInput }}</p>
        <p>电话号码：{{ userPhone }}</p>
      </div>
      <button @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
import {reactive, toRefs, onBeforeMount, onMounted,onBeforeUpdate,onUpdated} from 'vue'
export default {
  name:"about",
  setup(){
    const data =  reactive({
      msg:"你好！",
      userName:"",
      userInput:"",
      userPhone:""
    })

    
    // onBeforeMount(()=>{
    //   console.log("onBeforeMount",document.querySelector("#dom"));
    // })
    // onMounted(()=>{
    //   console.log("onMounted",document.querySelector("#dom"));
    // })
    // setTimeout(() => {
    //   data.msg = "hello"
    // }, 1000);

    // onBeforeUpdate(()=>{
    //   console.log("onBeforeUpdate",document.querySelector("#dom"));
    // })
    // onUpdated(()=>{
    //   console.log("onUpdated",document.querySelector("#dom"));
    // })

    // 事件及方法
    const handleClick=()=>{
      alert("Clicked!");
    }

    const focusInput=()=>{
      console.log("focus获取焦点");
    }
    
    const blurInput=()=>{
      console.log("blur失去焦点");
    }

    const changeInput=()=>{
      console.log("change内容更改");
    }
    const submit=()=>{
      alert(`${data.userName}`+"  的倾诉是："+`${data.userInput}`)
    }
    return {
      ...toRefs(data,),
      handleClick,
      submit,
      focusInput,
      blurInput,
      changeInput
    }
  }
}

</script>
