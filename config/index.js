/**
 * ip地址或域名
 */
const baseUrl = 'http://42.159.95.196:8085'
/**
 * api前缀
 */
let apiPrefix = ''
if (process.env.NODE_ENV === 'development') {
	apiPrefix = '/dev-api'
} else {
	apiPrefix = '/prod-api'
}
/**
 * 针对不同平台的baseUrl
 */
export default
	// #ifdef H5
	apiPrefix
// #endif
// #ifndef H5
baseUrl
// #endif
