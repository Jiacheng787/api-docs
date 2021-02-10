import Vue from 'vue'
import Router from 'vue-router'
import getCookie from '@/utils/cookies'

Vue.use(Router);

// const meta = {
//     requiresAuth: true, // 需要鉴权
// };
const router = new Router({
    routes: [
        // {
        //     path: '/',
        //     redirect: '/login'
        // },
        // {
        //     path: '/login',
        //     component: () => import('@/views/Login.vue')
        // },
        {
            path: '/',
            redirect: '/docs'
        },
        {
            path: '/docs',
            component: () => import('@/views/Main.vue'),
            meta: {
                
            },
            children: [
                {
                    path: '',
                    component: () => import('@/views/pages/Index.vue'),
                },
                {
                    path: ':id',
                    component: () => import('@/views/pages/Docs.vue'),
                }
            ]
        }
    ]
})

// router.beforeEach((to, from, next) => {
//     if (to.meta.requiresAuth) {
//         // 需要鉴权
//         const token = getCookie("token");
//         if (token && token !== 'undefined') {
//             next();
//         } else {
//             next("/login");
//         }
//     } else {
//         // 不需要身份校验 直接通过
//         next();
//     }
// })

export default router;