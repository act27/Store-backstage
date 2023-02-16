<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/hello' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">账号列表</el-breadcrumb-item>
            <el-breadcrumb-item>promotion list</el-breadcrumb-item>
            <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 白色内容区域 -->
        <div class="page_content">
            <div class="content_top">
                <div class="input_box">
                    <el-input v-model="searchParams.query" placeholder="请输入关键字" class="input-with-select">
                        <template #append>
                            <el-button @click="searchList" icon="Search"></el-button>
                        </template>
                    </el-input>
                </div>
                <el-button @click="addUser" type="primary">新建用户</el-button>
            </div>
            <!-- 表格 -->
            <div>
                <!-- 
                    el-table 的 data: 要展示的数据
                    el-table-cloumn: 每一列,
                    prop: 每条数据的列名, lable: 列标题
                 -->
                <el-table :data="userList" stripe style="width: 100%">
                    <el-table-column prop="username" label="用户名" width="160" />
                    <el-table-column prop="email" label="邮箱" width="180" />
                    <el-table-column prop="mobile" label="电话" />
                    <el-table-column prop="role_name" label="角色" />
                    <el-table-column prop="mg_state" label="状态">
                        <template #default="scope">
                            <el-switch @change="switchChange(scope.row)" v-model="scope.row.mg_state" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="role_name" label="操作" width="160">
                        <template #default="scope">
                            <el-button @click="editRow(scope.row)" type="primary">编辑</el-button>
                            <el-button @click="deleteRow(scope.row)" type="danger">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页 -->
            <div class="content_footer">
                <el-pagination :page-sizes="[2, 3, 5]" v-model:page-size="searchParams.pagesize"
                    v-model:current-page="searchParams.pagenum" background layout="prev, pager,sizes, next"
                    :total="total" @size-change="searchList" @current-change="searchList" />
            </div>
        </div>
        <!-- 弹窗 -->
        <el-dialog v-model="dialogFormVisible" title="新建用户">
            <!-- 新增弹窗
                表单
                | 参数名   | 参数说明 | 备注     |
                | -------- | ------- | -------- |
                | username | 用户名称 | 不能为空 |
                | password | 用户密码 | 不能为空 |
                | email    | 邮箱     | 可以为空 |
                | mobile   | 手机号   | 可以为空 |
             -->
            <el-form ref="userForm" :model="formData" :rules="rules">
                <el-form-item label="用户名称" prop="username">
                    <el-input v-model="formData.username" type="username" placeholder="请输入用户名称" />
                </el-form-item>
                <el-form-item label="用户密码" prop="password">
                    <el-input v-model="formData.password" type="password" placeholder="请输入用户密码" />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="formData.email" type="email" placeholder="请输入邮箱" />
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="formData.mobile" type="mobile" placeholder="请输入手机号" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="flex">
                    <el-button type="primary" @click="submitForm(userForm)">确定</el-button>
                    <el-button @click="closeFlex">取消</el-button>
                </div>
            </template>
        </el-dialog>
        <el-dialog v-model="dialogFormVisible2" title="修改用户">
            <!-- 编辑弹窗
                表单
                | 参数名   | 参数说明 | 备注     |
                | -------- | ------- | -------- |
                | email    | 邮箱     | 可以为空 |
                | mobile   | 手机号   | 可以为空 |
             -->
            <el-form ref="userForm2" :model="formData2" :rules="rules2">
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="formData2.email" type="email" placeholder="请输入邮箱" />
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="formData2.mobile" type="mobile" placeholder="请输入手机号" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="flex">
                    <el-button type="primary" @click="submitEditForm(userForm2)">确定</el-button>
                    <el-button @click="closeFlex">取消</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script >
import { reactive, toRefs, ref } from 'vue';
import { userListApi, userAddApi, userEditApi, userChangeStateApi, userDeleteApi } from '@/util/request'
export default {
    name: 'users',
    setup() {
        const data = reactive({
            keyWord: "",
            searchParams: {
                query: "",
                pagenum: 1,
                pagesize: 5
            },
            total: 1,
            userList: [],
            dialogFormVisible: false,
            dialogFormVisible2: false,
            formData: {
                username: "",
                password: "",
                email: "",
                mobile: ""
            },
            formData2: {
                id: -1,
                email: "",
                mobile: ""
            },
            rules: {
                username: [
                    { required: true, message: "此项为必填项", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "此项为必填项", trigger: "blur" }
                ],
                email: [
                    {
                        required: false,
                        pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                        message: "邮箱格式不正确"
                    }
                ],
                mobile: [
                    {
                        required: false,
                        pattern: /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/,
                        message: "手机号格式不正确"
                    }
                ]
            },
            rules2: {
                email: [
                    {
                        required: false,
                        pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                        message: "邮箱格式不正确"
                    }
                ],
                mobile: [
                    {
                        required: false,
                        pattern: /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/,
                        message: "手机号格式不正确"
                    }
                ]
            }
        })

        const searchList = () => {
            userListApi(data.searchParams).then(res => {
                if (res.data) {
                    data.userList = res.data.users
                    data.total = res.data.total
                }
            })
        }

        // 新建用户
        const addUser = () => {
            data.dialogFormVisible = true;
        }
        // 提交新建用户表单
        const submitForm = (formEl) => {
            formEl.validate(res => {
                if (!res) { return }
                console.log(res);

                // 表单通过接口请求
                userAddApi(data.formData).then(res => {
                    console.log(res);
                    if (res.data) {
                        closeFlex()
                        searchList()
                    }
                })
            })
        }

        // 编辑用户
        const editRow = (row) => {
            const { id, email, mobile } = row
            // 展示编辑表单
            data.dialogFormVisible2 = true;
            data.formData2.id = id
            data.formData2.email = email
            data.formData2.mobile = mobile
        }
        // 提交编辑用户表单
        const submitEditForm = (formEl) => {
            formEl.validate(res => {
                if (!res) { return }
                // 表单通过接口请求,提交修改
                userEditApi(data.formData2).then(res => {
                    if (res.data) {
                        closeFlex()
                        searchList()
                    }
                })
            })
        }

        // 删除用户
        const deleteRow = (row) => {
            console.log("删除用户", row);
            userDeleteApi(row).then(res => {
                if (res.meta.status === 200) {
                    searchList()
                    console.log("删除用户成功");
                }
            })
        }

        // 状态更改
        const switchChange = (row) => {
            console.log("状态改变", row);
            userChangeStateApi(row).then(res => {
                if (res.data) {
                    searchList()
                }
            })
        }
        // 清空表单 隐藏表单 (取消 or 结束新建用户时调用)
        const closeFlex = () => {
            // 隐藏弹窗
            data.dialogFormVisible = false;
            data.dialogFormVisible2 = false;
            // 清空form表单内容
            data.formData = {}
        }


        // 方法初始化
        searchList()
        const userForm = ref()
        const userForm2 = ref()
        return {
            ...toRefs(data),
            searchList,
            addUser,
            submitForm,
            submitEditForm,
            closeFlex,
            switchChange,
            editRow,
            deleteRow,
            userForm,
            userForm2
        }
    }
}
</script>
<style>
.input_box {
    width: 200px;
    margin-right: 20px;
}

.content_top {
    display: flex;
}

.flex {
    display: flex;
}

.content_footer {
    margin-top: 20px;
}
</style>


<!-- ref是什么 -->