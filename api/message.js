import request from '@/utils/request'
var worksUid=''
// 消息-消息列表
export function getMessageList(data) {
	return request.get('/msg/getMsgPage',{ params: data })
}
// 消息-任务列表
export function postWorkList(data) {
	worksUid=uni.getStorageSync('SET_NOWWORK').worksUid;
	return request.post('/todoItem/todoList',Object.assign(data,{worksUid}),"formData")
}
// 消息-任务详情
export function getWorkDetails(id) {
	return request.get('/schedule/'+id)
}
// 消息-公告列表
export function getNoticeList(data) {
	
	worksUid=uni.getStorageSync('SET_NOWWORK')
	return request.get('/water/notice/list',Object.assign(data,{worksUid}))
	// return request.get('/water/notice/list',data)
}
// 消息-新建公告
export function postNotice(data) {
	return request.post('/water/notice',data)
}