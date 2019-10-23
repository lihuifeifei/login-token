import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//引入promise的HTTP客户端axios
import axios from 'axios';
//将axios改写为Vue的原型属性
Vue.prototype.$axios = axios;


axios.defaults.baseURL = 'http://10.7.192.215:8090';


// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
    config => {
      if (localStorage.getItem('access-token')) {
        // console.log(localStorage.getItem('access-token'));
        config.headers['access-token']= localStorage.getItem('access-token');
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    });

//http reponse响应拦截器
axios.interceptors.response.use(
    response =>{
        return response;
    },
    error=>{
        if(error.response){
            switch(error.response.status){
                //遇到401错误时，说明没有权限，重新登录
                case 401:
                    localStorage.removeItem('access-token');
                    alert('请先登录');
                    router.replace({
                        path: '/login',
                        query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                    });
                    break;
                 //其他错误说明登录过期了，需要重新登录
                default:
                    alert('登录已过期，请重新登录');
                    router.replace({
                        path: '/login',
                        query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                    });
            }
        }
    });



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
