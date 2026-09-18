<template>
  <section class="blog-section">
    <meta name="description" content="Dive into the latest trends, tutorials, and insights on technology, lifestyle, and business. Gemechis Chala shares his knowledge and experiences through engaging blog posts.">
    <div class="container">
      <h2 class="section-title scroll-animate" style="animation-delay: 0s">
        Latest Blog Posts
      </h2>
      
      <div class="blog-grid">
        <div 
          v-for="(post, index) in latestBlogs" 
          :key="index" 
          class="blog-card scroll-animate"
          :style="{ 'animation-delay': `${index * 0.1}s` }"
        >
          <div class="blog-image-wrapper">
            <img v-lazy="post.image" :alt="'Blog Image ' + (index + 1)" class="blog-image" loading="lazy" />
          </div>
          
          <div class="blog-content">
            <h5 class="blog-title">{{ post.title }}</h5>
            <p class="blog-excerpt">{{ post.excerpt }}</p>
            <a :href="`/blog/${post.slug}`" class="read-more">
              Read More <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
      
      <div class="view-more-wrapper">
        <router-link to="/blogs" class="btn btn-more">
          View More Blogs
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { useDataStore } from '@/stores';
import { onMounted, ref, computed } from 'vue';

export default {
  name: "BlogSection",
  setup() {
    const dataStore = useDataStore();
    const blogPosts = ref([]);

    onMounted(async () => {
      try {
        blogPosts.value = await dataStore.fetchCollection('blogPosts', {
          orderBy: { field: 'createdAt', direction: 'desc' }
        });
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      }
    });

    const latestBlogs = computed(() => {
      return blogPosts.value.slice(0, 3);
    });

    return {
      latestBlogs,
    };
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/colors.scss";

.blog-section {
  min-height: 100vh;
  padding: 100px 20px;
  background: var(--bg-section-gradient);
  color: var(--text-light);
  overflow: hidden;
  
  @media (max-width: 991px) {
    padding: 80px 20px;
  }
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 3rem;
  position: relative;
  text-align: center;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: var(--primary-color);
    box-shadow: 0 0 15px var(--primary-color);
    border-radius: 2px;
  }
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.blog-card {
  background: var(--card-bg-gradient);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    padding: 2px;
    background: linear-gradient(145deg, 
      rgba(255, 123, 137, 0.2), 
      rgba(74, 144, 226, 0.1));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.3),
      0 0 30px rgba(255, 123, 137, 0.2);
    
    &::before {
      opacity: 1;
    }
    
    .blog-image {
      transform: scale(1.1);
    }
  }
}

.blog-image-wrapper {
  overflow: hidden;
  position: relative;
  margin-top: 20px;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(15, 15, 26, 0.8), transparent);
    opacity: 0.6;
    transition: opacity 0.3s ease;
  }
}

.blog-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.5s ease, filter 0.5s ease;
  border-radius: 0 0 0 24px;
}

.blog-card:hover .blog-image {
  filter: brightness(1.1);
}

.blog-content {
  padding: 25px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 1;
}

.blog-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 12px;
  text-transform: capitalize;
  letter-spacing: 0.5px;
  
  &::before {
    content: attr(data-content);
    position: absolute;
    color: transparent;
    -webkit-text-stroke: 1px var(--primary-color);
    opacity: 0;
    transition: all 0.4s ease;
  }
}

.blog-card:hover .blog-title::before {
  opacity: 0.2;
}

.blog-excerpt {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 20px;
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.read-more {
  display: inline-block;
  padding: 12px 28px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--primary-color);
  text-decoration: none;
  border: 2px solid var(--primary-color);
  border-radius: 50px;
  align-self: center;
  margin-top: auto;
  transition: all 0.3s ease;
}

.read-more:hover {
  background: var(--primary-color);
  color: var(--dark-overlay);
  box-shadow: 0 8px 20px rgba(255, 123, 137, 0.4);
  transform: translateY(-3px);
  gap: 8px;
  
  i {
    transform: translateX(5px);
  }
}

.view-more-wrapper {
  text-align: center;
  margin-top: 50px;
}

.btn {
  padding: 14px 40px;
  font-size: 1rem;
  font-weight: 700;
  color: var(--dark-overlay);
  background: var(--primary-color);
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  
  &:hover {
    background: var(--button-hover-bg);
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(255, 123, 137, 0.4);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .blog-grid {
    grid-template-columns: 1fr;
  }
  
  .blog-image {
    height: 200px;
  }
  
  .blog-card {
    border-radius: 20px;
    
    .blog-image {
      border-radius: 20px 20px 0 0;
    }
  }
}

@media (max-width: 576px) {
  .section-title {
    font-size: 1.75rem;
  }
  
  .blog-content {
    padding: 20px;
  }
  
  .blog-title {
    font-size: 1.2rem;
  }
  
  .read-more {
    padding: 10px 24px;
    font-size: 0.9rem;
  }
  
  .btn {
    padding: 12px 32px;
    font-size: 0.9rem;
  }
}
</style>
