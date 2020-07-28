<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>文章列表</span>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="#" width="80"></el-table-column>

			<el-table-column prop="cate_1st_name" label="一级分类" width="100"></el-table-column>

			<el-table-column prop="cate_2nd_name" label="二级分类" width="100"></el-table-column>

			<el-table-column prop="main_photo" label="主图">
				<template slot-scope="scope">
					<el-image style="height: 30%;" :src="scope.row.main_photo" fit='cover'></el-image>
				</template>
			</el-table-column>
			<el-table-column prop="title" label="标题" width="300"></el-table-column>

			<el-table-column prop="create_time" label="发布日期"></el-table-column>

			<el-table-column prop="update_time" label="更新日期"></el-table-column>


			<el-table-column label="操作" width="230">
				<template slot-scope="scope">
					<!-- 点编辑的时候获取当前id的信息  需要路由传参 即根据id传参（Article里面的 路径 path: 'edit/:id',） -->
					<el-link :href='`#/article/edit/${scope.row.id}`' class="am-margin-right-sm" type="primary">
						<el-button type="primary" plain icon="el-icon-edit" size="mini">编辑</el-button>
					</el-link>
					<el-button type="danger" plain icon="el-icon-delete" size="mini" @click="removeArticle(scope.row.id,scope.$index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import { Article } from '@/api/index';

	export default {

		data() {
			return {
				tableData: [],
			}
		},
		created() {
			//生命周期获取数据
			this.loadList();
		},
		methods: {
			//封装一个方法
			async loadList() { /* 加载列表数据 */
				let { status, total, data, msg } = await Article.list({ pagesize: 100, pageindex: 1 }); /* pagesize 为参数 100 为一个number值 表示100页 pageindex 表示 传第一页*/
				if (status) {
					this.tableData = data;
				}
			},
			//删除文章列表
			removeArticle(id, index) {
				this.$confirm('此操作将永久删除该管理员, 是否继续?', '删除管理员', {
					type: 'warning'
				}).then(async () => {
					let { status, data } = await Article.remove({ id });
					if (status) {
						//更新DOM
						this.tableData.splice(index, 1);
						this.$message.success('删除成功!');
					}
				}).catch(() => {
					this.$message.info('取消删除');
				});
			},
		}
	}
</script>

<style>
	.am-margin-right-sm {
		margin-right: 10px;
	}
</style>
