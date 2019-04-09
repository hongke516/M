<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu ref="menu" v-show="!collapsed" :active-name="activeName" :open-names="openedNames" :accordion="accordion" :theme="theme" width="auto">
      <template v-for="item in menuList">
        <template v-if="item.children && item.children.length > 0">
          <Submenu :name="item.name" v-if="showChildren(item)" :key="`menu-${item.name}`">
            <template slot="title">
              <Icon type="ios-paper" />
              {{item.title}}
            </template>
            <menu-item :name="child.name" v-for="child in item.children" :key="child.name">
              <Icon type="md-heart" />{{child.title}}
            </menu-item>
          </Submenu>
        </template>
        <template v-else>
          <menu-item :name="getNameOrHref(item)" :key="`menu-${item.name}`"><common-icon :type="item.icon || ''"/><span>{{ showTitle(item) }}</span></menu-item>
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
<style scoped>

</style>
