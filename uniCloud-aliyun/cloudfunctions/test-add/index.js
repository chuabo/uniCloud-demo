'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const collection = db.collection("test")
	const res = await collection.add(event)
	//event为客户端上传的参数
	console.log('event : ', event)
	
	//返回数据给客户端
	//return event
	return res
};
