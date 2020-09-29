<template>
	<image :src="img_url||imgSrc" @error="handleLoadError" :mode="mode" :lazy-load="lazyLoad" :style="setStyle"></image>
</template>

<script>
	export default {
		name: 'image-cache',
		props: {
			mode: {
				type: String,
				default: ''
			},
			lazyLoad: {
				type: Boolean,
				default: false
			},
			imgSrc: {
				type: String
			},
			defaultImg: {
				type: String,
				default: ''
			},
			setStyle: {
				type: String,
				default: ''
			},
			cache: {
				type: Boolean,
				default: true,
			},
			cacheTime: {
				type: Number,
			},
			delay: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				img_url: ''
			}
		},

		computed: {
			useCache() {
				// 判断环境
				let inH5 = false
				// #ifdef H5
				inH5 = true
				// #endif
				// 判断是否使用缓存
				return !inH5 && this.cache
			}
		},
		watch: {
			// #ifndef H5
			imgSrc: {
				handler(src) {
					if (!this.useCache) return;
					this.handleCache(src)
				},
				immediate: true
			},
			// #endif
		},

		methods: {
			async handleCache(src) {
				const sign = 'cached-image';
				const cachedRes = await uni.getStorage({
					key: sign + src
				})
				// console.log("cachedRes: " + JSON.stringify(cachedRes));
				const cachedUrl = cachedRes[1] && cachedRes[1].data;
				if (cachedUrl && this.cacheTime) {
					// console.log('检查缓存时间为：'+this.cacheTime*24*60+'分钟的图片是否过期');
					const cachedUrlInfo = await uni.getSavedFileInfo({
						filePath: cachedUrl
					})
					const createTime = cachedUrlInfo[1] && cachedUrlInfo[1].createTime
					const expiredTime = createTime + this.cacheTime * 24 * 60 * 60 * 1000
					// console.log(expiredTime,+new Date());
					if (expiredTime > +new Date()) {
						// console.log('缓存未过期');
						this.img_url = cachedUrl
						return;
					} else if (expiredTime) {
						// console.log('缓存已过期');
						// 删除缓存过期的图片
						uni.removeSavedFile({
							filePath: cachedUrl
						});
						uni.removeStorage({
							key: sign + src
						})
					} else {
						// console.log('缓存被清除');
					}
				} else if (cachedUrl && !this.cacheTime) {
					// console.log('未设缓存时间');
					this.img_url = cachedUrl;
					return;
				}
				// console.log('执行缓存文件过程-未缓存过或缓存过期或缓存被清除');
				setTimeout(() => {
					// console.log('执行缓存下载');
					uni.downloadFile({
						url: src
					}).then(res => {
						// console.log(src);
						// console.log("res: " + JSON.stringify(res));
						if (res[1].statusCode == 200) {
							// this.img_url = res[1].tempFilePath;
							return uni.saveFile({
								tempFilePath: res[1].tempFilePath
							})
						} else {
							// this.img_url = '';
							return Promise.reject('下载临时文件失败')
						}
					}).then(res => {
						// console.log("res: " + JSON.stringify(res));
						if (res[1] && !res[0]) {
							return uni.setStorage({
								key: sign + src,
								data: res[1].savedFilePath
							})
						}
					}).catch(info => {
						// this.img_url = '';
						// console.log("info: " + JSON.stringify(info));
					})
				}, this.delay * 60 * 1000)
			},
			handleLoadError() {
				if (this.img_url) {
					// 如果使用缓存地址加载失败的话换回默认源地址
					this.img_url = '';
				} else {
					// 加载失败图的base64码
					this.img_url =
						'data:image/png;base64,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';
				}
			}
		}
	}
</script>
