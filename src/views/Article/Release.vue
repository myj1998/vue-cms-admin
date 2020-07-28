<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>发布文章</span>
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
					<el-select v-model="form.cate_1st" placeholder="请选择文章一级分类">
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
			<el-form-item label="内容" v-model="form.content">
				<div ref="editor" style="text-align:left"></div><!-- ref跟id一样的特性  具有唯一性 不可重复 -->
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('form')">发布文章</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	import E from 'wangeditor';
	import { Category, Article } from '@/api/index';
	import SingleUpload from '@/components/SingleUpload.vue';

	export default {
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
		async created() {
			//获取一级分类的数据
			let options = await this.loadSubcate(0);
			this.options_1st = options;
		},
		watch: {
			'form.cate_1st': async function(val) {
				//获取二级分类数据
				let options = await this.loadSubcate(val);
				this.options_2nd = options;
				//默认选中第一项
				this.form.cate_2nd = options[0].id;
			}
		},
		mounted() {
			var editor = new E(this.$refs.editor)
			editor.customConfig.onchange = (html) => {
				this.form.content = html
			}
			//配置图片上传
			editor.customConfig.uploadImgServer = '/upload/editor/';
			//配置上传 fileName
			editor.customConfig.uploadFileName = 'file';
			//自定义header
			editor.customConfig.uploadImgHeaders = {
				Authorization: ` Bearer ${sessionStorage.token}`
			}
			// 使用 base64 保存图片
			// editor.customConfig.uploadImgShowBase64 = true;
			editor.create();
		},
		methods: {
			//根据传参，去获取子分类
			async loadSubcate(id) {
				let { status, data } = await Category.subcate({ id });
				return data;
			},

			// handleOptionChange(value) {
			// 	console.log(value);
			// 	this.loadSubcate(value).then((options) => {
			// 		this.options_2nd = options;
			// 		//选中一级分类之后，二级分类默认显示第一项
			// 		this.form.cate_2nd = options[0].id;
			// 	});
			// },
			//头像上传成功
			handleUploadSuccess({ data, msg, status }) {
				this.form.main_photo = data;
			},
			onSubmit(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let { status } = await Article.add(this.form);
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
