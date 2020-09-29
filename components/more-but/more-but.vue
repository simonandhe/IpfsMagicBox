<template>
	<view class="wrap" @tap="click">
		<text style="margin-right: 5px;" class="text iconfont" :class="{'icon-bofangsanjiaoxing': icon === 'more', 'icon-xunhuan' : icon === 'reload'}"></text>
		<text class="a-link ">
			{{text}}
		</text>
	</view>
</template>

<script>
	export default {
		data() {},
		props: {
			icon: {
				type: String,
				required: true
			},
			text: {
				type: String,
				required: true
			}
		},
		methods: {
			click() {
				this.$emit('onclick')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		justify-items: center;
		width: 100%;
		height: 100%;
		background-color: $uni-bg-color-grey;

		& .text {
			color: $uni-color-primary-red;
			font-size: 14px;

			&.active {
				color: red;

				& span {
					color: red;
				}
			}

			& span {
				margin-left: 3px;
			}
		}
	}
</style>
