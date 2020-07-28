import axios from 'axios';

// 获取所有用户 (封装)
let list = (data) => axios.get('/user/list', { params: data });

// 删除用户 (封装)
let remove = (id) => axios.delete(`/user/${id}`); //axios支持RestFul API 风格

// 用户个人资料(封装)
let info = (data) => axios.get('/user/', { params: data }); //get传参 必须后面是对象

// 编辑个人资料(封装)
let update = (id, data) => axios.put(`/user/${id}`, data); //axios支持RestFul API 风格

export default {
	list,
	remove,
	info,
	update,
}
