<template>
	<view class="nav-bar-wrap">
		<scroll-view id="nav-bar" class="nav-bar" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view v-for="(item,index) in tabBars" :key="item.id" class="nav-item" :style="{width: itemWidth}" hover-class="uni-hover-l"
			 :class="{current: index === tabCurrentIndex}" :id="'tab'+index" @click="changeTab(index)">{{item.name}}
				<lu-button-ripple></lu-button-ripple>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	let windowWidth = 0,
		scrollTimer = false,
		tabBar;

	export default {
		name: "nav-bar",
		props: {
			showFull: {
				type: Boolean,
				default: true
			},
			index: {
				type: Number,
				default () {
					return 0;
				}
			},
			tabBars: {
				type: Array,
				default () {
					return [];
				}
			}
		},
		data() {
			return {
				itemWidth: '50%',
				tabCurrentIndex: 0, //当前选项卡索引
				scrollLeft: 0, //顶部选项卡左滑距离
				enableScroll: true,
			}
		},

		watch: {
			index: {
				handler(n, o) {
					this.changeTab(n);
				}
			}
		},
		created() {
			this.itemWidth = (100 / this.tabBars.length).toFixed(2) + '%'
		},
		methods: {
			//tab切换
			changeTab(e) {
				this.tabCurrentIndex = e;
				this.$emit('change', {
					id: this.tabBars[e].id,
					index: e
				});
			}
		}

	}
</script>

<style lang="scss" scoped>
	.nav-bar-wrap {
		background-color: #FFFFFF;
	}

	/* 顶部tabbar */
	.nav-bar {
		position: relative;
		z-index: 10;
		white-space: nowrap;

		.nav-item {
			display: inline-block;
			width: 50%;
			height: 100upx;
			text-align: center;
			line-height: 100upx;
			font-size: 34upx;
			color: $uni-text-color;
			position: relative;

			&:after {
				content: '';
				width: 0;
				height: 0;
				border-bottom: 4upx solid $uni-color-primary-red;
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				transition: .3s;
			}
		}

		.current {
			color: $uni-color-primary-red;

			&:after {
				width: 25%;
			}
		}
	}
</style>
