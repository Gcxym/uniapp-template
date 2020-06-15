<template>
  <view>
    <cmd-nav-bar back title="信息设置"></cmd-nav-bar>
    <cmd-page-body type="top">
      <cmd-transition name="fade-up">
        <view>
          <cmd-cel-item title="头像" slot-right arrow>
            <cmd-avatar src="https://avatar.bbs.miui.com/images/noavatar_small.gif"></cmd-avatar>
          </cmd-cel-item>
          <cmd-cel-item title="用户名" :addon="username" arrow></cmd-cel-item>
          <cmd-cel-item title="姓名" :addon="name" arrow></cmd-cel-item>
          <cmd-cel-item title="邮箱" :addon="email" arrow></cmd-cel-item>
          <cmd-cel-item title="修改密码" @click="modifyPass" arrow></cmd-cel-item>
        </view>
      </cmd-transition>
    </cmd-page-body>
  </view>
</template>

<script>
import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue";
import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue";
import cmdTransition from "@/components/cmd-transition/cmd-transition.vue";
import cmdCelItem from "@/components/cmd-cell-item/cmd-cell-item.vue";
import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue";
import { mapGetters } from 'vuex'

export default {
  components: {
    cmdNavBar,
    cmdPageBody,
    cmdTransition,
    cmdCelItem,
    cmdAvatar
  },
  computed: mapGetters(['user']),
  data() {
    return {
		username: '',
		name: '',
		email: ''
	};
  },

  mounted() {
	  console.log(this.user,'user')
	  this.username = this.user.nickName
	  this.name = this.user.userName
	  this.email = this.user.email
  },

  methods: {
    modifyPass() {
      uni.navigateTo({
        url: "/pages/user/modify/modify"
      });
    }
  }
};
</script>

