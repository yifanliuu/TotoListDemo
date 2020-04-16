import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import TodoList from '../views/todolist.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'TodoList',
    component: TodoList,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
