<template>
	<view class="val-text-wrap" :class="className">
		<textarea v-if="showInput" type="text" class="val-text" :value="val" />
		<text v-if="!slotInput" @tap="copy" class="copy-but">
			<text>
				{{buttext}}
			</text>
		</text>
		<text v-else @tap="copy">
			<slot></slot>
		</text>
	</view>
</template>

<script>
	export default {
		props: {
			buttext: {
				type: String,
				default: '复制'
			},
			showInput: {
				type: Boolean,
				default: true
			},
			slotInput: {
				type: Boolean,
				default: false
			},
			val: {
				type: String,
				default: ''
			},
			external: {
				type: Boolean,
				default: false
			},
			className: {
				type: String,
				default: ''
			}
		},

		methods: {
			copy() {
				if (this.external) {
					this.$emit('copyClick')
					return
				}

				if (this.val === '') {
					uni.showToast({
						icon: 'none',
						title: '复制失败内容为空'
					})
					return
				}
				this.copyTextToClipboard(this.val)

			},
			copyText(text) {
				this.val = text

				if (this.val === '') {
					uni.showToast({
						icon: 'none',
						title: '复制失败内容为空'
					})
					return
				}
				this.copyTextToClipboard(this.val)

			},
			copyTextToClipboard(text) {
				// #ifdef H5
				var textArea = document.createElement("textarea")
				textArea.style.position = 'fixed'
				textArea.style.top = 0
				textArea.style.left = 0
				textArea.style.width = '2em'
				textArea.style.height = '2em'
				textArea.style.padding = 0
				textArea.style.border = 'none'
				textArea.style.outline = 'none'
				textArea.style.boxShadow = 'none'
				textArea.style.background = 'transparent'
				textArea.value = text
				document.body.appendChild(textArea)
				textArea.select()
				try {
					var msg = document.execCommand('copy') ? '成功' : '失败'
					uni.showToast({
						icon: 'none',
						title: '复制成功'
					})
				} catch (err) {
					uni.showToast({
						icon: 'none',
						title: '复制失败'
					})
				}
				document.body.removeChild(textArea)
				// #endif
				// #ifdef APP-PLUS
				uni.setClipboardData({
					data: this.val,
					success: function() {
						uni.showToast({
							icon: 'none',
							title: '复制成功'
						})
					}
				});
				// #endif
			}

		}
	}
</script>

<style lang="scss" scoped>
	.val-text-wrap {
		width: 600upx;
		display: flex;
		justify-items: center;
		flex-direction: column;
	}

	.val-text {
		display: block;
		width: 100%;
		height: 120upx;
		text-align: center;
		font-size: 26upx;
		color: $uni-text-color;
	}

	.copy-but {
		display: block;
		color: $uni-text-color-grey;
		border: 1upx solid $uni-border-coloer-grey;
		border-radius: 8upx;
		padding: 10upx 30upx;
		margin: 20upx auto;
	}
</style>
