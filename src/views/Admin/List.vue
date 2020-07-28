<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>管理员列表</span>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="#">
			</el-table-column>
			<el-table-column prop="username" label="用户名">
			</el-table-column>
			<el-table-column prop="fullname" label="昵称">
			</el-table-column>
			<el-table-column prop="sex" label="性别">
			</el-table-column>
			<el-table-column prop="tel" label="手机">
			</el-table-column>
			<el-table-column prop="email" label="邮箱" width="170">
			</el-table-column>
			<el-table-column prop="avatar" label="头像">
				<template scope="scope">
					<el-image style="height: 60px; width: 60px;" :src="scope.row.avatar" fit='cover'></el-image>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="230">
				<template slot-scope="scope">
					<!-- 点编辑的时候获取当前id的信息  需要路由传参 即根据id传参（Admin里面的 路径 path: 'edit/:id',） -->
					<el-link :href='`#/admin/edit/${scope.row.id}`' class="am-margin-right-sm" type="primary">
						<el-button type="primary" plain icon="el-icon-edit" size="mini">编辑</el-button>
					</el-link>
					<el-button type="danger" plain icon="el-icon-delete" size="mini" @click="removeAdmin(scope.row.id,scope.$index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import { Admin } from '@/api/index'

	export default {
		data() {
			return {
				tableData: []
			}
		},
		created() {
			//生命周期获取数据
			this.loadList();
		},
		methods: {
			//删除管理员角色
			removeAdmin(id, index) {
				this.$confirm('此操作将永久删除该管理员, 是否继续?', '删除管理员', {
					type: 'warning'
				}).then(async () => {
					let { status, data } = await Admin.remove({id});
					if (status) {
						//更新DOM
						this.tableData.splice(index, 1);
						this.$message.success('删除成功!');
					}
				}).catch(() => {
					this.$message.info('取消删除');
				});
			},
			//封装一个方法
			async loadList() { /* 加载列表数据 */
				let { status, data, msg } = await Admin.list();
				if (status) {
					this.tableData = data;
				}
			},
		}
	}
</script>

<style>
	.am-margin-right-sm {
		margin-right: 10px;
	}
</style>
