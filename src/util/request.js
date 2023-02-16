import { post, get, put, del } from "./service"

export const loginApi = data => {
    return post({
        url: "/login",
        data
    })
}

// 获取用户列表
export const userListApi = data => {
    return get({
        url: "/users",
        data
    })
}

// 添加用户
export const userAddApi = data => {
    return post({
        url: "/users",
        data
    })
}

// 编辑用户
export const userEditApi = data => {
    return put({
        url: `users/${data.id}`,
        data
    })
}

// 状态改变
export const userChangeStateApi = data => {
    return put({
        url: `users/${data.id}/state/${data.mg_state}`,
        data 
    })
}

// 删除用户
export const userDeleteApi = data => {
    return del({
        url: `users/${data.id}`,
    })
}

// 获取角色列表
export const getRolesApi = data => {
    return get({
        url: `roles`,
    })
}

// 添加角色
export const addRoleApi = data => {
    return post({
        url: `roles`,
        data
    })
}

// 编辑角色
export const roleEditApi = data=>{
    return put({
        url:`roles/${data.id}`,
        data
    })
}

// 删除角色
export const roleDeleteApi = data => {
    return del({
        url: `roles/${data.id}`,
    })
}

// 
export const goodsListApi = data =>{
    return get({
        url:`goods`,
        data
    })
}