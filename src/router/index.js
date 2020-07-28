import Vue from 'vue'
import VueRouter from 'vue-router'

//引入message来提示用户
import { Message } from 'element-ui';

Vue.use(VueRouter)
//这些东西是为了防止重复点击某一左侧边栏菜单的时候出现错误(错误原因是vue-router版本太新)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

import Layout from '@/components/Layout.vue';

const routes = [{
		path: '/login',
		name: 'Login',
		alias: '/',
		component: () => import('@/views/Login.vue'),
		meta: { requiresAuth: false }
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('@/views/Register.vue'),
		meta: { requiresAuth: false }
	},
	// 文章
	{
		path: '/article/',
		name: 'Article',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'ArticleList',
				component: () => import('@/views/Article/List.vue')
			},
			{
				path: 'edit/:id',
				name: 'ArticleEdit',
				component: () => import('@/views/Article/Edit.vue'),
				props: true,
			},
			{
				path: 'release',
				name: 'ArticleRelease',
				component: () => import('@/views/Article/Release.vue'),
			},
		]
	},
	// 管理员
	{
		path: '/admin/',
		name: 'Admin',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'AdminList',
				component: () => import('@/views/Admin/List.vue')
			},
			{
				path: 'edit/:id',
				name: 'AdminEdit',
				component: () => import('@/views/Admin/Edit.vue'),
				props: true,
			},
		]
	},
	// 用户
	{
		path: '/user/',
		name: 'User',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'UserList',
				component: () => import('@/views/User/List.vue')
			},
			{
				path: 'edit/:id',
				name: 'UserEdit',
				component: () => import('@/views/User/Edit.vue')
			},
		]
	},
	// 权限角色
	{
		path: '/limits/',
		name: 'Limits',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'list',
			name: 'LimitsList',
			component: () => import('@/views/Limits/List.vue')
		}, ]
	},
	{
		path: '/account/',
		name: 'Account',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'AccountList',
				component: () => import('@/views/Account/List.vue')
			},
			{
				path: 'edit',
				name: 'AccountEdit',
				component: () => import('@/views/Account/Edit.vue')
			},
		]
	},
	//分类列表
	{
		path: '/classify/',
		name: 'Classify',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'list',
			name: 'ClassifyList',
			component: () => import('@/views/Classify/List.vue')
		}, ]
	},
]

const router = new VueRouter({
	routes
});

//全局守卫
router.beforeEach((to, from, next) => {
	//根据meta元信息校验该地址是否需要授权
	let isrequiresAuth = to.matched.some((path) => path.meta.requiresAuth);
	//不需要登录授权，直接放行
	if (!isrequiresAuth) {
		next();
		return;
	}
	//校验Token (登录、注册不进行校验，直接放行（直接检测路由的name）)
	if (to.name == "Login" || to.name == "Register") {
		next();
		return;
	}
	let token = sessionStorage.token;
	//有Token，立即放行
	if (token) {
		next();
		return;
	}
	//无Token 强制跳转登录
	Message.error('无效的Token，请重新登录!');
	setTimeout(() => {
		next(`/login?redirect=${to.path}`);
	}, 2000);
});


export default router
