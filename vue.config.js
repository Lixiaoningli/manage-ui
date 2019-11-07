const url = 'http://127.0.0.1:8088'
module.exports = {
    // 关闭eslint-loader校验
    lintOnSave: false,
    // 配置转发代理
    devServer: {
        proxy: {
            '/oauth': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/oauth': '/oauth'
                }
            }
        }
    }
}
