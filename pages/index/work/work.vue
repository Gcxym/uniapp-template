<!-- 任务 -->
<template>
	<view style="margin-bottom: 100rpx,height:600rpx">
		<mescroll-uni ref="workRef" height="100%" :down="downOption" @emptyclick="downCallback" @down="downCallback" :up="upOption" @up="upCallback"
		 >
			<view class="mycard">
				<view v-for="item in cardList" :key="item.id" class="card-item">
					<uni-card is-full :title="item.orgType" is-shadow :extra="item.createTime" :thumbnail="'/static/img/user/agencyOrg.png'"
					 @tapHeader="clickCard(item)">
						<view class="audit-card-content">
							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<!-- <view class="flex-item-20">模块</view> -->
								<view class="flex-item-80">{{item.module}}模块有新任务，请尽快处理</view>
							</view>
							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<!-- <view class="flex-item-20">任务</view> -->
								<view class="flex-item-80">待{{item.taskName}}</view>
							</view>
							<view class="uni-flex uni-row" @tap="clickCard(item)">
								<!-- <view class="flex-item-20">日期</view> -->
								<view class="flex-item-80">{{item.date}}</view>
							</view>
							<!-- <view class="uni-flex uni-row" @tap="clickCard(item)">
								<view class="flex-item-20">审核状态</view>
								<view class="flex-item-80">
									<uni-tag size="small" :text="formatAuditStatus(item.status).text" :type="formatAuditStatus(item.status).color"
									 :circle="true"></uni-tag>
								</view>
							</view> -->
							<!-- <view class="uni-flex uni-row">
								<view class="flex-item-20">附件</view>
								<view class="flex-item-80">
									<view @click="fileDownloadFn(item.scheId)">
										<uni-icons color="#007aff" type="paperclip" size="22"></uni-icons><text>下载附件</text>
									</view>
								</view>
							</view> -->
						</view>
						<!-- <template v-slot:footer>
							<view class="footer-box">
								<view class="iconfont icontongguo my-iconfont text-green" @tap="passClick(item)">通过</view>
								<view class="iconfont iconweibiaoti522 my-iconfont text-red" @tap="unPassClick(item)">拒绝</view>
							</view>
						</template> -->
					</uni-card>
				</view>
			</view>
		</mescroll-uni>
		<!-- <audit-idea ref="popupAuditIdeaRef" :isPass="isPass" :isPaddingBottom="true" @updateQuery="updateQuery"></audit-idea> -->
	</view>
</template>

<script>
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
	import uniCard from "@/components/uni-card/uni-card"
	import uniTag from '@/components/uni-tag/uni-tag.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	// import auditIdea from '@/pages/index/audit-idea.vue'
	import {
		mapGetters
	} from 'vuex'
	import {
		filePreview,
		fileDownload,
		formatAuditStatus
	} from '@/utils/index.js'
	import {
		postWorkList,
		getWorkDetails
	} from '@/api/message.js'
	export default {
		components: {
			MescrollUni,
			uniCard,
			uniTag,
			uniIcons
		},
		computed: mapGetters(['user','nowWork']),
		created() {
			this.queryByName()
		},
		data() {
			return {
				mescroll: null,
				isPass: false,
				selectedUserItem: {},
				// 下拉刷新的常用配置
				downOption: {
					use: true, // 是否启用下拉刷新; 默认true
					auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
				},
				// 上拉加载的常用配置
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						tip: '暂无相关数据'
					},
					toTop: {
						src: '/static/img/backtop.png'
					},
					textNoMore: '没有更多数据了'
				},
				// 列表数据
				cardList: []
			}
		},
		methods: {
			filePreview,
			fileDownloadFn(data){
				getWorkDetails(data).then((res)=>{
					console.log(res)
				})
			},
			formatAuditStatus,
			/*下拉刷新的回调, 有三种处理方式: */
			downCallback(mescroll) {
				// 第2种: 下拉刷新和上拉加载调同样的接口, 那以上请求可删, 直接用mescroll.resetUpScroll()代替
				mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			},
			/*上拉加载的回调*/
			upCallback(mescroll) {
				// if (!this.user) {
				// 	mescroll.endErr()
				// 	return
				// }

				/**
				 * todo: api请求
				 */
				// setTimeout(() => {
				// 	this.cardList = getRandomArrayElements(this.cardList, 2)
				// 	// 成功隐藏下拉加载状态
				// 	// 方法一(推荐): 后台接口有返回列表的总页数 totalPage
				// 	mescroll.endByPage(this.cardList.length, 3)
				// 	this.$nextTick(() => {
				// 		mescroll.endSuccess(this.cardList.length)
				// 	})
				// }, 2000)
					// 此时mescroll会携带page的参数:
					let pageNum = mescroll.num // 页码, 默认从1开始
					let pageSize = mescroll.size // 页长, 默认每页10条
					// let worksUid=this.$store.getters.nowWork.worksUid
					// console.log('this.$store.getters.nowWork',this.$store.getters.nowWork)
					// let worksUid='202003161057210323ac764b2d9764b8392ca8429bb953a21'
					postWorkList({pageNum,pageSize}).then((res)=>{
						console.log('任务列表',this.cardList)
						// console.log('store',this.$store)
						// 接口返回的当前页数据列表 (数组)
						let curPageData = res.rows
						// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						let curPageLen = res.rows.length;
						// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
						let totalPage = parseInt(res.total/10)
						// 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
						let totalSize = res.total
						// 接口返回的是否有下一页 (true/false)
						let hasNext = pageNum<totalPage

						if (mescroll.num == 1) this.cardList = [] //如果是第一页需手动置空列表
						this.cardList = this.cardList.concat(curPageData) //追加新数据

						// 成功隐藏下拉加载状态
						// 方法一(推荐): 后台接口有返回列表的总页数 totalPage
						this.mescroll.endByPage(curPageLen, totalPage);
					}).catch(() => {
						// 失败隐藏下拉加载状态
						mescroll.endErr()
					})
			},
			clickCard(item) {
				uni.navigateTo({
					url: '/pages/index/user/detail-user?data=' + JSON.stringify(item)
				})
			},
			// passClick(item) {
			// 	this.selectedUserItem = item
			// 	this.isPass = true
			// 	this.$refs.popupAuditIdeaRef.$refs.share.open()
			// },
			// unPassClick(item) {
			// 	this.selectedUserItem = item
			// 	this.isPass = false
			// 	this.$refs.popupAuditIdeaRef.$refs.share.open()
			// },
			queryByName(name) {
				uni.showLoading({
					title: '正在查询数据...'
				})
				// console.log('nowWork',this.nowWork.worksUid)
				// let worksUid=this.$store.getters.nowWork.worksUid
				// let worksUid = this.nowWork.worksUid
				// let worksUid='202003161057210323ac764b2d9764b8392ca8429bb953a21'
				postWorkList({pageNum:1,pageSize:10}).then((res)=>{
					console.log('任务列表',res.rows)
					this.cardList=res.rows
					uni.hideLoading()
					})
					
				/**
				 * todo: api请求
				 */
				// setTimeout(() => {
				// 	this.cardList = getRandomArrayElements(this.cardList, 1)
				// 	uni.hideLoading()
				// }, 3000)

				// this.$minApi.queryUserData({
				// 	orgName: name
				// }).then(res => {
				// 	uni.hideLoading()
				// 	this.cardList = res
				// })
			},
			updateQuery() {
				// 无效
				// if (this.mescroll !== null) {
				// 	this.downCallback(this.mescroll)
				// }
				this.queryByName('')
			}
		}
	}
</script>
