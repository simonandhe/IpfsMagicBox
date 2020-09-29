<template>
	<view class="recharge-col" hover-class="uni-hover-l">
		<view class="recharge-l w-100">
			<view class="view">
				<text>开机收益</text>
				<text selectable="true" class="u-time ml-2">{{filter.dateFormatting(pData.CreateTime, 'yyyy-mm-dd-hh-mm')}}</text>
			</view>
			<view class="d-flex w-100 a-center font-md mt-2">
				<text selectable="true" class="text-light-muted">mac地址:<text class="mr-1">{{filter.formatInvalid(pData.MacAddress)}}</text></text>
				<text @tap.stop>
					<me-copy-text :slotInput="true" :showInput="false" style="display: inline-block;" :val="pData.MacAddress">
						<text class="iconfont icon-copy"></text>
					</me-copy-text>
				</text>
				<text @tap.stop>
					<text class="iconfont icon-chakan ml-2" @tap="subClick"></text>
				</text>
			</view>
		</view>
		<view class="recharge-r-wrap">
			<view class="recharge-r text-primary" :class="{ 'text-danger': pData.Integral < 0}">
				{{filter.formatInvalid(pData.Integral)}}
			</view>
		</view>
	</view>
</template>

<script>
	import meCopyText from "@/components/me-copy-text/me-copy-text.vue"
	export default {
		components: {
			meCopyText
		},
		props: {
			pData: {
				type: Object,
				require: true
			}
		},
		methods: {
			subClick() {
				this.$emit('subClick')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-time {
		font-size: 24upx;
		display: inline-block;
		color: #999999;
		margin-top: 25upx;
	}

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
