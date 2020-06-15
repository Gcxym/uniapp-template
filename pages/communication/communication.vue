<template>
	<view class="communication">
		<view class="example-body">
			<uni-search-bar @confirm="search" @input="input" @cancel="cancel" />
		</view>
		<view class="mail-list">
			<view v-for="(item,index) in dataList" :key="index" class="mail-list-item uni-flex" @click="handleJump(item.userId)">
				<view class="mail-list-img">
					<image class="mail-list-img" :src="Src(item.avatar)" mode="aspectFit"></image>
				</view>
				<view class="mail-list-name">
					<text>{{item.nickName}}</text>
				</view>
			</view>
		</view>
		<view class="mail-list-num">共{{dataList.length}}人</view>
	</view>
</template>

<script>
	import {
		getAddressBook
	} from "@/api/communication.js";
	import globalConfig from '@/config'
	import {
		mapGetters
	} from "vuex";
	import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue";
	export default {
		components: {
			uniSearchBar
		},
		computed: mapGetters(["user"]),
		data() {
			return {
				src: require("@/static/img/avatar.png"),
				dataList: []
			};
		},
		onLoad() {
			this.getAddressBookList();
		},
		onBackPress() {
			// #ifdef APP-PLUS
			plus.key.hideSoftKeybord();
			// #endif
		},
		methods: {
			Src(data) {
				if (data) {
					return globalConfig.base + data
				} else {
					return this.src
				}
			},
			search(res) {
				uni.showToast({
					title: "搜索：" + res.value,
					icon: "none"
				});
			},
			input(res) {
				this.searchVal = res.value;
			},
			cancel(res) {
				uni.showToast({
					title: "点击取消，输入值为：" + res.value,
					icon: "none"
				});
			},
			getAddressBookList() {
				let query = {
					userId: this.user.userId
				};
				getAddressBook(query).then(res => {
					if (res.code === 200) {
						this.dataList = res.data;
					}
				});
			},
			handleJump(userId) {
				uni.navigateTo({
					url: `./personal?userId=${userId}`
				});
			}
		}
	};
</script>

<style lang="scss">
	.communication {
		.mail-list {
			background-color: #fff;

			.mail-list-item {
				height: 60px;
				padding: 0 10px 0 20px;
				align-items: center;

				.mail-list-img {
					width: 45px;
					height: 45px;
					border-radius: 10px;
				}
			}

			.mail-list-name {
				line-height: 60px;
				font-weight: bold;
				padding-left: 20px;
				flex: 1;
				border-bottom: 1px solid #eee;
			}
		}

		.mail-list-num {
			display: flex;
			justify-content: center;
			margin-top: 10px;
			margin-bottom: 10px;
		}
	}
</style>
