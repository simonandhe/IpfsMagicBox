<template>
	<view class="item slide-item" @tap="click">
		<view v-show="!pData.active">{{pData.index+1}}</view>
		<text v-show="pData.active" class="iconfont icon-bofang"></text>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: {
			pData: {
				type: Object
			}
		},
		methods: {
			click() {
				this.$emit('click', JSON.parse(JSON.stringify(this.pData)))
			}
		}
	}
</script>

<style lang="scss" scoped>
	.icon-bofang {
		font-weight: 800;
		color: $uni-color-primary;
	}

	.badge {
		border: none;
		width: 30upx;
		height: 30upx;
	}

	.item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 120rpx;
		width: 120rpx;
		line-height: 120rpx;
		text-align: center;
		background: #f7f9fb;
		border-radius: 16rpx;
	}
</style>
