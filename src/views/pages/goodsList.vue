<template>
    <div>
        <!-- 面包屑 -->
        <el-breadcrumb separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/hello' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">商品列表</el-breadcrumb-item>
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
            </div>
            <!-- 表格 -->
            <div>
                <!-- 
                    el-table 的 data: 要展示的数据
                    el-table-cloumn: 每一列,
                    prop: 每条数据的列名, lable: 列标题
                 -->
                <el-table :data="goodsList" stripe style="width: 100%">
                    <el-table-column prop="goods_name" label="商品名" width="320" />
                    <el-table-column prop="goods_number" label="商品数量" />
                    <el-table-column prop="goods_price" label="价格" />
                    <el-table-column prop="goods_weight" label="商品重量" />
                    <el-table-column prop="goods_state" label="商品状态" >
                        <template #default="scope">
                            <p>{{ switchState(scope.row.goods_state) }}</p>
                        </template>
                    </el-table-column>
                    
                </el-table>
            </div>
            <!-- 分页 -->
            <div class="content_footer">
                <el-pagination :page-sizes="[3, 5, 10]" v-model:page-size="searchParams.pagesize"
                    v-model:current-page="searchParams.pagenum" background layout="prev, pager,sizes, next"
                    :total="total" @size-change="searchList" @current-change="searchList" />
            </div>
        </div>
    </div>
</template>
<script >
import { reactive, toRefs } from 'vue';
import { goodsListApi } from '@/util/request'
export default {
    name: 'goods',
    setup() {
        const data = reactive({
            keyWord: "",
            searchParams: {
                query: "",
                pagenum: 1,
                pagesize: 5
            },
            total: 1,
            goodsList: [],
        })
        const searchList = () => {
            goodsListApi(data.searchParams).then(res => {
                console.log(res.meta);
                if (res.data) {
                    data.goodsList = res.data.goods
                    data.total = res.data.total
                }
            })
        }

        const switchState = state =>{
            switch(state){
                case 0:
                    return "未通过"
                    break;
                case 1:
                    return "审核中"
                    break;
                case 2:
                    return "已审核"
                    break;
            }
        }

        // 方法初始化
        searchList()
        return {
            ...toRefs(data),
            searchList,
            switchState
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