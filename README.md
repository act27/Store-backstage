# shop

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