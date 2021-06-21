// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import '@/icons'
// 模块仅为副作用（中性词、无贬义含义）而导入，而不是导入模块中的任何内容，
// 这将运行模块中的全局代码，但实际上不导入任何值
import './assets/icons/index'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
