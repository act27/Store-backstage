import { createStore } from 'vuex'
import number from './state/num.state.js'
import uInfo from './state/userinfo.state.js'
export default createStore({
  // 数据比较多,分模块
  modules: {
    number,
    uInfo,
  }
})
