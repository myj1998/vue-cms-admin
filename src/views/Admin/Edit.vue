<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>编辑管理员</span>
		</div>
		<div class="text item">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="ruleForm.username"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="fullname">
					<el-input v-model="ruleForm.fullname"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-radio-group v-model="ruleForm.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="手机号" prop="tel">
					<el-input v-model="ruleForm.tel"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="ruleForm.email"></el-input>
				</el-form-item>
				<!-- 上传头像 -->
				<el-form-item label="头像" prop="avatar">
					<SingleUpload :url='ruleForm.avatar' @success='handleUploadSuccess($event)' @remove='ruleForm.avatar=""'></SingleUpload>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
				</el-form-item>
			</el-form>
		</div>
	</el-card>
</template>

<script>
	import { Admin } from '@/api/index';
	import SingleUpload from '@/components/SingleUpload.vue';
	export default {
		props: ['id'],
		components: {
			SingleUpload,
		},
		data() {
			return {
				type: 'avatar',
				ruleForm: {
					id: '',
					username: '',
					fullname: '',
					tel: '',
					sex: '',
					email: '',
					avatar: '',
				},
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 20,
							message: '长度在 3 到 20 个字符',
							trigger: 'blur'
						}
					],
					fullname: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 6,
							message: '长度在 2 到 6 个字符',
							trigger: 'blur'
						}
					],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					tel: [{
						required: true,
						message: '请填写正确的手机号',
						trigger: 'blur',
					}]
				}
			};
		},
		created() {
			//$route与$router
			//console.log(this.$route.params.id);//路由对象
			//console.log(this.$router);//路由实例
			this.loadInfo(this.id);
		},
		watch: {
			'$route'(to, from) {
				let { id } = to.params;
				this.loadInfo(id);
			}
		},
		methods: {
			async loadInfo(id) {
				let { status, data } = await Admin.info({ id });
				if (status) {
					this.ruleForm = data;
				}
			},
			//头像上传成功
			handleUploadSuccess({ data, msg, status }) {
				this.ruleForm.avatar = data;
			},
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let { status } = await Admin.update(this.ruleForm);
						if (status) {
							this.$router.push({ path: '/admin/list' });
							this.$message.success('提交成功!');
						}
					} else {
						this.$message.info('未提交成功!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
		}
	}
</script>

<style scoped>
	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}
</style>
