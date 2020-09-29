<template>
	<view class="history-item position-relative" hover-class="hover-class">
		<view class="history-image">
			<image :src="image + $appConfig.getImgWidthPar(300)">
		</view>
		<view class="history-info">
			<view class="title ellipsis2">{{title}}</view>
			<view class="description ellipsis2">{{subtitle}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			id: {
				type: String
			},
			image: {
				type: String,
			},
			title: {
				type: String,
			},
			subtitle: {
				type: String,
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ellipsis1 {
		display: block;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.ellipsis3 {
		display: block;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.history-item {
		display: flex;
		box-sizing: border-box;
		padding: 20upx;
	}

	.history-image {
		width: 280upx;
		height: 130upx;
		float: left;
		box-sizing: border-box;
		padding: 24upx 45upx;
		// border: 1upx solid #999999;
		box-shadow: 0 2upx 14upx rgba(114, 130, 138, 0.2);
		// overflow: hidden;
		position: relative;
	}

	.history-image image {
		width: 100%;
		height: 100%;
	}

	.history-info {
		width: 70%;
		float: left;
		margin-left: 10px;
		margin-right: 10px;

		& .title {
			min-height: 60upx;
			font-size: 15px;
			color: #222222;
			margin-top: 10px;
		}

		& .description {
			font-size: 12px;
			color: #999999;
			margin-top: 7px;
		}
	}
</style>
