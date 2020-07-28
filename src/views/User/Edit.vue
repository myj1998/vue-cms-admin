<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>编辑用户</span>
		</div>
		<el-form ref="form" :model="form" :rules="rules" label-width="80px">

			<el-form-item label="用户名" prop="username">
				<el-input v-model="form.username" disabled></el-input>
			</el-form-item>

			<el-form-item label="昵称" prop="nickname">
				<el-input v-model="form.nickname"></el-input>
			</el-form-item>

			<el-form-item label="性别" prop="sex">
				<el-radio-group v-model="form.sex">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="手机" prop="tel">
				<el-input v-model="form.tel"></el-input>
			</el-form-item>

			<el-button type="primary" style="margin-left: 80px;" @click="submitForm('form')">保存修改</el-button>
		</el-form>
	</el-card>
</template>

<script>
	import { User } from '@/api/index';
	export default {
		data() {
			var checkphone = (rule, value, callback) => {
				if (value == "") {
					callback(new Error("请输入手机号"));
				} else if (!this.isCellPhone(value)) { //引入methods中封装的检查手机格式的方法
					callback(new Error("请输入正确的手机号!"));
				} else {
					callback();
				}
			};
			return {
				form: {
					username: '',
					nickname: '',
					sex: '',
					tel: '',
				},
				rules: {
					username: [{ required: true, message: '请输用户名', trigger: 'blur' }, ],
					nickname: [{ required: true, message: '请输入姓名', trigger: 'blur' }, ],
					sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
					tel: [{ required: true, message: '请输入手机号', trigger: 'blur' },
						{ validator: checkphone, message: '请输入正确格式的手机号', trigger: 'blur' }
					],
				}
			}
		},
		created() {
			//$route   与 $router 的区别
			this.loadinfo(this.$route.params.id);
		},
		methods: {
			//获取用户个人资料
			async loadinfo(id) {
				let { status, data } = await User.info({ id });
				if (status) {
					this.form = data;
					this.$message.success('获取成功!');
				}
			},
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					let { status } = await User.update(this.$route.params.id, { ...this.form });
					if (status) {
						this.$message.success('修改成功！');
					}
				});
			},
			isCellPhone(val) {
				if (!/^1(3|4|5|6|7|8)\d{9}$/.test(val)) {
					return false;
				} else {
					return true;
				}
			},
		}
	}
</script>

<style>
</style>
