<template>
	<view>
		<view class="title-wrap">
			<video-title-small @click="titleClink" title="选集" more='更多'></video-title-small>
		</view>
		<scroll-view scroll-x scroll-with-animation>
			<view class="advBar" style="
				white-space: nowrap;
			    display:flex;
			    flex-direction: row;
			    flex-wrap:nowrap;">
				<episodeBut @click="click" :pData="{item, index, active:pData.vsid == item.sid}" class="ml20" v-for="(item, index) in pData.urls"
				 :key="index">
				</episodeBut>
			</view>
		</scroll-view>

	</view>
	</view>
</template>

<script>
	import videoTitleSmall from '@/components/video-title-small/video-title-small.vue'
	import episodeBut from '@/components/episode-but/episode-but.vue'
	export default {
		components: {
			episodeBut,
			videoTitleSmall
		},
		data() {
			return {
				active: true
			};
		},
		props: {
			pData: {
				type: Object,
				required: true
			}
		},
		methods: {
			click(e) {
				this.$emit('butClick', e)
			},
			titleClink(e) {
				this.$emit('click', e)
			}
		}
	}
</script>

<style scoped>
	.ml20 {
		margin-left: 20upx;
	}

	.title-wrap {
		box-sizing: border-box;
		padding: 20upx;
	}
</style>
