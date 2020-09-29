<template>
	<view class="history-item position-relative" hover-class="hover-class">
		<view class="history-image">
			<image style="height: 100%;" :src="image + $appConfig.getImgWidthPar(300) " mode="aspectFill">
		</view>
		<view class="history-info">
			<view class="title ellipsis2">{{title}}</view>
			<view class="description ellipsis2">{{subtitle}}</view>
		</view>
		<lu-button-ripple></lu-button-ripple>
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
	}

	.history-image {
		width: 300upx;
		height: 160upx;
		float: left;
		max-height: 200upx;
		overflow: hidden;
		position: relative;
		background-image: url('~@/static/bgimg/img-empty-full.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
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
