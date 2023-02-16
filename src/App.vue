<template>
  <!-- <nav>
    相当于a标签，to="路由path"
    <router-link to="/">Home</router-link> |  
    <router-link to="/about">About</router-link>
  </nav> -->
  <!-- router-view:展示路由对应的组件内容 -->
  <router-view/>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
.page_content{
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 20px;
  background-color: #fff;
  margin-top: 1.5rem;
}
</style>
