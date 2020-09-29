<template>
	<view class="recharge-col" hover-class="uni-hover-l">
		<view class="recharge-l">
			<view class="view">
				<text>{{filter.formatIntegralListType(pData.Type)}}</text>
			</view>
			<text selectable="true" class="u-time">{{filter.dateFormatting(pData.CreateTime)}}</text>
		</view>
		<view class="recharge-r-wrap">
			<view class="recharge-r text-primary" :class="{ 'text-danger': pData.Integral < 0}">
				{{filter.formatInvalid(pData.Integral)}}
			</view>
			<!-- 			<text v-if="pData.State === 0" selectable="true" class="text-warning">充值中</text>
			<text v-if="pData.State === 1" selectable="true">充值成功</text>
			<text v-if="pData.State === -1" selectable="true" class="red">充值失败</text> -->
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			pData: {
				type: Object,
				require: true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recharge-col {
		background-color: #ffffff;
		border-radius: 15upx;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		align-content: center;
		align-items: center;
		width: 710upx;
		margin: 20upx auto 0;
		padding: 30upx;
		box-shadow: 0 0 19upx -10upx #000000;
	}

	.recharge-l {
		align-items: center;
	}

	.recharge-l .view {
		font-size: 36upx;
		font-weight: 600;
		color: #333333;
	}

	.recharge-l .u-time {
		font-size: 24upx;
		display: inline-block;
		color: #999999;
		margin-top: 25upx;
	}

	.red {
		color: $uni-text-color-catching;
	}

	.yellow {
		color: $uni-color-warning;
	}

	.recharge-r-wrap {
		color: $uni-color-primary;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.recharge-r {
		margin-bottom: 20upx;
		font-size: 36upx;

		&.catching {
			color: $uni-text-color-catching;
		}
	}
</style>
