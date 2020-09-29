<template>
	<view>
		<view class="pricing">
			<view class="icon">
				<text class="fingerText">戳</text>
				<text class="finger icon-point-right"></text>
			</view>
			<view class="textBox">
				<an-notice-bar :text="noticeMsg"></an-notice-bar>
			</view>
		</view>
	</view>
</template>
<script>
	import AnNoticeBar from '@/components/an-notice-bar/an-notice-bar.vue'
	export default {
		components: {
			AnNoticeBar
		},
		data() {
			return {
				noticeMsg: '消息1|消息2'
			};
		}
	}
</script>

<style scoped>

</style>
