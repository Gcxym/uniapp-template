<template>
  <view>
    <view class="person-head">
      <cmd-avatar
        src="https://avatar.bbs.miui.com/images/noavatar_small.gif"
        @click="fnInfoWin"
        size="lg"
        :make="{'background-color': '#fff'}"
      ></cmd-avatar>
      <view class="person-head-box">
        <view class="person-head-nickname">用户名: {{username}}</view>
        <!-- <view class="person-head-username">职位：{{}}</view> -->
      </view>
    </view>
    <view class="person-list">
	  <cmd-cell-item title="手机号码" slot-left :addon="phone" arrow>
		<cmd-icon type="bullet-list" size="24" color="#368dff"></cmd-icon>
	  </cmd-cell-item>
	  <cmd-cell-item title="创建日期" slot-left :addon="createTime" arrow>
		<cmd-icon type="bullet-list" size="24" color="#368dff"></cmd-icon>
	  </cmd-cell-item>
	  <cmd-cell-item title="所属部门" slot-left :addon="branch" arrow>
	    <cmd-icon type="bullet-list" size="24" color="#368dff"></cmd-icon>
	  </cmd-cell-item>
      <cmd-cell-item title="切换站点" slot-left arrow @click="cut">
        <cmd-icon type="bullet-list" size="24" color="#368dff"></cmd-icon>
      </cmd-cell-item>
	  <button class="btn-logout" @tap="logout">退出登录</button>
    </view>
  </view>
</template>

<script>
import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue";
import cmdIcon from "@/components/cmd-icon/cmd-icon.vue";
import cmdCellItem from "@/components/cmd-cell-item/cmd-cell-item.vue";
import { mapGetters } from 'vuex'
	
export default {
  components: {
    cmdAvatar,
    cmdCellItem,
    cmdIcon
  },
  computed: mapGetters(['user']),
  data() {
    return {
		username: '',
		createTime: '',
		branch: '',
		phone: ''
	};
  },
  created() {
		console.log(this.user.nickName,'user')
		this.username = this.user.nickName
		this.createTime = this.user.createTime
		this.branch = this.user.dept.deptName
		this.phone = this.user.phonenumber
  },
  methods: {
    /**
     * 打开用户信息页
     */
    fnInfoWin() {
      uni.navigateTo({
        url: "/pages/user/info/info"
      });
    },
	cut() {
		uni.navigateTo({
			url: "/pages/user/website/website"
		})
	},
	// 退出登录
	logout() {
	  this.$store.dispatch("LogOut");
	  uni.reLaunch({
	    url: "/pages/login/login"
	  });
	}
  }
};
</script>

<style>
.btn-logout {
  margin-top: 100upx;
  width: 80%;
  border-radius: 50upx;
  font-size: 16px;
  color: #fff;
  background: linear-gradient(to right, #365fff, #36bbff);
}
	
.btn-logout-hover {
  background: linear-gradient(to right, #365fdd, #36bbfa);
}
.person-head {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 150px;
  padding-left: 20px;
  background: linear-gradient(to right, #365fff, #36bbff);
}

.person-head-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 10px;
}

.person-head-nickname {
  font-size: 18px;
  font-weight: 500;
  color: #fff;
}

.person-head-username {
  font-size: 14px;
  font-weight: 500;
  color: #fff;
}

.person-list {
  line-height: 0;
}
</style>
