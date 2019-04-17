<template>
  <div class="m-layout">
    <div class="m-content">
      <side-menu theme="light" :menuList="menuList" :active-name="$route.name">
        <div class="logo-con">
          <img :src="maxLogo" key="max-logo" />
        </div>
      </side-menu>
      <div class="m-right-wrap">
        <m-header>Header</m-header>
        <div :style="{margin: '16px'}" class="content-wrapper">
          <div>
            <Breadcrumb>
              <BreadcrumbItem v-for="item in breadCrumbList" :key="item.name">{{item.meta.title}}</BreadcrumbItem>
            </Breadcrumb>
            <div style="margin-top: 8px;">
              <keep-alive :include="cacheList">
                <router-view/>
              </keep-alive>
              <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="m-footer">Footer</div>
  </div>
</template>

<script>
  import maxLogo from '@/assets/images/baimilogo.png'
  import sideMenu from './side-menu.vue'
  import mHeader from './header.vue'
  import ABackTop from './a-back-top/index.vue'
  import { mapMutations } from 'vuex'
  import routers from '@/router/router'
  import config from '../config'
  const { menuList } = config
export default {
  name: 'mainWrap',
  components: {
    sideMenu,
    mHeader,
    ABackTop
  },
  watch: {
    '$route' (newRoute) {
      this.setBreadCrumb(newRoute)
    }
  },
  props: {
  },
  computed: {
    breadCrumbList () {
      return this.$store.state.app.breadCrumbList
    }
  },
  data () {
    return {
      maxLogo,
      cacheList: [],
      menuList: menuList
    }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setHomeRoute'
    ])
  },
  mounted () {
    this.setHomeRoute(routers)
    this.setBreadCrumb(this.$route)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '../theme/var.less';
  .m-layout{
    height: 100%;
    background: @background-color;
  }
  .m-content{
    height: calc(~'100% - 20px');
  }
  .m-right-wrap{
    margin-left: 220px;
  }
  .m-footer{
    position: absolute;
    bottom: 0;
    height: 20px;
    width: 100%;
    background-color: #42b983;
  }
  .logo-con{
    height: 64px;
    line-height: 64px;
    border-bottom: 1px solid #fff;
    text-align: center;
  }
  .logo-con img{
    vertical-align: middle;
  }
  .content-wrapper{
    height: calc(~'100% - 20px');
    overflow: auto;
  }
</style>
