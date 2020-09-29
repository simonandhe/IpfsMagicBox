<template>
	<view class="icon-top-wrap">
		<slot></slot>
		<image class="icon-top" src="images/icon-top.png" mode=""></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		}
	}
</script>

<style lang="scss" scoped>
	.icon-top-wrap {
		width: 100upx;
		border: 1upx solid red;
		position: fixed;
		z-index: 9999;
		bottom: 90upx;
		right: 30upx;

		& .icon-top {
			width: 60upx;
			height: 60upx;
		}
	}
</style>
