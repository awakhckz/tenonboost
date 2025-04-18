import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/Home.vue'),
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/components/Order.vue'),
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('@/components/Services.vue'),
    },
    {
      path: '/policy',
      name: 'privacy',
      component: () => import('@/components/PrivacyPolicy.vue'),
    },
    {
      path: '/terms',
      name: 'TOS',
      component: () => import('@/components/TermsOfService.vue'),
    },
    {
      path: '/order/failed',
      name: 'PaymentFailed',
      component: () => import('@/components/PaymentFailed.vue'),
    },
    {
      path: '/order/success',
      name: 'PaymentSuccess',
      component: () => import('@/components/PaymentSuccess.vue'),
    },
    {
      path: '/api',
      name: 'Api',
      component: () => import('@/components/Api.vue'),
    }, 
    {
      path: '/contact',
      name: 'contact us',
      component: () => import('../components/ContactUs.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../components/AboutView.vue'),
    },
  ],
})

export default router
