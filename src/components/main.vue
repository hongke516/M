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
export default {
  name: 'main',
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
      menuList: [{
        iframeMenu: ['网站运营'],
        title: '揽件管理',
        name: '0',
        children: [
          {title: '平台揽件', name: '1', children: [{title: '新建揽件', name: 'newTook'},
              {title: '快捷揽件补录', name: 'tookEnter'},
              {title: '揽件未支付', name: 'tookUnpay'},
              {title: '揽件查询', name: 'tookQuery'}]},
          {title: '快递接件', name: '2'},
          {title: '快递员工派件', name: '3'}
          ]
      }]
    }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setHomeRoute'
    ]),
    handleScroll (val) {
      console.log(3, val)
    }
  },
  mounted () {
    window.addEventListener('onscroll', this.handleScroll);
    window.addEventListener('click', this.handleScroll);
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
    height: calc(100% - 20px);
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
    height: calc(100% - 20px);
    overflow: auto;
  }
</style>
