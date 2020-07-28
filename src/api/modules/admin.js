import axios from 'axios';

//登录  (封装)
let login = (data) => axios.post('/admin/login', data);

//注册 (封装)
let register = (data) => axios.post('/admin/register', data);

//管理员列表 
let list = (data) => axios.get('/admin/list', { params: data });

//管理员个人资料 (封装)get方法
let info = (data) => axios.get('/admin/info', { params: data }); //get传参 必须后面是对象

//删除管理员角 (封装)
let remove = (data) => axios.post('/admin/delete', data);

// 编辑管理员信息 (封装)post方法
let update = (data) => axios.post('/admin/info', data);

//外包(供外部使用)
export default {
	login,
	register,
	list,
	info,
	remove,
	update,
}
