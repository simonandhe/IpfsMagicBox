<template>
	<view class=" w-100 d-flex flex-column j-center a-center bg-white" style="height: 100vh; position: fixed; z-index: 99999999;">
		<image style="width: 334rpx; height: 199rpx;" src="/static/bgimg/unconnect.png" mode=""></image>
		<text style="font-size: 34rpx;  margin-top: 20rpx;">网络未连接</text>
		<text style="font-size: 30rpx; color: #888888; margin-top: 20rpx;">请检查网络后刷新页面~</text>
		<view @tap="refresh" style="width: 160rpx; text-align: center; height: 60rpx; line-height: 60rpx; margin-top: 40rpx; color: #FFFFFF; border-radius: 50rpx; background-color: #007BFF;">刷新</view>
	</view>
</template>

<script>
	export default {
		methods: {
			refresh() {
				this.$emit('refresh')
			}
		}
	}
</script>

<style>

</style>
