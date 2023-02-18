# shop
##node 服务在serve文件夹内
###node 服务完整启动命令：
```
npm i       （安装项目依赖包）
npm i -g n  （安装node包版本管理工具）
n v16.17.0  （安装v16.17.0版本的node）
node app    （启动node服务）
```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 笔记

### Vue3 生命周期
Vue2        >        Vue3
beforeCreate    ->  setup()
created         ->  setup()
beforeMount     ->  onBeforeMount
mounted         ->  onMounted
beforeUpdate    ->  onBeforeUpdate
updated         ->  onUpdated       数据更改会死循环-区分updated 和 beforeUpdate
beforeDestroy   ->  onBeforeUnmount
destroyed       ->  onUnmounted
