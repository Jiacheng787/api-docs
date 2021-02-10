import axios from 'axios'
import getCookie from '@/utils/cookies'
import router from '@/router';

const service = axios.create({
    baseURL: '/',
    timeout: 1000000, // 请求超时时间
})

// 请求拦截
service.interceptors.request.use(
    (config) => {
        // 请求拦截
        // 例如判断用户是否登录，向请求头中加token
        // 后台cookie设置了httpOnly，前端不能获取登陆凭证，无法判断是否登录
        // 现在的方案，httpOnly: false，maxAge: 1000*60*60，token过期时间需要与cookie同步
        const token = getCookie('token');
        if (token && token !== 'undefined') {
          // 让每个请求携带token
          config.headers['Authorization'] = token;
        }
        return config
    },
    (error) => {
        // 发送失败
        return Promise.reject(error);
    }
)

// 响应拦截
service.interceptors.response.use(
    (response) => {
        const { headers, data, status } = response;
        if(status == '200' || data.success || data.result == 'success') {
            return data
        } else {
            return Promise.reject();
        }
    },
    (error) => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                  error.message = '请求错误';
                  break;
                case 401:
                  error.message = '未授权，请登录';
                  if (!window.location.href.includes('login')) {
                    router.push('/login');
                  }
                  break;
                case 403:
                  error.message = '拒绝访问';
                  break;
                case 404:
                  error.message = `请求地址出错: ${error.response.config.url}`;
                  break;
                case 500:
                  error.message = '服务器内部错误';
                  break;
                case 503:
                  error.message = '网络异常，请检查后端服务状态';
                  break;
                default:
                  break;
            }
        }
        return Promise.reject(error);
    }
)

export default service