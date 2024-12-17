// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const fetchData = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return [];
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "@/components/HomePage.vue"),
    beforeEnter: async (to, from, next) => {
      const projects = await fetchData("projects");
      const services = await fetchData("services");
      const testimonials = await fetchData("testimonials");
      const blogPosts = await fetchData("blogPost");
      const socialMedia = await fetchData("socialMedia");
      const highlights = await fetchData("highlights");
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
