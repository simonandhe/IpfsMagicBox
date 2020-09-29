<template>
	<block v-if="position=='top'">
		<view class='tui-tips-class tui-toptips' :style="{top: top + 'px'}" :class="['tui-'+type,show?'tui-top-show':'']">{{msg}}</view>
	</block>
	<block v-else>
		<view class='tui-tips-class tui-toast' :class="[position=='center'?'tui-centertips':'tui-bottomtips',show?'tui-toast-show':'']">
			<view class="tui-tips-content" :class="['tui-'+type]">
				{{msg}}
			</view>
		</view>
	</block>
</template>

<script>
	export default {
		name: "tuiTips",
		props: {
			top: {
				type: [Number, String],
				default: 0
			}
		},
		data() {
			return {
				position: 'top',
				timer: null,
				show: false,
				msg: "无法连接到服务器~",
				//translucent,primary,green,warning,danger
				type: "translucent"
			};
		},
		methods: {
			// basicData: [{
			// 	type: "translucent",
			// 	msg: "一般消息提示~"
			// }, {
			// 	type: "green",
			// 	msg: "成功消息提示~"
			// }, {
			// 	type: "warning",
			// 	msg: "警告消息提示~"
			// }, {
			// 	type: "danger",
			// 	msg: "错误消息提示~"
			// }, {
			// 	type: "primary",
			// 	msg: "其他消息提示~"
			// }, {
			// 	type: "primary",
			// 	msg: "长文字消息提示，看不完信息？可自定义设置显示时间，建议提示信息不要过长"
			// }, {
			// 	type: "translucent",
			// 	msg: "4S后关闭提示框",
			// 	duration: 4000
			// }],
			showTips: function(options) {
				const {
					position = 'top',
						type = 'translucent',
						duration = 2000
				} = options;
				this.position = position
				clearTimeout(this.timer);
				this.show = true;
				// this.duration = duration < 2000 ? 2000 : duration;
				this.type = type;
				this.msg = options.msg;
				this.timer = setTimeout(() => {
					this.show = false;
					clearTimeout(this.timer);
					this.timer = null;
				}, duration);
			}
		}
	}
</script>

<style>
	/*顶部消息提醒 start*/
	.tui-toptips {
		width: 100%;
		padding: 18upx 30upx;
		box-sizing: border-box;
		position: fixed;
		z-index: 9999;
		color: #fff;
		font-size: 30upx;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		word-break: break-all;
		opacity: 0;
		transform: translateZ(0) translateY(-200%);
		transition: all 0.3s ease-in-out;
	}

	.tui-top-show {
		transform: translateZ(0) translateY(0);
		opacity: 1;
	}

	/*顶部消息提醒 end*/

	/*toast消息提醒 start*/

	/*注意问题：
 1、fixed 元素宽度无法自适应，所以增加了子元素
 2、fixed 和 display冲突导致动画效果消失，暂时使用visibility替代
*/
	.tui-toast {
		width: 80%;
		box-sizing: border-box;
		color: #fff;
		font-size: 28upx;
		position: fixed;
		visibility: hidden;
		opacity: 0;
		left: 50%;
		transition: all 0.3s ease-in-out;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-toast-show {
		visibility: visible;
		opacity: 1;
	}

	.tui-tips-content {
		word-wrap: break-word;
		word-break: break-all;
		border-radius: 8upx;
		padding: 18upx 30upx;
	}

	/*底部消息提醒 start*/
	.tui-bottomtips {
		bottom: 120upx;
		-webkit-transform: translateX(-50%);
		transform: translateX(-50%);
	}

	/*底部消息提醒 end*/

	/*居中消息提醒 start*/
	.tui-centertips {
		top: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}

	/*居中消息提醒 end*/

	/*toast消息提醒 end*/

	/*背景颜色 start*/

	.tui-primary {
		background: #5677fc;
	}

	.tui-green {
		background: #19be6b;
	}

	.tui-warning {
		background: #ff7900;
	}

	.tui-danger {
		background: #ed3f14;
	}

	.tui-translucent {
		background: rgba(0, 0, 0, 0.7);
	}

	/*背景颜色 end*/

	/*消息提醒 end*/
</style>
