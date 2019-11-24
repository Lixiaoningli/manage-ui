const url = 'http://127.0.0.1:8088'
const fileUrl = 'http://127.0.0.1:8088'
module.exports = {
    // 关闭eslint-loader校验
    lintOnSave: false,
    // 配置转发代理
    devServer: {
        proxy: {
            '/fileUpload': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/fileUpload': '/fileUpload'
                }
            },
            '/filelook': {
                target: fileUrl,
                ws: true,
                pathRewrite: {
                    '^/filelook': '/filelook'
                }
            },
            '/user': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/user': '/user'
                }
            },
            '/role': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/role': '/role'
                }
            }
        }
    }
}
