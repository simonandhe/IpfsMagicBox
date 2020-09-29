<template>
	<view style="position: fixed;  top: 0; left: 0; right: 0; bottom: 0; background-color: #FFFFFF; align-content: center; justify-content: center; z-index: 99 !important;">
		<view class="loading-wrap">
			<view class="flex-sub margin-right radius">
				<image src="https://image.weilanwl.com/gif/loading-white.gif" mode="aspectFit" class="gif-white response" style="height:240upx"></image>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style scoped="true">
	.loading-wrap {
		position: absolute;
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
