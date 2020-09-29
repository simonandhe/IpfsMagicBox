<template>
	<view class="icon-top-wrap" @tap="click">
		<image class="icon-top" src="../../static/icon/icon-gototop.png" mode=""></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			click() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.icon-top-wrap {
		width: 100upx;
		position: fixed;
		z-index: 9999;
		bottom: 90upx;
		right: 30upx;
		width: 90upx;
		height: 90upx;

		& .icon-top {
			width: 100%;
			height: 100%;
		}
	}
</style>
