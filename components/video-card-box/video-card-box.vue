<template>
	<view class="video-box">
		<loading-data-plus bgColor="rgba(101, 96, 96, 0.2)" v-if="mixin_loadingData && showmask"></loading-data-plus>
		<!-- 标题 -->
		<view class="video-title" v-if="dataList.length > 0">
			<me-title :title="getTitle.title" :more='getTitle.more'></me-title>
		</view>
		<!-- 图片内容 -->
		<view class="video-card-wrap" v-if="dataList.length > 0">
			<!-- <video-card v-if="!!item" :type="type" @click="click" :pData="item" :key="index" v-for="(item, index) in dataList"></video-card> -->
			<view class="video position-relative" @tap="click(item.Id)" :key="item.Id" v-for="(item, index) in dataList"
			 hover-class="hover-class">
				<!-- <me-image width="372" height="200" :src="item.Avatar" contentclassame=".relative-content"></me-image> -->
				<view class="pic">
					<view class="me-image-wrap">
						<view class="pic">
							<!-- <view class="image-node" :class="{'image-node-' + index : true}"> -->
							<view class="image-node" :class="getImageClass(index)">
								<image v-if="item.showImg" :class="{'anim_fade_image': item.showImg}" class="image" :src="item.Avatar + $appConfig.getImgWidthPar(WindowWidth/2)"
								 mode="aspectFill"></image>
							</view>
						</view>
					</view>
					<!-- <text class="text">{{item.Star}}</text> -->
				</view>
				<view class="name">{{item.VideoName || '--'}}</view>
				<view class="description">{{item.Intro || '--'}}</view>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="flex justify-around justify-center morebut-wrap" v-if="dataList.length > 0">
			<view v-if="butType[0]" class="morebut-wrap-but-wrap position-relative" @tap="gotoTab(type)" hover-class="hover-class">
				<!-- <more-but :text="getTitle.more" icon="more"></more-but> -->
				<view class="wrap">
					<text style="margin-right: 5px;" class="text iconfont" :class="{'icon-bofangsanjiaoxing': 'more' === 'more', 'icon-xunhuan' : 'more' === 'reload'}"></text>
					<text class="a-link ">
						{{getTitle.more}}
					</text>
				</view>
				<lu-button-ripple></lu-button-ripple>
			</view>
			<view v-if="butType[1]" class="morebut-wrap-but-wrap position-relative" @tap="change(false, false)" hover-class="hover-class">
				<!-- <more-but text="换一批" icon="reload"></more-but> -->
				<view class="wrap">
					<text style="margin-right: 5px;" class="text iconfont" :class="{'icon-bofangsanjiaoxing': 'reload' === 'more', 'icon-xunhuan' : 'reload' === 'reload'}"></text>
					<text class="a-link ">
						{{'换一批'}}
					</text>
				</view>
				<lu-button-ripple></lu-button-ripple>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import videoCardVer from '@/components/video-card-ver/video-card-ver.vue'
	import mixinLoadingData from '@/common/mixin/loading-data/loading-data.js'
	export default {
		mixins: [mixinLoadingData],
		name: 'video-card-box',
		components: {
			videoCardVer
		},
		data() {
			return {
				// 是否是第一次熏染请求
				firstRequest: true,
				total: 0,
				page: 1,
				limit: 0,
				firstrequestpropPage: true,
				dataList: [] // 列表数据
			}
		},
		props: {
			// 数据
			datalistprop: {
				type: Array,
				default: function() {
					return []
				}
			},
			//首次是否自己请求接口 false 表示 第一次需要外部提供数据
			clickChange: {
				type: Boolean,
				default: true
			},
			//首次是否自己请求接口 false 表示 第一次需要外部提供数据
			firstrequestprop: {
				type: Boolean,
				default: true
			},
			type: {
				type: String,
				required: true
			},
			butType: {
				type: Array,
				default: function() {
					return [true, true]
				}
			},
			max: {
				type: Number,
				required: true,
				validator: function(value) {
					return value >= 4 && value <= 20
				}
			},
			showmask: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			...mapState(["videoTabs"]),
			getTitle() {
				var title = {
					title: '推荐',
					more: ' '
				}
				this.videoTabs.forEach((item, index) => {
					if (item.type === this.type) {
						title = {
							title: `推荐${item.name}`,
							more: `更多${item.name}`
						}
					}
				})
				return title
			},
		},
		watch: {
			datalistprop: {
				handler: function(n) {
					this.firstrequestpropPage = true
					var temp = n
					temp.forEach((item, index) => {
						//头像合法处理
						if (String(item.Avatar).substr(0, 4) !== "http") {
							item.Avatar = '-1'
						}
						item['showImg'] = true
					})

					this.dataList = temp
				},
				deep: true
			},
			firstrequestprop: {
				handler: function(n) {
					this.firstrequestpropPage = n
				},
			},


		},
		created() {
			if (!this.firstrequestprop) {
				var temp = this.datalistprop
				temp.forEach((item, index) => {
					//头像合法处理
					if (String(item.Avatar).substr(0, 4) !== "http") {
						item.Avatar = '-1'
					}
					item['showImg'] = true
				})
				this.dataList = temp
				this.firstRequest = false
			}

			this.firstrequestpropPage = this.firstrequestprop
		},
		mounted() {
			if (this.firstrequestprop) {
				this.getVideoList(false, false)
			}
		},
		methods: {
			getImageClass(index) {
				return {
					[`image-node${index}`]: true
				}
			},
			click(e) {
				this.$emit('click', e)
				if (this.clickChange) {
					this.change(false, false)
				}
			},
			gotoTab(type) {
				this.$emit('moreClick', this.type)
			},
			change(suc = false, fail = false) {
				this.mixin_Loading()
				this.page = this.page + 1
				this.getVideoList(suc, fail)
			},
			reload(suc = false, fail = false) {
				this.page = this.page + 1
				this.getVideoList(suc, fail)
			},
			handleClick(e) {
				this.$emit('handleClick', e)
			},
			getLimit() {
				return 4
			},
			async getVideoList(suc = false, fail = false) {
				this.mixin_Loading()
				try {
					var data = {
						limit: this.max,
						page: 1
					}
					if (this.firstRequest) {
						data['videoRecommend'] = 1
						this.firstRequest = false
					} else {
						data['orderby'] = 'random'
					}
					if (this.type !== 'all') {
						data['type[0]'] = this.type
					}

					let res = await this.$H.post(this.$appConfig.URL.GETVIDEOLIST_URL, data)
					if (!this.$H.errorCheck(res)) {
						this.mixin_LoadEnd()
						fail && fail(res)
						return
					}
					this.mixin_LoadEnd()
					this.total = res.data.total
					var old = this.dataList
					this.dataList = res.data.list
					this.dataList.forEach((item, index) => {
						//头像合法处理
						if (String(item.Avatar).substr(0, 4) !== "http") {
							item.Avatar = '-1'
						}
						item['showImg'] = true
					})
					suc && suc(res)
				} catch (e) {
					console.error(e)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video-title {
		padding: 0 20upx;
		box-sizing: border-box;
	}

	.video-box {
		position: relative;
	}

	.morebut-wrap {
		margin: 20upx 0;
		height: 80upx;

		& .morebut-wrap-but-wrap {
			width: 48%;
			height: 100%;
		}
	}

	.video-card-wrap {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.film {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin-top: 40upx
	}

	.film .title {
		display: -ms-flexbox;
		display: flex;
		font-size: 0
	}

	.film .title .left {
		display: inline-block;
		-ms-flex: 1;
		flex: 1;
		font-size: 34upx;
		font-weight: 700
	}

	.film .right {
		display: inline-block;
		-ms-flex: 1;
		flex: 1;
		font-size: 27upx;
		text-align: right;
	}

	.film .right .icon-keyboard_arrow_right {
		vertical-align: middle
	}

	// 图片

	.video {
		display: inline-block;
		margin-top: 28upx;
		width: 375upx;
		box-sizing: border-box
	}

	.video .pic {
		position: relative;
		width: 100%;
		height: 200upx;
	}

	.video .pic .tip {
		position: absolute;
		top: 10upx;
		right: 10upx;
		padding: 6upx 10upx;
		font-size: 14upx;
		border-radius: 20upx 0 20upx 20upx;
		background: #e8bb20;
		color: #fff
	}

	.video .pic .text {
		position: absolute;
		bottom: 16upx;
		right: 16upx;
		font-size: 24upx;
		color: #fff
	}

	.video .name {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

		padding: 12upx 0 18upx 24upx;
		font-size: 28upx
	}

	.video .description {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

		padding-left: 24upx;
		font-size: 20upx;
		color: #ababab
	}

	.image {
		width: 373upx;
		height: 200upx;
	}


	.me-image-wrap {
		display: inline-block;
		width: 373upx;
		box-sizing: border-box
	}

	.me-image-wrap .pic {
		position: relative;
		width: 100%;
		height: 200upx;
		background-image: url('~@/static/bgimg/img-empty-full.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	@-webkit-keyframes fadeIn {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}

	@-webkit-keyframes fadeOut {
		0% {
			opacity: 1;
		}

		100% {
			opacity: 0;
		}
	}

	.anim_fade_image_fade_out {
		position: absolute;
		animation-name: fadeOut;
		animation-duration: 3s;
		animation-direction: alternate;
	}

	.anim_fade_image {
		position: absolute;
		animation-name: fadeIn;
		animation-duration: .5s;
		animation-direction: alternate;
	}

	// 更多按钮
	.wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		justify-items: center;
		width: 100%;
		height: 100%;
		background-color: $uni-bg-color-grey;

		& .text {
			color: $uni-color-primary-red;
			font-size: 14px;

			&.active {
				color: red;

				& span {
					color: red;
				}
			}

			& span {
				margin-left: 3px;
			}
		}
	}
</style>
