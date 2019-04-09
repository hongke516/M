<template>
  <div class="layout">
    <Layout class="layout">
      <Layout class="layout">
        <Sider>
          <side-menu theme="light" :menuList="menuList" :active-name="$route.name">
            <div class="logo-con">
              <img :src="maxLogo" key="max-logo" />
            </div>
          </side-menu>
        </Sider>
        <Layout class="layout">
          <Header>Header</Header>
          <Content :style="{margin: '16px'}" class="content-wrapper">
            <Layout>
              <Breadcrumb>
                <BreadcrumbItem v-for="item in breadCrumbList" :key="item.name">{{item.meta.title}}</BreadcrumbItem>
              </Breadcrumb>
              <Content>
                <keep-alive :include="cacheList">
                  <router-view/>
                </keep-alive>
                <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
              </Content>
            </Layout>
          </Content>
        </Layout>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  </div>
</template>

<script>
  import maxLogo from '@/assets/images/baimilogo.png'
  import sideMenu from './side-menu.vue'
  import ABackTop from './a-back-top/index.vue'
  import { mapMutations } from 'vuex'
  import routers from '@/router/router'
export default {
  name: 'main',
  components: {
    sideMenu,
    ABackTop
  },
  watch: {
    '$route' (newRoute) {
      console.log(2, newRoute)
      this.setBreadCrumb(newRoute)
    }
  },
  props: {
  },
  computed: {
    breadCrumbList () {
      console.log(this.$store.state.app.breadCrumbList)
      return this.$store.state.app.breadCrumbList
    }
  },
  data () {
    return {
      maxLogo,
      cacheList: [],
      menuList: [{
        iframeMenu: ['网站运营'],
        title: '快递管理',
        name: '0',
        children: [{title: '快递查询', name: 'home'}, {title: '快递接件', name: '2'}, {title: '快递员工派件', name: '3'}]
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
<style scoped>
  .layout{
    height: 100%;
  }
  .ivu-layout-footer{
    padding: 0;
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
