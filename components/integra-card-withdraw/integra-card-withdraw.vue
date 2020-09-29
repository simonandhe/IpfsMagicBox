<template>
	<view class="recharge-col" hover-class="uni-hover-l">
		<view class="recharge-l">
			<view class="view">
				<text>积分兑换</text>
			</view>
			<text selectable="true" class="u-time">{{filter.formatDate(new Date(pData.CreateTime), 'yyyy-MM-dd hh:mm:ss')}}</text>
		</view>
		<view class="recharge-r-wrap">
			<view class="recharge-r">
				{{filter.formatInvalid(pData.CashFee)}}
			</view>
			<text v-if="pData.State === 0" selectable="true" class="text-warning">兑换中</text>
			<text v-if="pData.State === 1" selectable="true">兑换成功</text>
			<text v-if="pData.State === -1" selectable="true" class="red">兑换失败</text>
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
		color: #333333;
	}
</style>
