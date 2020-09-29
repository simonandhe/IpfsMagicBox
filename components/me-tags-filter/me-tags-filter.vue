<template>
	<view class="me-tags-filter-wrap">
		<scroll-view scroll-x scroll-with-animation>
			<view class="advBar bg-white mt-3" style="
				white-space: nowrap;
			    display:flex;
			    flex-direction: row;
			    flex-wrap:nowrap;">
				<view class="tag-item text-sm mr-2 rounded-be-circle position-relative" hover-class="hover-class" @tap="selectTypeClick(index)"
				 :class="{active: selectTypeIndex == index}" v-for="(item, index) in type" :key="index">
					{{item.name}}
					<lu-button-ripple></lu-button-ripple>
				</view>
			</view>
		</scroll-view>
		<scroll-view scroll-x scroll-with-animation>
			<view class="advBar bg-white mt-3" style="
				white-space: nowrap;
			    display:flex;
			    flex-direction: row;
			    flex-wrap:nowrap;">
				<view class="tag-item text-sm mr-2 rounded-be-circle position-relative" @tap="selectTagClick(index)" :class="{active: selectTagIndex == index}"
				 v-for="(item, index) in tag" :key="index">
					{{item.Name}}
					<lu-button-ripple></lu-button-ripple>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				type: [],
				tag: [],
				selectType: {},
				selectTag: {},
				selectTypeIndex: 0,
				selectTagIndex: 0
			};
		},
		computed: {
			...mapState(["videoTabs", "videoTags"])
		},
		mounted() {
			this.videoTabs.forEach((item, index) => {
				this.type.push({
					"name": item.name,
					"type": item.type,
					'select': false
				})
			})
			this.videoTags.forEach((item, index) => {
				this.tag.push({
					Id: item.Id,
					Name: item.Name,
					Value: item.Value,
				})
			})

			this.type.unshift({
				"name": "全部",
				"type": "0",
				select: true
			})
			this.tag.forEach((item, index) => {
				item['select'] = false
			})
			this.tag.unshift({
				"Id": "0",
				"Name": "全部国家",
				"Value": "0",
				select: true
			})

			this.selectType = {
				"name": "全部",
				"type": "0",
				select: true
			}
			this.selectTag = {
				"Id": "0",
				"Name": "全部国家",
				"Value": "0",
				select: true
			}
			this.selectTypeIndex = 0
			this.selectTagIndex = 0



		},
		methods: {
			selectTypeClick(index) {
				if (this.selectTypeIndex == index) {
					return
				}
				this.type.forEach((item, index) => {
					item.select = false
				})
				this.type[index].select = true
				this.selectTypeIndex = index
				this.selectType = this.type[index]
				this.$emit('change', [{
						type: 'type',
						select: this.selectType
					},
					{
						type: 'tag',
						select: this.selectTag
					},

				])
			},
			selectTagClick(index) {
				if (this.selectTagIndex == index) {
					return
				}
				this.tag.forEach((item, index) => {
					item.select = false
				})
				this.tag[index].select = true
				this.selectTagIndex = index
				this.selectTag = this.tag[index]

				this.$emit('change', [{
						type: 'type',
						select: this.selectType
					},
					{
						type: 'tag',
						select: this.selectTag
					},
				])
			}
		}
	}
</script>

<style lang="scss">
	.me-tags-filter-wrap {
		position: relative;
		z-index: 999;
		background-color: #FFFFFF;
		padding-bottom: 30upx;
	}

	.tag-item {
		padding: 10upx 30upx;

		&.active {
			color: var(--primary);
			background-color: rgba(1, 123, 255, 0.1);
		}
	}
</style>
