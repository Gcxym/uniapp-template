<template>
	<view>
		<form>
			<view class="cu-form-group">
				<view class="title">原密码</view>
				<input password placeholder="原密码" name="oldPassword" v-model="user.oldPassword"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">新密码</view>
				<input password placeholder="新密码" name="newPassword" v-model="user.newPassword"></input>
			</view>
		</form>
		<view class="flex">
			<view class="flex-sub margin-sm">
				<button class="cu-btn block bg-blue margin" @tap="okClick">确认</button>
			</view>
		</view>
	</view>
</template>

<script>
	import md5 from '@/common/md5.min.js'
	import { updateUserPwd } from '@/api/mine.js'
	export default {
		data() {
			return {
				user: {
					oldPassword: '',
					newPassword: ''
				}
			}
		},
		methods: {
			okClick: function (){
				if(!this.user.oldPassword && !this.user.newPassword){
					alert('请输入新密码或者原密码')
				}
				if(this.user.oldPassword === this.user.newPassword){
					alert('两次密码不能一样')
				}
				const params = {
					password: md5(this.user.oldPassword),
					newpw: md5(this.user.newPassword)
				}
				updateUserPwd(params).then(response=>{
					if(response.code === '200'){
						this.msgSuccess('修改成功')
					}else{
						this.msgError(response.msg)
					}
				})
			}
		}
	}
</script>

<style>

</style>
