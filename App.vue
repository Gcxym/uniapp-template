<script>
export default {
  onLaunch: function() {
    this.autoLogin();
  },
  onShow: function() {
    // console.log("App Show");
  },
  onHide: function() {
    // console.log("App Hide");
  },
  methods: {
    autoLogin() {
      let token = uni.getStorageSync("SET_TOKEN"); // 判断有没有token，有则说明登录过了，重新把缓存存进vuex
      if (!token) {
        uni.redirectTo({
          url: "/pages/user/login/login"
        });
      } else {
        this.$store.dispatch("GetInfo");
      }
    }
  }
};
</script>

<style lang="scss">
/* 头条小程序需要把 iconfont 样式放到组件外 */
@import "components/m-icon/m-icon.css";
@import "common/css/uni.scss";
@import "common/css/common.scss";
</style>

