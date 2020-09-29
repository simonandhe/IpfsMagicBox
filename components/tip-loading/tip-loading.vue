<template>
	<view class="loading-wrap">
		<view class="loader loading">
			<view class="css-square square1"></view>
			<view class="css-square square2"></view>
			<view class="css-square square3"></view>
			<view class="css-square square4"></view>
			<view class="css-square square5"></view>
			<view class="css-square square6"></view>
			<view class="css-square square7"></view>
			<view class="css-square square8"></view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tipLoading",
		data() {
			return {}
		},
		
	};
</script>

<style scoped="true" lang="scss">
	.loading-wrap {
		position: absolute;
		height: 100%;
		width: 100%;
		z-index: 9999999;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.loader {
		position: relative;
		height: 60upx;
		width: 106upx;
		display: inline-block;
		vertical-align: middle;
	}

	.loading .css-square {
		position: absolute;
		top: 50%;
		width: 25upx;
		height: 7upx;
		background: $uni-color-primary-red;
		box-shadow: 2upx 2upx 3upx 0upx black;

		&:nth-child(2n) {
			background-color: $uni-color-primary;
		}
	}

	.loading .square1 {
		left: 70upx;
		-webkit-animation: dominos 1s 0.125s ease infinite;
		animation: dominos 1s 0.125s ease infinite;
	}

	.loading .square2 {
		left: 60upx;
		-webkit-animation: dominos 1s 0.3s ease infinite;
		animation: dominos 1s 0.3s ease infinite;
	}

	.loading .square3 {
		left: 50upx;
		-webkit-animation: dominos 1s 0.425s ease infinite;
		animation: dominos 1s 0.425s ease infinite;
	}

	.loading .square4 {
		left: 40upx;
		-webkit-animation: dominos 1s 0.54s ease infinite;
		animation: dominos 1s 0.54s ease infinite;
	}

	.loading .square5 {
		left: 30upx;
		-webkit-animation: dominos 1s 0.665s ease infinite;
		animation: dominos 1s 0.665s ease infinite;
	}

	.loading .square6 {
		left: 20upx;
		-webkit-animation: dominos 1s 0.79s ease infinite;
		animation: dominos 1s 0.79s ease infinite;
	}

	.loading .square7 {
		left: 10upx;
		-webkit-animation: dominos 1s 0.9s ease infinite;
		animation: dominos 1s 0.9s ease infinite;
	}

	.loading .square8 {
		left: 0upx;
		-webkit-animation: dominos 1s 1s ease infinite;
		animation: dominos 1s 1s ease infinite;
	}

	@-webkit-keyframes dominos {
		50% {
			opacity: 0.7;
		}

		75% {
			-webkit-transform: rotate(90deg);
			transform: rotate(90deg);
		}

		80% {
			opacity: 1;
		}
	}

	@keyframes dominos {
		50% {
			opacity: 0.7;
		}

		75% {
			-webkit-transform: rotate(90deg);
			transform: rotate(90deg);
		}

		80% {
			opacity: 1;
		}
	}
</style>
