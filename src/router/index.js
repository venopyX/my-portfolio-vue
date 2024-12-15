import { createRouter, createWebHistory } from "vue-router";

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return [];
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "@/components/HomePage.vue"),
    beforeEnter: async (to, from, next) => {
      const projects = await fetchData('https://raw.githubusercontent.com/venopyX/my-portfolio-raw-datas/refs/heads/main/projects.json');
      const services = await fetchData('https://raw.githubusercontent.com/venopyX/my-portfolio-raw-datas/refs/heads/main/services.json');
      const testimonials = await fetchData('https://raw.githubusercontent.com/venopyX/my-portfolio-raw-datas/refs/heads/main/testimonials.json');
      const blogPosts = await fetchData('https://raw.githubusercontent.com/venopyX/my-portfolio-raw-datas/refs/heads/main/blogPosts.json');
      const socialMedia = await fetchData('https://raw.githubusercontent.com/venopyX/my-portfolio-raw-datas/refs/heads/main/socialMedia.json');
      const highlights = await fetchData('https://raw.githubusercontent.com/venopyX/my-portfolio-raw-datas/refs/heads/main/highlights.json');
      to.meta.data = { projects, services, testimonials, blogPosts, socialMedia, highlights };
      next();
    },
  },
  {
    path: "/blog",
    name: "Blog",
    component: () => import(/* webpackChunkName: "blog" */ "@/components/BlogsPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
