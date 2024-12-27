import { createRouter, createWebHistory } from "vue-router";
import { useDataStore } from '@/stores';

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/components/HomePage.vue"),
    meta: {
      title: 'Home',
      requiresData: ['projects', 'services', 'testimonials', 'blogPosts', 'socialMedia', 'highlights']
    }
  },
  {
    path: "/projects",
    name: "Projects",
    component: () => import("@/components/ProjectsPage.vue"),
    meta: {
      title: 'Projects',
      requiresData: ['projects']
    }
  },
  {
    path: "/blog",
    name: "Blog",
    component: () => import("@/components/BlogsPage.vue"),
    meta: {
      title: 'Blog'
    }
  },
  {
    path: "/blogs",
    redirect: "/blog"
  },
  {
    path: "/blog/:slug",
    name: "BlogDetail",
    component: () => import("@/components/BlogDetailPage.vue"),
    props: true,
    meta: {
      title: 'Blog Post'
    },
    beforeEnter: async (to) => {
      const store = useDataStore();
      try {
        const posts = await store.fetchCollection('blogPosts', {
          filters: [{ field: 'slug', operator: '==', value: to.params.slug }],
          limit: 1
        });

        if (!posts.length) {
          return { name: 'NotFound' };
        }

        to.meta.title = posts[0].title;
        return true;
      } catch (error) {
        console.error('Error fetching blog post:', error);
        return { name: 'NotFound' };
      }
    }
  },
  {
    path: "/404",
    name: "NotFound",
    component: () => import("@/components/NotFound.vue"),
    meta: {
      title: '404 - Page Not Found'
    }
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404"
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      };
    }
    return { top: 0 };
  }
});

// Navigation guards
router.beforeEach(async (to) => {
  // Set page title
  document.title = `${to.meta.title || 'Portfolio'} | Gemechis Chala`;

  // Handle required data loading
  if (to.meta.requiresData) {
    const store = useDataStore();
    try {
      const promises = to.meta.requiresData.map(collection =>
        store.fetchCollection(collection)
      );
      const results = await Promise.all(promises);

      to.meta.data = to.meta.requiresData.reduce((acc, key, index) => {
        acc[key] = results[index];
        return acc;
      }, {});
    } catch (error) {
      console.error('Error loading required data:', error);
      return { name: 'NotFound' };
    }
  }
});

export default router;
