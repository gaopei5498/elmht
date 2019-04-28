import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import A from '@/components/home/a'
import Explain from '@/components/home/explain/explain'
import AdminSet from '@/components/home/adminSet/adminSet'
import Userlist from '@/components/home/userlist/userlist'
import Merchant from '@/components/home/merchant/merchant'
import Admin from '@/components/home/admin/admin'
import Order from '@/components/home/order/order'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/a',
      name: '/a',
      component: A,
      children: [  //这里就是二级路由的配置
        {
          path: '/explain',
          name: 'Explain',
          component: Explain
        },
        {
          path: '/adminSet',
          name: 'AdminSet',
          component: AdminSet
        },
        {
          path: '/userlist',
          name: 'Userlist',
          component: Userlist
        },
        {
          path: '/merchant',
          name: 'Merchant',
          component: Merchant
        },
        {
          path: '/admin',
          name: 'Admin',
          component: Admin
        },
        {
          path: '/order',
          name: 'Order',
          component: Order
        },
      ]
    }
  ]
})
