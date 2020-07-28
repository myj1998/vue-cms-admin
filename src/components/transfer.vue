<template>
	<div class="transfer">
		<div class="box">
			<div class="title">
				<input type="checkbox" v-model="checkedAll">列表1
			</div>
			<div class="title" v-for="(item,index) in form" style="margin-top: 10px;">
				<input type="checkbox" :disabled="index%3===0" v-model="item.checked">{{item.name}}
			</div>
		</div>
		<div class="box-content">
			<el-button type="primary" @click="left" icon="el-icon-caret-left"></el-button>
			<el-button type="primary" @click="right" icon="el-icon-caret-right"></el-button>
		</div>
		<div class="box box1">
			<div class="title">
				<input type="checkbox" v-model="checkedAll1" checked="false">列表2
			</div>
			<div class="title" v-for="(item,index) in form_two" style="margin-top: 10px;">
				<input type="checkbox" :disabled="index%3===0" v-model="item.checked">{{item.name}}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['form', 'form_two'],
		computed: {
			checkedAll: {
				get: function() {
					var num = 0;
					this.form.forEach(function(item, index) {
						if (item.checked) {
							num++;
						}
					});
					return num == this.form.length;
				},
				set: function(newValue) {
					this.form.forEach(function(item, index) {
						item.checked = newValue;
					});
				}
			},
			checkedAll1: {
				get: function() {
					var num = 0;
					this.form_two.forEach(function(item, index) {
						if (item.checked) {
							num++;
						}
					});
					return num == this.form_two.length;
				},
				set: function(newValue) {
					this.form_two.forEach(function(item, index) {
						item.checked = newValue;
					});
				}
			}
		},
		methods: {
			right() {
				this.$emit('right');
			},
			left() {
				this.$emit('left');
			}
		}
	};
</script>

<style>
	.transfer {
		width: 500px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border: 1px solid #ccc;
	}
	.box {
		width: 100px;
		border: 1px solid #ccc;
		border-radius: 5px;
	}

	.box * {
		padding: 5px;
	}

	.box-content {
		position: absolute;
		left: 200px;
		top: 150px;
	}

	.box1 {
		position: absolute;
		top: 0;
		left: 400px;
	}
</style>
