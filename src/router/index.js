import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Home'
import NavItem from '@/components/Navitems';
import Login from '@/components/Login';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/navitem/:name',
      name: 'NavItem',
      component: NavItem,
    }
  ]
})
