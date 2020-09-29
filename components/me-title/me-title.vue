<template>
	<view class="film">
		<view class="title d-flex a-center">
			<text class="iconfont icon-yuandianzhong mr-1"></text>
			<text class="left">{{title}}</text>
		</view>
		<!-- <text @tap="click({title, more})" v-if="more != ''" class="right"><text class="more">{{more}}</text>
			<text class="icon-keyboard_arrow_right"></text>
		</text> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			title: {
				type: String,
				required: true
			},
			more: {
				type: String,
				default: ''
			}
		},
		methods: {
			click(e) {
				this.$emit('click', e)
			}
		}
	}
</script>

<style scoped>
	.icon-yuandianzhong {
		color: #d60419;
	}

	.film {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
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
</style>
