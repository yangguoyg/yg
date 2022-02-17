const path = require('path')

// 工具函数，添加绝对路径
// dir: "./src/components"   ---- "E:/share/myapp/src/components"
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    lintOnSave: false,// 禁用eslint检查
    
    //设置路径别名
    chainWebpack(config) {
        config.resolve.alias
            //用com这个别名代表./src/components的完整路径
            .set('com', resolve('./src/components'))
    },
    //配置开发服务器
    devServer: {
    	open: true, //设置自动打开浏览器
        port: 3001, //设置端口
    }
}