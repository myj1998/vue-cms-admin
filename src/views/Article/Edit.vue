<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>编辑文章</span>
		</div>
		<el-form :model="form" ref="form" label-width="60px">
			<el-form-item label="标题">
				<el-input v-model="form.title"></el-input>
			</el-form-item>

			<el-form-item label="描述">
				<el-input v-model="form.description"></el-input>
			</el-form-item>

			<el-form-item label="分类">
				<el-col :span="6">
					<el-select v-model="form.cate_1st" @change="handleCate_1stChange" placeholder="请选择文章一级分类">
						<el-option v-for="option in options_1st" :key="option.id" :label="option.name" :value="option.id"></el-option>
					</el-select>
				</el-col>
				<el-col :span="6">
					<el-select v-model="form.cate_2nd" placeholder="请选择文章二级分类">
						<el-option v-for="option in options_2nd" :key="option.id" :label="option.name" :value="option.id"></el-option>
					</el-select>
				</el-col>
			</el-form-item>

			<el-form-item label="主图" v-model="form.main_photo">
				<SingleUpload :url='form.main_photo' @success='handleUploadSuccess($event)' @remove='form.main_photo=""'></SingleUpload>
			</el-form-item>

			<el-form-item label="内容">
				<div ref="editor" style="text-align:left"></div><!-- ref跟id一样的特性  具有唯一性 不可重复 -->
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="onSubmit('form')">确认修改</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	import { Article, Category } from '@/api/index';
	import E from 'wangeditor';
	import SingleUpload from '@/components/SingleUpload.vue';

	export default {
		props: ['id'],
		components: {
			SingleUpload,
		},
		data() {
			return {
				type: 'common',
				imageUrl: '',
				form: {
					cate_1st: '',
					cate_2nd: '',
					title: '',
					description: '',
					main_photo: '',
					content: '',
				},
				options_1st: [],
				options_2nd: [],
			}
		},
		async mounted() {
			//获取一级分类
			this.options_1st = await this.loadSubcate(0);
			//获取文章详情
			let article = await this.loadInfo(this.id);
			this.form = article;
			//获取二级分类
			this.options_2nd = await this.loadSubcate(article.cate_1st);

			//富文本编辑器
			var editor = new E(this.$refs.editor)
			editor.customConfig.onchange = (html) => {
				this.form.content = html;
			}
			editor.create()
			editor.txt.html(this.form.content)
		},
		// watch: {
		// 	"form.cate_1st": function(val) {
		// 		this.loadSubcate(val).then((options) => {
		// 			this.options_2nd = options;
		// 			// this.form.cate_2nd = options[0].id;
		// 		});
		// 	},
		// 	"form.cate_2nd": function(val) {
		// 		console.log(val);
		// 	},
		// },
		async created() {
			this.loadSubcate(0).then((options) => {
				this.options_1st = options;
			});
			this.loadInfo(this.id);
		},
		methods: {
			//获取信息
			async loadInfo(id) {
				let { status, data } = await Article.detail({ id });
				if (status) {
					return data;
				}
			},

			//根据传参，去获取子分类
			async loadSubcate(id) {
				let { status, data } = await Category.subcate({ id });
				if (status) {
					return data;
				}
			},

			//一级分类的change
			async handleCate_1stChange(value) {
				let options = await this.loadSubcate(value);
				this.options_2nd = options;
				//选中一级分类之后，二级分类默认显示第一项
				this.form.cate_2nd = options[0].id;
			},

			//头像上传成功
			handleUploadSuccess({ data, msg, status }) {
				this.form.main_photo = data;
			},
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let { status } = await Article.edit(this.ruleForm);
						if (status) {
							this.$router.push({ path: '/article/list' });
							this.$message.success('提交成功!');
						}
					} else {
						this.$message.info('未提交成功!');
						return false;
					}
				});
			},
			onSubmit(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let { status } = await Article.edit(this.form);
						if (status) {
							this.$router.push({ path: '/article/list' });
							this.$message.success('提交成功!');
						}
					} else {
						this.$message.info('未提交成功!');
						return false;
					}
				});
			},
		}
	}
</script>

<style>
</style>
