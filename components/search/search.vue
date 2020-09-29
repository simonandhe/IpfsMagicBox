<template>
	<view>
		<view class="header">
			<view class="search" @tap="goSearch">
				<text class="icon-search"></text>
				反贪风暴3
			</view>
			<text class="time"></text>
			<text class="tv"></text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			goSearch() {
				this.navigateTo({
					url: '/pages/search/search',
					checkLogin: false
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		position: relative;
		z-index: 100;
		background-color: transparent!important;
	}
</style>
