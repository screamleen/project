import Vue from 'vue';
import Router from 'vue-router';
import Exhibitors from '@/components/exhibitors/Exhibitors';
import ExhibitorDetail from '@/components/exhibitors/ExhibitorDetail';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'exhibitors'
    },
    {
      path: '/exhibitors',
      name: '参展人员库',
      component: Exhibitors
    },
    {
      path: '/exhibitors/:id',
      name: '参展人员详情',
      component: ExhibitorDetail
    }
  ]
});
