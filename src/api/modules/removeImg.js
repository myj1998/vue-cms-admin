import axios from 'axios';

//删除图片(封装)
let remove = (data) => axios.post('/upload/delete', data);

export default {
	remove,
}