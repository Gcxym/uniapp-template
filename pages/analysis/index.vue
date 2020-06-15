<template>
	<view>
		<view class="bg-white solids-bottom padding-xs flex align-center">
			工作台
		</view>
		<ucharts-demo></ucharts-demo>
		<project-time-table></project-time-table>
	</view>
</template>

<script>
	import ProjectTimeTable from '@/pages/analysis/time-table.vue'
	import UchartsDemo from '@/pages/analysis/ucharts-demo.vue'
	export default {
		components: {
			ProjectTimeTable,
			UchartsDemo
		},
		data() {
			return {
				
			}
		}
	}
</script>
