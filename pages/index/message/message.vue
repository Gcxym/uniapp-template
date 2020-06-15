<!-- 消息 -->
<template>
	<view style="margin-bottom: 100rpx,height:600rpx">
		<mescroll-uni ref="messageRef" height="100%" @init="mescrollInit" :down="downOption" @emptyclick="downCallback" @down="downCallback" :up="upOption" @up="upCallback">
			<view class="mycard">
				<view v-for="item in cardList" :key="item.msgUid" class="card-item">
					<uni-card is-full is-shadow @tapHeader="clickCard(item)">
						<view class="audit-card-content uni-flex uni-row">
							<view class="flex-item-20">
								<image style="width: 100%;" mode="widthFix" :src="Src(item.avatar)" ></image>
							</view>
							<view class="flex-item-80">
								<view class="uni-flex uni-row" @tap="clickCard(item)">
									<view class="small-title">{{item.msgCreaterName}}</view>
								</view>
								<view class="uni-flex uni-row" @tap="clickCard(item)">
									<view>{{item.msgContent}}</view>
								</view>
								<view class="uni-flex uni-row" @tap="clickCard(item)">
									<view>{{item.msgCreateDt}}</view>
								</view>
							</view>
							
						</view>
					</uni-card>
				</view>
			</view>
		</mescroll-uni>
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
		// getRandomArrayElements,
		filePreview,
		formatAuditStatus,
		formatProjectType
	} from '@/utils/index.js'
	import {
		getMessageList
	} from '@/api/message.js'
	import globalConfig from '@/config'
	export default {
		components: {
			MescrollUni,
			uniCard,
			uniTag,
			uniIcons
			// auditIdea
		},
		computed: mapGetters(['user']),
		data() {
			return {
				mescroll: null,
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
		created() {
			this.queryByName()
		},
		methods: {
			Src(data){
				console.log(globalConfig.base+data)
				return globalConfig.base+data
			},
			formatAuditStatus,
			// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {
				// 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
				this.mescroll = mescroll
			},
			/*下拉刷新的回调, 有三种处理方式: */
			downCallback(mescroll) {
				console.log('下拉刷新')
				// 第2种: 下拉刷新和上拉加载调同样的接口, 那以上请求可删, 直接用mescroll.resetUpScroll()代替
				mescroll.resetUpScroll() // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
			},
			/*上拉加载的回调*/
			upCallback(mescroll) {
				// if (!this.user) {
				// 	mescroll.endErr()
				// 	return
				// }
				// console.log('上拉加载')
				// console.log(mescroll)
				/**
				 * todo: api请求分页查询项目待办
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
				// getMessage({msgIsMy:1}).then((res)=>{
				// 	console.log('消息列表',res.data)
				// 	this.cardList=res.data.rows
				// 	mescroll.endByPage(res.data.total, 3)
				// 	this.$nextTick(() => {
				// 		mescroll.endSuccess(res.data.total)
				// 	})
				// 	})
				
				// 此时mescroll会携带page的参数:
				var pageNum = mescroll.num // 页码, 默认从1开始
				let pageSize = mescroll.size // 页长, 默认每页10条
				getMessageList({msgIsMy:1,pageNum,pageSize}).then((res)=>{
					console.log('消息列表',this.cardList)
					// this.cardList=res.data.rows
					    // 接口返回的当前页数据列表 (数组)
						let curPageData = res.data.rows
						// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						let curPageLen = res.data.rows.length; 
						// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
						let totalPage = parseInt(res.data.total/10)
						// 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
						let totalSize = res.data.total
						// 接口返回的是否有下一页 (true/false)
						let hasNext = pageNum<totalPage
						// let hasNext = true
						// console.log('hasNext',hasNext)
						// console.log('totalPage',totalPage)
						if (mescroll.num == 1) this.cardList = [] //如果是第一页需手动置空列表
						this.cardList = this.cardList.concat(curPageData) //追加新数据
						// this.upOption.page.num+=1
						// console.log(MeScroll)
						// console.log('cardList',cardList)
						// 成功隐藏下拉加载状态
						// 方法一(推荐): 后台接口有返回列表的总页数 totalPage
						this.mescroll.endByPage(curPageLen, totalPage);
					}).catch(() => {
						// 失败隐藏下拉加载状态
						mescroll.endErr()
					})
				
				
				// this.$minApi.pageQueryProjectTodo({}, pageNum, pageSize).then(res => {
				// 	// 接口返回的当前页数据列表 (数组)
				// 	let curPageData = res.rows
				// 	// 接口返回的总页数 (比如列表有26个数据,每页10条,共3页; 则totalPage值为3)
				// 	let totalPage = res.totalPageCount
				// 	// 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
				// 	let totalSize = res.total
				// 	// 接口返回的是否有下一页 (true/false)
				// 	let hasNext = res.hasNextPage

				// 	if (mescroll.num == 1) this.cardList = [] //如果是第一页需手动置空列表
				// 	this.cardList = this.cardList.concat(curPageData) //追加新数据

				// 	// 成功隐藏下拉加载状态
				// 	// 方法一(推荐): 后台接口有返回列表的总页数 totalPage
				// 	mescroll.endByPage(curPageData.length, totalPage)
				// 	this.$nextTick(() => {
				// 		mescroll.endSuccess(curPageData.length)
				// 	})
				// }).catch(() => {
				// 	// 失败隐藏下拉加载状态
				// 	mescroll.endErr()
				// })
			},
			clickCard(item) {
				// uni.navigateTo({
				// 	url: '/pages/index/project/detail-project?data=' + JSON.stringify(item)
				// })
				console.log('跳转消息详情')
			},
			adjustClick(item) {
				uni.navigateTo({
					url: '/pages/index/project/adjust-project?data=' + JSON.stringify(item)
				})
			},
			// passClick(item) {
			// 	this.selectedProject = item
			// 	this.isPass = true
			// 	this.$refs.popupAuditIdeaRef.$refs.share.open()
			// },
			// unPassClick(item) {
			// 	this.selectedProject = item
			// 	this.isPass = false
			// 	this.$refs.popupAuditIdeaRef.$refs.share.open()
			// },
			queryByName() {
				uni.showLoading({
					title: '正在查询数据...'
				})
				/**
				 * todo: api请求查询项目待办
				 */
				// setTimeout(() => {
				// 	this.cardList = getRandomArrayElements(this.cardList, 1)
				// 	uni.hideLoading()
				// }, 3000)
				getMessageList({msgIsMy:1,pageNum:1,pageSize:10}).then((res)=>{
					console.log('消息列表',res.data)
					this.cardList=res.data.rows
					uni.hideLoading()
					})
				// this.$minApi.queryProjectTodo({
				// 	projectName: name
				// }).then(res => {
				// 	uni.hideLoading()
				// 	this.cardList = res.rows
				// })
			}
			// updateQuery() {
			// 	// 无效
			// 	// if (this.mescroll !== null) {
			// 	// 	this.downCallback(this.mescroll)
			// 	// }
			// 	console.log('不知道')
			// 	this.queryByName('')
			// }
		}
	}
</script>

<style>
	.mescroll-totop {
		opacity: 1 !important;
	}
	.audit-card-content{
		justify-content: space-between;; 
		align-items: center;
	}
	.flex-item-80{
		padding:0 5%;
	}
	.small-title{
		font-size: medium;
		font-weight: 600;
	}
	/* 
	.flex-item-20 image{
		vertical-align:middle
	}
	.iblock {
		display:inline-block;
		height:100%;
		width:0;
		vertical-align:middle
	} */
</style>
