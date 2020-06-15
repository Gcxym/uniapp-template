<template>
	<view class="personal">
		<view class="mail-list">
			<view class="mail-list-item uni-flex">
				<view class="mail-list-img" @click="handlePreview">
					<image class="mail-list-img" :src="Src(dataList.avatar)" mode="aspectFit"></image>
				</view>
				<view class="mail-list-name">
					<text>{{dataList.nickName}}</text>
				</view>
			</view>
		</view>
		<view class="personal-info">
			<view class="personal-info-list">
				<view class="person-info-key">手机</view>
				<view class="person-info-value person-info-color" @click="handlePlay">{{dataList.phonenumber}}</view>
			</view>
			<view class="personal-info-list">
				<view class="person-info-key">邮箱</view>
				<view class="person-info-value person-info-color">{{dataList.email}}</view>
			</view>
			<view class="personal-info-list">
				<view class="person-info-key">部门</view>
				<view class="person-info-value">{{deptName}}</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getUserInfo
	} from "@/api/communication.js";
	import globalConfig from '@/config'
	export default {
		name: "personal",
		data() {
			return {
				src: require("@/static/img/avatar.png"),
				deptName: '',
				dataList: {}
			};
		},
		onLoad(option) {
			if (option.userId) {
				this.getUserInfoList(option.userId)
			}
		},
		methods: {
			handlePreview() {
				uni.previewImage({
					urls: [this.Src(this.dataList.avatar)]
				});
			},
			Src(data) {
				if (data) {
					return globalConfig.base + data
				} else {
					return this.src
				}
			},
			getUserInfoList(userId) {
				getUserInfo(userId).then(res => {
					if (res.code === 200) {
						this.dataList = res.data
						this.deptName = res.data.dept.deptName
					}
				})
			},
			handlePlay() {
				uni.makePhoneCall({
					phoneNumber: this.dataList.phonenumber
				});
			}
		}
	}
</script>

<style lang="scss">
	.personal {
		.mail-list {
			background-color: #fff;
			margin: 10px 0;

			.mail-list-item {
				height: 80px;
				padding: 0 10px 0 20px;
				align-items: center;

				.mail-list-img {
					width: 60px;
					height: 60px;
					border-radius: 10px;
				}
			}

			.mail-list-name {
				line-height: 60px;
				font-weight: bold;
				padding-left: 20px;
				flex: 1;
			}
		}

		.personal-info {
			background-color: #fff;

			.personal-info-list {
				display: flex;
				padding: 10px;
				border-bottom: 1px solid #eee;

				.person-info-key {
					width: 15%;
					padding-left: 10px;
					font-weight: bold;
				}

				.person-info-value {}

				.person-info-color {
					color: #80b3f9;
				}
			}
		}
	}
</style>
