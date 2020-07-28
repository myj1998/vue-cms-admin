<template>
	<div class="counter">
		<button @click="headdecrease" type="button" class="decrease">-</button>
		<span class="number">{{value}}</span>
		<button @click="headincrease" type="button" class="increase">+</button>
	</div>
</template>

<script>
	export default {
		//props   外部数据
		props: ['value', 'min', 'max', 'step'],
		methods: {
			headincrease() {

				this.$emit('up', this.step);
			},
			headdecrease() {
				if (this.value <= this.min) {
					return;
				}
				this.$emit('down', this.step);
			}

		},
	}
</script>

<style>
	.counter {
		display: flex;
		align-items: center;
		width: 200px;
	}

	.counter .decrease,
	.counter .increase {
		padding: 6px 20px;
		border: 1px solid #999999;
		border-radius: 3px;
		font-size: 18px;
	}

	.counter .decrease {
		border-top-right-radius: 0px;
		border-bottom-right-radius: 0px;
	}

	.counter .increase {
		border-top-left-radius: 0px;
		border-bottom-left-radius: 0px;
	}

	.counter .number {
		padding: 6px;
		text-align: center;
		min-width: 100px;
		border-top: 1px solid #999;
		border-bottom: 1px solid #999;
	}
</style>
