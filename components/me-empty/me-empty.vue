<template>
	<view>
		<view class="other-live-room-empty">
			<image class="empty-box-img" src="../../static/img/empty.png" mode=""></image>
			<text class="empty-box-sub">暂无数据</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style>
	.other-live-room-empty {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.empty-box-img {
		margin-top: 100upx;
		width: 300upx;
		height: 300upx;
	}

	.empty-box-sub {
		font-size: $uni-font-size-sm;
		color: #343A40;
	}
</style>
