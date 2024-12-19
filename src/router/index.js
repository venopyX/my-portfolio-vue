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

const fetchBlogById = async (slug) => {
  try {
    const querySnapshot = await getDocs(collection(db, "blogPost"));
    let blog = null;
    querySnapshot.forEach((doc) => {
      if (doc.data().slug === slug) {
        blog = { id: doc.id, ...doc.data() };
      }
    });
    return blog;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
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
  {
    path: "/blog/:slug",
    name: "BlogDetail",
    component: () => import("@/components/BlogDetailPage.vue"),
    props: true,
    beforeEnter: async (to, from, next) => {
      const blog = await fetchBlogById(to.params.slug);
      if (blog) {
        next();
      } else {
        next("/404");
      }
    },
  },
  {
    path: "/add-blog",
    name: "AddBlog",
    component: () => import("@/components/AddBlogForm.vue"),
  },
  {
    path: "/404",
    name: "NotFound",
    component: () => import("@/components/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;