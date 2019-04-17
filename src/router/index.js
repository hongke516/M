/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import { canTurnTo } from '@/libs/util'

Vue.use(Router)
const router = new Router({
    routes
})

router.beforeEach((to, from, next) => {
    canTurnTo(to.name, 'all', routes)
    next() // 跳转
})
export default router