<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/hello' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">角色列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 内容区域 -->
        <div class="page_content">
            <el-button @click="dialogFormVisible=true" type="primary">新建角色</el-button>
            <el-table :data="rolesList" stripe>
                <el-table-column prop="roleName" label="角色名" />
                <el-table-column prop="roleDesc" label="角色描述" />
                <el-table-column>
                    <template #default="scope">
                        <el-button @click="editRow(scope.row)" type="primary">编辑</el-button>
                        <el-button @click="deleteRow(scope.row)" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 弹窗 -->
        <div>
            <!-- 新建角色弹窗 
                | 参数名   | 参数说明 | 备注 |
                | -------- | ------- | ---- |
                | roleId   | 角色 ID  |      |
                | roleName | 角色名称 |      |
                | roleDesc | 角色描述 |      |
            -->
            <el-dialog v-model="dialogFormVisible" title="新建角色">
                <el-form ref="userForm" :model="formData" :rules="rules">
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="formData.roleName" type="roleName" placeholder="请输入角色名称" />
                    </el-form-item>
                    <el-form-item label="角色描述" prop="roleDesc">
                        <el-input v-model="formData.roleDesc" type="roleDesc" placeholder="请输入角色描述" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <div class="flex">
                        <el-button type="primary" @click="submitForm(userForm)">确定</el-button>
                        <el-button @click="closeFlex">取消</el-button>
                    </div>
                </template>
            </el-dialog>
            <!-- 编辑角色弹窗
                | 参数名   | 参数说明 | 备注                  |
                | -------- | ------- | --------------------- |
                | :id      | 角色 ID  | 不能为空`携带在url中` |
                | roleName | 角色名称 | 不能为空              |
                | roleDesc | 角色描述 | 可以为空              |
             -->
            <el-dialog v-model="dialogFormVisible2" title="编辑角色">
                <el-form ref="userForm" :model="formData2" :rules="rules">
                    <el-form-item label="角色 ID" prop="id">
                        <el-input v-model="formData2.id" type="id" placeholder="请输入角色 ID" />
                    </el-form-item>
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="formData2.roleName" type="roleName" placeholder="请输入角色名称" />
                    </el-form-item>
                    <el-form-item label="角色描述" prop="roleDesc">
                        <el-input v-model="formData2.roleDesc" type="roleDesc" placeholder="请输入角色描述" />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <div class="flex">
                        <el-button type="primary" @click="submitEditForm(userForm)">确定</el-button>
                        <el-button @click="closeFlex">取消</el-button>
                    </div>
                </template>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { getRolesApi, addRoleApi, roleDeleteApi, roleEditApi } from "@/util/request"
import { reactive, toRefs, ref } from "vue";

export default {
    name: 'roles',
    setup() {
        const data = reactive({
            dialogFormVisible: false,
            dialogFormVisible2:false,
            rolesList: [],
            formData: {
                roleName: "",
                roleDesc: ""
            },
            formData2:{
                id:-1,
                roleName: "",
                roleDesc: ""
            },
            rules: {
                id: { required: true, message: "此项为必填项", trigger: "blur" },
                roleName: { required: true, message: "此项为必填项", trigger: "blur" }
            }
        })
        // 新建角色,提交表单
        const submitForm = (formEl) =>{
            formEl.validate(res=>{
                if (!res) { return }
                addRoleApi(data.formData).then(res=>{
                    if(res.data){
                        closeFlex()
                        getList()
                    }
                })
                
            })
        }
        // 获取角色列表
        const getList = () => {
            getRolesApi().then(res => {
                data.rolesList = res.data
                console.log(res);
            })
        }
        // 编辑角色
        const editRow = row => {
            const {id,roleDesc,roleName} = row
            data.dialogFormVisible2=true
            data.formData2.id = id
            data.formData2.roleName = roleName
            data.formData2.roleDesc = roleDesc
        }
        // 提交编辑表单
        const submitEditForm = (formEl)=>{
            formEl.validate(res => {
                if (!res) { return }
                // 表单通过接口请求,提交修改
                roleEditApi(data.formData2).then(res => {
                    if (res.data) {
                        closeFlex()
                        getList()
                    }
                })
            })
        }
        // 删除角色
        const deleteRow = row => {
            roleDeleteApi(row).then(res=>{
                if(res.meta.status === 200){
                    getList()
                    console.log("删除成功");
                }
            })
        }
        const closeFlex = () => {
            // 隐藏弹窗
            data.dialogFormVisible = false;
            data.dialogFormVisible2=false
            // 清空form表单内容
            data.formData = {}
        }
        const userForm = ref()
        getList()
        return {
            ...toRefs(data),
            getList,
            submitForm,
            editRow,
            submitEditForm,
            deleteRow,
            closeFlex,
            userForm
        }
    }
}
</script>