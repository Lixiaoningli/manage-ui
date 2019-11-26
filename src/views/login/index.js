import { login } from '@/api/login/index.js'
var md5 = require('md5');
export default {
    computed: {
    },
    mounted() {

    },
    data() {
        return {
            formLogin: {
                username: '',
                password: ''
            },
            formInline: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
                ]
            },
            page: {
                current: 1,
                size: 10,
                total: 0
            }
        }
    },
    methods: {
        // 用户登录
        loginSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // var md5Password = md5(this.formLogin.password)
                    // md5Password = md5(md5Password + 'booksmanage')
                    this.$Spin.show()
                    login({
                        password: this.formLogin.password,
                        username: this.formLogin.username
                    }).then(res => {
                        this.$Spin.hide()
                        if (res.data.data === null) {
                            this.$Message.error('用户名或密码错误！');
                        } else {
                            sessionStorage.setItem("user", res.data.data)
                            this.$router.push("/")
                        }
                    })
                } else {
                    this.$Message.error('请填写必填字段');
                }
            })
        }
    }
}