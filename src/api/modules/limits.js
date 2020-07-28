import axios from 'axios';

// 获取列表 (封装)
let list = (data) => axios.get('/role/list', { params: data });

// 添加角色(封装)
let insert = (data) => axios.post('/role', data);

//删除角色 (封装)
let remove = (id) => axios.delete(`/role/${id}`); //axios支持RestFul API 风格

// 修改角色 (封装)
let update = (id, data) => axios.put(`/role/${id}`, data); //axios支持RestFul API 风格

export default {
	list,
	insert,
	remove,
	update,
}
