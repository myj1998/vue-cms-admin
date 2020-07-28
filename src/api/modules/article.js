import axios from 'axios';

// 获取所有文章 (封装)
let list = (data) => axios.get('/article/list', { params: data });

//获取指定文章信息
let detail = (data) => axios.get('/article/detail', { params: data });

//删除指定id的文章
let remove = (data) => axios.post('/article/delete', data);

//编辑指定的文章
let edit = (data) => axios.post('/article/edit', data);

//发布新文章
let add = (data) => axios.post('/article/add', data);

export default {
	list,
	detail,
	remove,
	edit,
	add,
}
