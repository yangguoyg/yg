import axios from './config'

//用户登录

// 第一种写法
// export function login(data) {
//     return axios({
//         url: '/login',
//         methods: "post",
//         data
//     })
// }

// 第二种写法
export const login = data => axios.post("/login", data)


/**
 * 学生管理
 */


// 添加班级
export const addClass = data => axios.post("/class", data)

// 查询班级
export const selectClass = params => axios.get("/class", { params })

// 删除班级
export const delClass = params => axios.delete("/class", { params })

// 编辑班级
export const editClass = data => axios.put("/class", data)

// 查询未开班的班级信息
export const selectClassByStatus = status => axios.get(`/class/${status}`)

// 添加新生
export const addNewStudent = data => axios.post("/student", data)

// 查询学生信息
export const selectStudent = params => axios.get("/student", { params })

// 删除学生
export const delStudent = params => axios.delete("/student", { params })

// 修改学生
export const editStudent = data => axios.put("/student", data)

//符合条件的学生信息 
export const searchStudent = params => axios.get("/searchStudent", { params })

/**
 *  文章管理
 */

//添加文章
export const addArticle = data => axios.post("/article", data)

//查询文章
export const selectArticle = params => axios.get("/article", { params })

//查询一篇文章
export const selectOneArticle = articleId => axios.get(`/article/${articleId}`)

// 修改文章
export const editArticle = data => axios.put("/article", data)

// 删除学生
export const delArticle = params => axios.delete("/article", { params })