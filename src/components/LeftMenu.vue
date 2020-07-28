<template>
	<el-menu router default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64"
	 text-color="#fff" active-text-color="#ffd04b">
		<el-submenu index="1">
			<template slot="title">
				<i class="el-icon-document"></i>
				<span>文章管理</span>
			</template>
			<el-menu-item index="/article/release">
				发布文章
			</el-menu-item>
			<el-menu-item index="/article/list">
				文章列表
			</el-menu-item>
		</el-submenu>

		<el-menu-item index="/classify/list">
			<i class="el-icon-data-analysis"></i>
			<span slot="title">分类管理</span>
		</el-menu-item>

		<el-submenu index="3">
			<template slot="title">
				<i class="el-icon-user"></i>
				<span>用户管理</span>
			</template>
			<el-menu-item index="/user/list">
				用户列表
			</el-menu-item>
		</el-submenu>

		<el-submenu index="4">
			<template slot="title">
				<i class="el-icon-set-up"></i>
				<span slot="title">管理员管理</span>
			</template>
			<el-menu-item index="/admin/list">
				管理员列表
			</el-menu-item>
		</el-submenu>

		<el-submenu index="5">
			<template slot="title">
				<i class="el-icon-connection"></i>
				<span slot="title">权限管理</span>
			</template>
			<el-menu-item index="/limits/list">
				权限角色
			</el-menu-item>
		</el-submenu>

		<el-menu-item index="/account/edit">
			<i class="el-icon-setting"></i>
			<span slot="title">
				账户设置
			</span>
		</el-menu-item>
	</el-menu>
</template>

<script>
</script>
<script>
	export default {
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>
<style>
	.el-header {
		padding: 0 !important;
		height: 55px !important;
	}

	a {
		text-decoration: none;
	}

	.el-menu-vertical-demo a {
		color: white;
	}

	.el-menu-vertical-demo {
		color: white;
		height: calc(100vh - 55px);
	}
</style>
