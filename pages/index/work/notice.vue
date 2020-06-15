<!-- 公告 -->
<template>
	<view style="margin-bottom: 100rpx,height:600rpx">
		<mescroll-uni :down="downOption" height="100%" @emptyclick="downCallback" @down="downCallback" :up="upOption" @up="upCallback">
			<view class="mycard">
				<view v-for="item in cardList" :key="item.id" class="card-item">
					<uni-card is-full is-shadow @tapHeader="clickCard(item)">
						<view class="audit-card-content uni-flex uni-row">
							<view class="flex-item-20">
								<image style="width: 100%;" mode="widthFix" :src="Src(item.avatar)" ></image>
							</view>
							<view class="flex-item-80">
								<view class="uni-flex uni-row" @tap="clickCard(item)">
									<view class="small-title">{{item.title}}</view>
								</view>
								<view class="uni-flex uni-row" @tap="clickCard(item)">
									<view class="">{{item.content}}</view>
								</view>
								<view class="uni-flex uni-row" @tap="clickCard(item)">
									<view class="">{{item.createTime}}</view>
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
	import globalConfig from '@/config'
	import {
		mapGetters
	} from 'vuex'
	import {
		filePreview,
		formatAuditStatus
	} from '@/utils/index.js'
	import {
		getNoticeList
	} from '@/api/message.js'
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
			Src(data){
				return globalConfig.base+data
			},
			filePreview,
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
				// 此时mescroll会携带page的参数:
				var pageNum = mescroll.num // 页码, 默认从1开始
				let pageSize = mescroll.size // 页长, 默认每页10条
				getNoticeList({pageNum,pageSize}).then((res)=>{
					console.log('公告列表',res,this.cardList)
					// this.cardList=res.data.rows
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
			},
			clickCard(item) {
				uni.navigateTo({
					url: '/pages/index/work/notice-add'
				})
			},
			queryByName(name) {
				uni.showLoading({
					title: '正在查询数据...'
				})
				/**
				 * todo: api请求
				 */
				getNoticeList({pageNum:1,pageSize:10}).then((res)=>{
					console.log('公告列表',res.rows)
					this.cardList=res.rows
					uni.hideLoading()
					})
			}
		}
	}
</script>
<style>
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
</style>