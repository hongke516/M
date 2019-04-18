<template>
  <Card dis-hover>
    <img alt="Vue logo" src="../../assets/logo.png">
    <HelloWorld msg="Welcome to 333"/>
  </Card>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
