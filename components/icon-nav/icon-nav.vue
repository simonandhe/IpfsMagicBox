<template>
	<view>
		<scroll-view scroll-x scroll-with-animation>
			<view class="advBar" style="
				white-space: nowrap;
			    display:flex;
			    flex-direction: row;
			    flex-wrap:nowrap;">
				<view class="advItem" v-for="(item, index) in pData" :key="index" @tap="cliclk(item)">
				<!-- 	<image-cache mode="aspectFit" class="advItem-img live-logo" :imgSrc="item.ImageCover + $appConfig.getImgWidthPar(100)"
					 defaultImg="../../static/image-cache/default_live_img.png"></image-cache> -->
					<image class="advItem-img live-logo" :src="item.ImageCover + $appConfig.getImgWidthPar(100)" mode="aspectFit"></image>
					<!-- <view hover-class="hover-class" v-if="!!item.ImageCover" class="cu-avatar lg live-logo position-relative" :style="'background-image:url('+item.ImageCover+')'"></view> -->
					<!-- <view hover-class="hover-class" v-else class="cu-avatar lg live-logo defal position-relative" style="background-image:url('static/icon/zhibo-icon-defaul.png')"></view> -->
					<text class="name ellipsis1">{{item.Title}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
	</view>
</template>

<script>
	export default {
		props: {
			pData: {
				type: Array,
				required: true
			}
		},
		methods: {
			cliclk(e) {
				this.$emit('clinck', e)
			}
		}
	}
</script>

<style scoped>
	.live-logo {
		padding: 10upx;
		border-radius: 10upx;
		background-size: 80%;
		background-repeat: no-repeat;
		background-color: #FFFFFF;
		box-shadow: 0 0 30upx -10upx #B2B2B2;
	}

	.live-logo.defal {
		background-size: 58upx;
	}

	.advItem-img {
		height: 100upx;
		width: 100upx;
	}

	.advItem {
		margin-top: 20upx;
		display: flex;
		flex-direction: column;
		justify-items: center;
		align-items: center;
		flex: 22% 0 0;
		text-align: center;
	}

	.name {
		width: 100upx;
		font-size: 22upx !important;
		margin-top: 10upx;
	}
</style>
