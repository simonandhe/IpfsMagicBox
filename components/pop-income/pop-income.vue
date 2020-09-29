<template>
	<view>
		<uni-popup :custom="true" ref="popup" :show="showUpdateBox" type="center" :maskClick="false" padding="0"
		 @touchmove.native.stop.prevent>
			<view class="up-wrap box">
				<view class="up-wrap-content">
					<view class="up-wrap-hj-wrap position-relative">
						<image src="../../static/bgimg/money-bg.png" class="up-wrap-hj box"></image>
						<view class="top-text">{{userInfo.Type == 1 ? '全部矿机收益' : '父账户全部矿机收益'}}</view>
						<view class="top-text2 IMPACT-FONT mt-3" :class="{'s': textLe == 1, 's2': textLe == 2}">+{{score}}</view>
						<!-- <view class="go-income-but">去查看</view> -->
					</view>
				</view>
				<image src="../../static/pop/close.png" @click="close" class="up-wrap-close" mode=""></image>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	let downloadTask = null
	import {
		mapState
	} from 'vuex'
	import LoadLine from '@/components/load-line/load-line.vue'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		computed: mapState(["userInfo"]),
		components: {
			// uniPopup,
			LoadLine
		},
		data() {
			return {
				score: 0,
				data: null,
				showUpdateBox: false, //更新弹窗
				textLe: 0
			}
		},
		created() {
			if (String(this.score).length > 11) {
				this.textLe = 1
			} else if (String(this.score).length > 20) {
				this.textLe = 2
			} else {
				this.textLe = 0
			}
		},
		watch: {
			progress: function(n) {
				this.progressView = n
			},
			showUpdateBox: function(n) {
				if (n) {
					this.$emit('show')
					var date = new Date()
					var forDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()}`
					uni.setStorageSync("showIncomeInfo", forDate);
				} else {
					console.log('关闭')
					this.$emit('hide')
				}
			}
		},
		methods: {
			async getAllMachineIntegral() {
				let res = await this.$H.post(this.$appConfig.URL.ALLMACHINEINTEGRAL_URL, {}, {
					checkToken: true,
					showLoginPage: true
				});
				if (!this.$H.errorCheck(res)) {
					return
				}
				this.score = res.data.Integral
				if (this.score > 0) {
					this.$nextTick(() => {
						this.showUpdateBox = true
					})
				} else {
					this.$nextTick(() => {
						this.showUpdateBox = false
					})
				}

			},

			todayShowed() {
				var result = false
				var oldDate = uni.getStorageSync("showIncomeInfo")
				var date = new Date()
				var forDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()}`
				if (oldDate == forDate) {
					result = true
				}
				return result
			},
			// 点击处理
			close() {
				this.showUpdateBox = false
			},

			init() {
				var todayShowed = this.todayShowed()
				if (!todayShowed) {
					this.getAllMachineIntegral()
				} else {
					this.showUpdateBox = false
				}
			},

			open() {
				this.$refs.popup.open()
			}
		}
	}
</script>

<style scoped lang="scss">
	.up-wrap {
		width: 610upx;

		& .version-icon {
			position: absolute;
			top: 30upx;
			right: 30upx;
			border-radius: 50upx;
			padding: 4upx 17upx;
			background-color: #FFFFFF;
			font-size: 24upx;
			color: #333333;
		}

		& .up-wrap-top {
			position: relative;
			border-top-left-radius: 26upx;
			border-top-right-radius: 26upx;
			overflow: hidden;
			width: 100%;
			height: 272upx;
			background-color: #078eda;
			background-image: url('~@/static/pop/top.png');
			background-position: center center;
			background-repeat: no-repeat;
			background-size: 455upx 308upx;
		}

		& .up-wrap-content {
			min-height: 300upx;
			display: flex;
			flex-direction: column;
			align-items: center;
			box-sizing: border-box;
			padding: 30upx;
			background-color: #f6ce84;
			border-radius: 26upx;

			& .up-wrap-content-title {
				font-size: 38upx;
				color: #333333;
				margin-bottom: 30upx;
			}

			& .up-wrap-content-text {
				font-size: 28upx;
				color: #333333;
				margin-bottom: 40upx;
			}

			& .up-wrap-but {
				margin-bottom: 30upx;
				background-color: #078eda;
				height: 84upx;
				width: 500upx;
				text-align: center;
				line-height: 84upx;
				color: #FFFFFF;
				border-radius: 50upx;
				font-size: 34upx;

				&.spec {
					background-color: #94b4c5;
				}

				&.spec2 {
					margin-top: 30upx;
					background-color: #94b4c5;
				}
			}
		}

		& .up-wrap-hj-wrap {
			height: 400upx;
			width: 550upx;

		}

		& .up-wrap-hj {
			height: 100%;
			width: 100%;
		}

		& .top-text {
			position: absolute;
			left: 0;
			top: 30upx;
			text-align: center;
			line-height: 36upx;
			height: 36upx;
			width: 100%;
			color: #b58b35;
			font-size: 36upx;
		}

		& .top-text2 {
			position: absolute;
			left: 0;
			top: 100upx;
			text-align: center;
			line-height: 46upx;
			height: 46upx;
			width: 100%;
			color: #ea2e3c;
			font-size: 70upx;

			&.s {
				font-size: 36upx;
			}

			&.s2 {
				font-size: 36upx;
			}
		}

		& .go-income-but {
			position: absolute;
			color: #ea2e3c;
			font-size: 36upx;
			text-align: center;
			line-height: 90upx;
			bottom: 90upx;
			left: 50upx;
			background-color: #ffbd3e;
			border-radius: 8upx;
			height: 90upx;
			width: 450upx;
		}

		& .up-wrap-hjpq {
			position: absolute;
			top: 56upx;
			left: 95upx;
			height: 89upx;
			width: 105upx;
			z-index: 2;
			transition: all .3s inherit;

			&.up2 {
				animation: up2 .3s infinite;
			}
		}

		& .up-wrap-close {
			position: absolute;
			bottom: -80upx;
			left: 50%;
			transform: translateX(-50%);
			height: 54upx;
			width: 54upx;
			z-index: 3;
		}

		& .up-wrap-start {
			position: absolute;
			top: -60upx;
			left: 120upx;
			height: 46upx;
			width: 44upx;
			z-index: 3;
		}

		& .up-wrap-start-bot {
			position: absolute;
			bottom: -25upx;
			right: 80upx;
			height: 22upx;
			width: 22upx;
			z-index: 3;
		}

	}

	// 进度球
	.pop-button {
		width: 150upx;
		height: 150upx;
		border: 1upx solid #0D96F2;
		position: relative;
		border-radius: 50%;
		overflow: hidden;
		background: #0D96F2;
		margin: 0 auto;

		// top: -150%;  empty
		// top: -250%; full
		& .pop-status {
			position: absolute;
			transition: top .2s linear;
			width: 250%;
			height: 250%;
			top: -150%;
			left: -70%;
			border-radius: 40%;
			background: white;
			animation: wave 5s infinite;
			animation-timing-function: cubic-bezie(.28, .93, .71, .38);
		}

		& .pop-text {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-size: 26upx;
			color: #333333;
			z-index: 9;

			&.spec {
				color: #FFFFFF;
			}
		}
	}

	@keyframes wave {
		from {
			transform: rotate(0deg)
		}

		to {
			transform: rotate(360deg)
		}
	}

	@keyframes up2 {
		from {
			opacity: .5;
			top: 56upx;
			left: 95upx;
		}

		to {
			opacity: 1;
			top: 58upx;
			left: 98upx;
		}
	}
</style>
