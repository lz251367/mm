import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 模块

// 处理错误
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};
import login from '../views/login/login.vue'

const routes = [
    {
        path: '/login',
        component: login
    }
];
const router = new VueRouter({
    routes
})

export default router