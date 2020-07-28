<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>用户列表</span>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="#" width="180"></el-table-column>

			<el-table-column prop="username" label="用户名" width="180"></el-table-column>

			<el-table-column prop="nickname" label="昵称"></el-table-column>

			<el-table-column prop="sex" label="性别"></el-table-column>

			<el-table-column prop="tel" label="手机"></el-table-column>

			<el-table-column label="操作" width="230">
				<template slot-scope="scope">
					<el-link :href='`#/user/edit/${scope.row.id}`' class="am-margin-right-sm" type="primary">
						<el-button type="primary" plain icon="el-icon-edit" size="mini">编辑</el-button>
					</el-link>
					<el-button type="danger" plain icon="el-icon-delete" size="mini" @click="removeUser(scope.row.id,scope.$index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import { User } from '@/api/index';

	export default {
		data() {
			return {
				tableData: []
			}
		},
		created() {
			this.loadList();
		},
		methods: {
			//删除普通用户
			removeUser(id, index) {
				this.$confirm('此操作将永久删除该用户, 是否继续?', '删除用户', {
					type: 'warning'
				}).then(async () => {
					let { status } = await User.remove(id);
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
				let { status, total, data, msg } = await User.list();
				if (status) {
					this.tableData = data;
				}
			}
		}
	}
</script>

<style>
	.am-margin-right-sm {
		margin-right: 10px;
	}
</style>
