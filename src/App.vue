<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import baimiApi from './api/baimiApi'
  export default {
    name: 'App',
    created () {
      baimiApi.login({username: 'shen', password: '123456'})
        .then(response => {
          window.console.log(response)
        })
        .catch((err)=>{
          window.console.log(err)
        })
    }
  }
</script>

<style>
  html,body{
    width: 100%;
    height: 100%;
    overflow: auto;
    margin: 0;
    padding: 0;
  }
  #app {
    width: 100%;
    height: 100%;
  }
</style>
