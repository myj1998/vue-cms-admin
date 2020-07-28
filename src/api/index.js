import Admin from './modules/admin'; //后缀名.js可以省略
import Article from './modules/article'; //后缀名.js可以省略
import User from './modules/user'; //后缀名.js可以省略
import Limits from './modules/limits'; //后缀名.js可以省略 (角色的)
import Upload from './modules/removeImg'; //后缀名.js可以省略 (删除图片用的)
import Category from './modules/category'; 


export { //对外公开
	Admin,
	Article,
	User,
	Limits,
	Upload, //删除图片用的
	Category, //获取分类用的
}
