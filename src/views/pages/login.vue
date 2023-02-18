<template>
    <div class="login_warp">
        <div class="form_warp">

            <el-form ref="ruleFormRef" :model="loginData" label-width="120px" class="demo-ruleForm">
                <el-form-item>
                    <h2>用户登录</h2>
                </el-form-item>
                <el-form-item label="用户名:" prop="username" :rules="{
                    required: true,
                    message: '此为必填项',
                    trigger: 'blur',
                }">
                    <el-input v-model="loginData.username" type="username" autocomplete="off" />
                </el-form-item>

                <el-form-item label="密码:" prop="password" :rules="{
                    required: true,
                    message: '此为必填项',
                    trigger: 'blur',
                }">
                    <el-input v-model="loginData.password" type="password" autocomplete="off" />
                </el-form-item>

                <el-form-item class="logbtn">
                    <el-button type="primary" @click="handleLogin">登录</el-button>
                    <!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script lang="js">
import { reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { loginApi } from '../../util/request'   // '@/xxx'是什么东西

export default {
    name: 'login',
    setup() {
        const store = useStore()
        const router = useRouter()
        const count = store.state.number.count
        const data = reactive({
            loginData: {
                username: "",
                password: ""
            },
            num: count,

        })

        const handleLogin = () => {
            // 请求后台接口
            // 默认用户admin,123456
            loginApi(data.loginData).then(res => {
                if (res.data) {
                    store.commit('setUserInfo', res.data);
                    // 本地存储用户账号密码，避免刷新后退回到登录页面
                    localStorage.setItem("loginData", JSON.stringify(res.data))
                    // 跳转到/users
                    router.push({
                        path: '/hello'
                    })
                }
            })

        }
        // vuex 语法学习
        // console.log("修改前",store.getters["number/countStatus"]);
        // const handleLogin=()=>{
        //     store.dispatch('number/setCountPromise',100).then(res=>{
        //         alert("修改成功")
        //     }).catch(err=>{
        //         alert(err)
        //     })
        //     console.log(store.state.number.count);
        //     console.log("修改后",store.getters["number/countStatus"]);
        // }

        return {
            ...toRefs(data),
            handleLogin
        }
    }
}
</script>  

<style>
.login_warp {
    width: 100%;
    height: 100vh;
    background-color: #124ad7;
    position: relative;
}

.form_warp {
    width: 350px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #eee;
    padding: 40px 40px 0 0;
    border-radius: 8px;
}

.demo-ruleForm h2 {
    margin: -5% 12% 5%;
}

.logbtn {
    margin-left: 12%;
}
</style>