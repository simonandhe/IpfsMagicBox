<template>
	<view class="">
		<text v-if="title !== ''" class="input-top-title">交易号</text>
		<view class="input-wrap">
			<textarea :maxlength="maxlength" :minlength="minlength" v-if="type == 'password'" class="input" :name="name" :value="inputValue"
			 :type="pwdType" @focus="active = true" @blur="active = false" @input="handleChange" :placeholder="placeholder"></textarea>
			<textarea :maxlength="maxlength" :minlength="minlength" v-else class="input" :name="name" :value="inputValue" :type="type"
			 @focus="active = true" @blur="active = false" @input="handleChange" :placeholder="placeholder"></textarea>
			<!-- 		<image @tap="delUser" class="icon" :class="{'right' : type == 'password'}" :src="imgInfo.icon_del" />
			<image v-if="type == 'password'" @tap="switchPwd" class="icon left" :src="imgInfo.icon_pwd_switch" /> -->
		</view>
		<view class="line" :class="{'active': active}" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pwdType: 'password',
				active: false,
				inputValue: '',
				imgInfo: {
					icon_del: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTdGMzA0MUJCNzFEMTFFODhERUQ5RTUwN0MxOTQ2MDciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTdGMzA0MUNCNzFEMTFFODhERUQ5RTUwN0MxOTQ2MDciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFN0MwNUFBNkI3MUQxMUU4OERFRDlFNTA3QzE5NDYwNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFN0MwNUFBN0I3MUQxMUU4OERFRDlFNTA3QzE5NDYwNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtmF/SwAAAM9SURBVHja7Fg7bxNBEJ71RTGOSywFrER+nNvghooKKhCPhiKRSJUeJH4AokD8ACToXaWICxoeggoqKhonrc8PJXKIZEpijGQv893FcLEvt4u9TnB013itm5uZb+c9QkpJs/zEaMafCEAEIAIQATjbZ05FIITQYsT1JF5t7F4Xsn+X/xVJistcYS65PIi+kZD7fKpIEXtbyC5/Zr5dTb7h+ikJFABqtYPFPnWeMJcNlpbUQivED+ZailHieT6/eHAmAPi7eafefMpfP9ZWPBjICzuXecZyfp0aAPfWZee1JHnNhB8LEl9iInE/yBrGATjO7kqfeu+Z9ZLZcBR7MbJu2/byztQA4OZ7svPVvPJ/QVgicdVvCZV+2mkUPg+3mZ7yrpQl1zVZlvE64AWsGZ8PhcAyIEvbZjou5LoOdZyxs80Y2cmihA1XMuJCyPMq5RmoZKzbfGqHULVBA1qFvyZdmSZcCBXWLVIq5SXdK+RzxWRiPsNKlkdpqIx3oAGtCgRkQvbELsTtwU3q9z6EA6BtKOYDbTn1xiazXjt6v2XnsuusdO8P31q9wu+vhF+vdYvbjo8TWcDrbVRWEulWq7Xgs0jPU5i2gpQHLb4xIXtOIy8UNWhShz+7Jb75BwNF8cv/1wfnIeuU+JgyIVsNgLtK1yOVVqBVVkxCaT+IoXgauNaqXk6F7EmD+Kgl1it2tOYpKK2AZHAsLvRqglr2+Z/I3GFEu/6MBmxQYOt3qWrZagu4k5SW8uVh5eE2fnfygShr9gn7BlxIVDRo2gsX4hsB2WZzOCZAA9rwiq0vWx3EPMOqb1+20un0YVDABgU2aPGNEdkay914td78HtYLDVoJ286+Q5HyasLxVAm3wc1Decdp3JGC3rBsEdbQFXKZi3zqTtyNVmuNl0z3UNUP8Z3teBVWpk5u5nDzYiVUeY/fq0I++8jIRDbz7TQYYXtwWrkdslTrln+eid01Sq35adpTGTYUdj5zY7BmMTYTgyFWHxi8p6j+HmSctCOauJWAWbH6mA4Ib62i6zpj90LY22D1AVObdBvwHN4JGY2Bc7VaHFkzzuJyN2j4/y/X6zM/D0QAIgARgAhABCDs+S3AAC07GXFBbb4IAAAAAElFTkSuQmCC',
					icon_pwd_switch: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0M4NjJGMDlCNzM2MTFFOEI2NTBEQkUxMDAzOENEQjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0M4NjJGMEFCNzM2MTFFOEI2NTBEQkUxMDAzOENEQjUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDQzU3MkYyMkI3MzYxMUU4QjY1MERCRTEwMDM4Q0RCNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDQzU3MkYyM0I3MzYxMUU4QjY1MERCRTEwMDM4Q0RCNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PoqNvfoAAANnSURBVHja7FhLTBNRFH13pkUSfhrCAqltp9CoIWzcqQvBuMGNkigaxRXGGF0Y/xt3ukLxs9C4kBVoNGjQje4UF+paDX5SOv2CC4IfwATbznve2/AZmg5tofKpb5KmL/PmnnvOe/fed2dACMFW86WwVX5JAVKAFCAFSAFSgBSwnJfNagIAcgbT9aGNnMUP43ArtlibEaKS7uN4FMefcfhOYfb7Hk/N11yxrXo2sJzIUgDa2/Rg8Ijg0C6Y2J6NDTB4A4ro8rjd3egnsWwCAoHIDoMbt5F4/UK2H4UMqIp6UtM2vF5SASMjI2U/x3/fQdS2vAQyQM/aspITVVVV4/9cAMW5weJPEXFTGptvTMAzBdhzVWX+0tLSKN2fmJhwGAar5YLtRo970Gd1GodfVGbfa5UfeREwGAw2C0M8xGH53FBgHwUoV+o052O04xlCQRkMhPeB4JfQc0PK9BiocLDO7X6RdwFIvgXJP8Kh3UT8lwA4V6e5uvB5kWNVgcFAqB0JXEPDCtNUHEUcQBF9eRPg00P7EeEBwthMCfiqyK60OZ3O4cWEfzgcXh+L8x4sBE0m7wkkcMjrcfUuWgCu/E5cedrSopnTD+C6R3NdwGeMdLaRSKTmT8y4iiobk1oF6y9eYzvvcDiiFruh6oFQBxfijOl2DHeiGXfi5YIF+EKhepbgb6djnsIEf6drNdctqxUl8pNx4z16rEzB+6GC2KJpWtDK1h8InUI+Nyi8pnOC2ZRtXpdrwIqnZSvh93+vgATvM5NHiGPzkacrufIp5KdWcF1CQMd8toRNPkz5VE4ciEvOvZBgY3cRxWvaqrNej/teFqdTo/UU25XJnHyQr1kezEtclrKZg5RYHKZqNUWGL1k3Cqz8ODr2zawEQKdPDx7NXB9Zf0qSlbDiogZQlIsI0p3JnHyQL9Nq+IiLJc98J3E0GnVMxhIfKOZnsJA8nhUdmcjnNYmT8YiGWMpaqKRNHz6c85t+PdhJpS+dDZVKqjaotpcqD/6PCs6qMxxqKmEStok8ldEW4jBvvK72gyyrJCYgUFkrHfOzoS6aYnHjUzJmZ1ctp1aCbAljLnlqJVirmfyidyDLZu4yNnNPVmwzVxDtdEG80BTEK2XBvNSv6M8q8sucFCAFSAFSgBQgBUgB/4GAvwIMAJUPWbt7S1UZAAAAAElFTkSuQmCC'
				}
			};
		},
		props: {
			value: {
				type: [String, Number],
				default: ''
			},
			maxlength: {
				type: Number,
				default: 255
			},
			minlength: {
				type: Number,
				default: 255
			},
			title: {
				type: String,
				default: ''
			},
			name: {
				type: String,
				default: ''
			},
			type: {
				type: String,
				default: 'text'
			},
			placeholder: {
				type: String,
				default: ''
			}
		},
		watch: {
			value: function(n) {
				this.inputValue = n
			}
		},
		methods: {
			delUser() {
				this.inputValue = ''
				this.$emit('input', '')
			},
			handleChange(e) {
				this.inputValue = e.detail.value
				this.$emit('input', e.detail.value)
			},
			switchPwd() {
				this.pwdType = this.pwdType === 'text' ? 'password' : 'text'
			},
		}
	}
</script>

<style scoped lang="scss">
	.input-wrap {
		position: relative;
		width: 100%;
		// max-height: 45px;

		.icon {
			width: 40upx;
			height: 40upx;
			position: absolute;
			right: 20upx;
			top: 50%;
			transform: translateY(-50%);

			&.left {
				position: absolute;
				right: 20upx;
				top: 50%;
				transform: translateY(-50%);
			}

			&.right {
				position: absolute;
				right: 70upx;
				top: 50%;
				transform: translateY(-50%);
			}
		}

		.input {
			outline: none;
			// height: 100upx;
			width: 100%;
			text-indent: initial !important;

			&:focus {
				outline: none;
			}
		}
	}

	.input-top-title {
		font-size: 16upx;
		color: $uni-text-color;
	}

	.line {
		width: 100%;
		height: 1px;
		background-color: $form-border-color;

		&.active {
			background-color: $uni-color-primary;
		}
	}
</style>
