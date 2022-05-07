<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<button type="primary" @click="add">add</button>
		<button type="primary" @click="remove">del</button>
		<button type="primary" @click="update">modify</button>
		<button type="primary" @click="get">get 10</button>
	</view>
</template>

<script>
	const db = uniCloud.database();
	
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
			add() {
				db.collection('test').add({
					name: '1111',
					subType: '2222',
					createTime: Date.now()
				}).then(res => {
					uni.showToast({
						icon: 'success',
						title: 'add ok'
					})
				}).catch(err => {
					uni.showModal({
						content: err.message || 'add fail',
						showCancel: false
					})
				})
			},
			async add_() {
				uni.showLoading({
					title: '处理中...'
				})
				return await uniCloud.callFunction({
					name: 'test-add',
					data: {
						name: 'DCloud',
						subType: 'uniCloud',
						createTime: Date.now()
					}
				}).then((res) => {
					uni.hideLoading()
					uni.showModal({
						content: `成功添加一条数据，文档id为：${res.result.id}`,
						showCancel: false
					})
					console.log(res)
					return res.result.id
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `添加数据失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
			},
			async remove() {
			    uni.showLoading({
			        title: '处理中...'
			    })
			    return await uniCloud.callFunction({
			        name: 'test-remove'
			    }).then((res) => {
			        uni.hideLoading()
			        uni.showModal({
			            content: res.result.msg,
			            showCancel: false
			        })
			        console.log(res)
			        return res.result.msg
			    }).catch((err) => {
			        uni.hideLoading()
			        uni.showModal({
			            content: `删除失败，错误信息为：${err.message}`,
			            showCancel: false
			        })
			        console.error(err)
			    })
			},
			async update() {
			    uni.showLoading({
			        title: '处理中...'
			    })
			    return await uniCloud.callFunction({
			        name: 'test-update',
			        data: {
			            name: 'DCloud',
			            subType: 'html 5+',
			            createTime: Date.now()
			        }
			    }).then((res) => {
			        uni.hideLoading()
			        uni.showModal({
			            content: res.result.msg,
			            showCancel: false
			        })
			        console.log(res)
			        return res.result.msg
			    }).catch((err) => {
			        uni.hideLoading()
			        uni.showModal({
			            content: `更新操作执行失败，错误信息为：${err.message}`,
			            showCancel: false
			        })
			        console.error(err)
			    })
			},
			async get() {
			    uni.showLoading({
			        title: '处理中...'
			    })
			    return await uniCloud.callFunction({
			        name: 'test-get'
			    }).then((res) => {
			        uni.hideLoading()
			        uni.showModal({
			            content: `查询成功，获取数据列表为：${JSON.stringify(res.result.data)}`,
			            showCancel: false
			        })
			        console.log(res)
			        return res.result.data
			    }).catch((err) => {
			        uni.hideLoading()
			        uni.showModal({
			            content: `查询失败，错误信息为：${err.message}`,
			            showCancel: false
			        })
			        console.error(err)
			    })
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
