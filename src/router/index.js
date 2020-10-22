/*
 * @Author: your name
 * @Date: 2020-05-30 08:59:07
 * @LastEditTime: 2020-06-05 09:59:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \echarts\src\router\index.js
 */
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

const originalReplace = Router.prototype.replace
Router.prototype.repalce = function replace(location) {
	return originalReplace.call(this, location).catch(err => err)
}
export default new Router({
	base: "/",
	routes: [{
			// 首页重定向
			path: '/',
			redirect: '/login'
		},
		{
			path: '/login',
			name: 'login',
			component: () => import("../view/login.vue")
		},
		{
			// 主页
			path: '/index',
			name: 'home',
			component: () => import('../view/index.vue'),
			redirect: '/index/province',
			children: [{
				path: 'province',
				component: () => import('../view/map/province.vue')
			}, {
				path: 'city',
				component: () => import('../view/map/city.vue')
			}, {
				path: 'area',
				component: () => import('../view/map/area.vue')
			}]
		}
	]
});