<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu ref="menu" v-show="!collapsed" :active-name="activeName" :open-names="openedNames"
          :accordion="accordion" :theme="theme" width="220px" style="height: calc(100% - 84px);overflow: auto">
      <template v-for="item in menuList">
        <template v-if="item.children && item.children.length > 0">
          <Submenu :name="item.name" v-if="showChildren(item)" :key="`menu-${item.name}`">
            <template slot="title">
              <Icon type="ios-paper" />
              {{item.title}}
            </template>
            <div v-for="child in item.children" :key="child.name">
              <Submenu :name="child.name" v-if="showChildren2(child)" :key="`menu-${child.name}`">
                <template slot="title">
                  <Icon type="ios-paper" />
                  {{child.title}}
                </template>
                <menu-item :name="cc.name" v-for="cc in child.children" :key="cc.name" :to="{name: cc.name}">
                  <Icon type="md-heart" />{{cc.title}}
                </menu-item>
              </Submenu>
              <menu-item v-if="!showChildren2(child)" :name="child.name" :to="{name: child.name}">
                <Icon type="md-heart" />{{child.title}}
              </menu-item>
            </div>
          </Submenu>
        </template>
        <template v-else>
          <menu-item :name="getNameOrHref(item)" :key="`menu-${item.name}`"><Icon type="md-heart" /><span>{{ showTitle(item) }}</span></menu-item>
        </template>
      </template>
    </Menu>
  </div>
</template>
<script>
  export default {
    name: 'SideMenu',
    components: {
    },
    props: {
      collapsed: {
        type: Boolean
      },
      theme: {
        type: String,
        default: 'dark'
      },
      rootIconSize: {
        type: Number,
        default: 20
      },
      iconSize: {
        type: Number,
        default: 16
      },
      accordion: Boolean,
      activeName: {
        type: String,
        default: ''
      },
      openNames: {
        type: Array,
        default: () => []
      },
      menuList: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        openedNames: []
      }
    },
    methods: {
      showTitle (item) {
        return item.title
      },
      showChildren (item) {
        return item.children && (item.children.length > 1 || (item.meta && item.meta.showAlways))
      },
      showChildren2 (item) {
        return (item.children && item.children.length > 1)
      },
      getNameOrHref (item, children0) {
        return item.href ? `isTurnByHref_${item.href}` : (children0 ? item.children[0].name : item.name)
      }
    },
    computed: {
    },
    watch: {

    },
    mounted () {

    }
  }
</script>
<style scoped lang="less">
  @import '../theme/var.less';
  .side-menu-wrapper{
    position: absolute;
    height: 100%;
    background: @background-color;
  }
</style>
