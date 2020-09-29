<template>
	<view>
		<swiper previous-margin="12px" next-margin="12px" class="swiper" autoplay duration="1000" circular indicator-dots
		 @change="change" indicator-active-color="#ffffff" indicator-color="#d60419" style="transition: all .3s;">
			{{pData}}
			<swiper-item class="swiper-item" v-for="(item, index) in pData" :key="index" @tap="cliclk(item.Url)">
				<view class="swiper-item">
					<!-- 	<image-cache mode="aspectFill" class="swiper-item-img" :imgSrc="item.ImgMobile + $appConfig.getImgWidthPar(WindowWidth)"
						 defaultImg="../../static/image-cache/default_img.png"></image-cache> -->
					<image class="swiper-item-img" :src="item.ImgMobile" mode="aspectFill"></image>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {};
		},
		props: {
			pData: {
				type: Array,
				required: true
			}
		},
		// mounted() {
		// 	this.banners = this.$dataJson.firstCode.banner
		// },
		methods: {
			cliclk(e) {
				this.$emit('cliclk', e)
			},
			change(e) {
				this.current = e.detail.current
			},
		}
	}
</script>
<style lang="scss" scoped>
	.swiper {
		height: 350upx;

		.swiper-item {
			width: 100%;
			height: 350upx;
			box-sizing: border-box;
			padding: 0 2upx;

			.swiper-item-img {
				overflow: hidden;
				border-radius: 18upx;
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
