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

// 
export const userAddApi = data => {
    return post({
        url: "/users",
        data
    })
}

// 
export const userEditApi = data => {
    return put({
        url: `users/${data.id}`,
        data
    })
}

// 
export const userChangeStateApi = data => {
    return put({
        url: `users/${data.id}/state/${data.mg_state}`,
        data 
    })
}

// 
export const userDeleteApi = data => {
    return del({
        url: `users/${data.id}`,
    })
}

// 
export const getRolesApi = data => {
    return get({
        url: `roles`,
    })
}

// 
export const addRoleApi = data => {
    return post({
        url: `roles`,
        data
    })
}

// 
export const roleDeleteApi = data => {
    return del({
        url: `roles/${data.id}`,
    })
}

// 
export const roleEditApi = data=>{
    return put({
        url:`roles/${data.id}`,
        data
    })
}