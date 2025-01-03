<template>
  <section class="blog-section">
    <meta name="description" content="Dive into the latest trends, tutorials, and insights on technology, lifestyle, and business. Gemechis Chala shares his knowledge and experiences through engaging blog posts.">
    <div class="container">
      <h2 class="section-title">Latest Blog Posts</h2>
      <div class="row">
        <div v-for="(post, index) in latestBlogs" :key="index" class="blog-card">
          <div class="blog-image-wrapper">
            <img v-lazy="post.image" :alt="'Blog Image ' + (index + 1)" class="blog-image" />
          </div>
          <div class="blog-content">
            <h5 class="blog-title">{{ post.title }}</h5>
            <p class="blog-excerpt">{{ post.excerpt }}</p>
            <a :href="`/blog/${post.slug}`" class="read-more">Read More</a>
          </div>
        </div>
      </div>
      <div class="view-more-wrapper">
        <router-link to="/blogs" class="btn btn-more" title="View more blog posts on various topics">View More Blogs</router-link>
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
        blogPosts.value = await dataStore.fetchCollection('blogPosts', { orderBy: { field: 'createdAt', direction: 'desc' } });
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
  },
};
</script>

<style scoped lang="scss">
.blog-section {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(50, 0, 0, 0.4));
  padding: 4rem 1rem;
  color: colors.$text-color-light;
  overflow: hidden;
}
/* Section Title */
.section-title {
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  color: colors.$primary-color;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 50px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: colors.$primary-color;
    box-shadow: 0 0 8px colors.$primary-color, 0 0 15px colors.$primary-color;
    border-radius: 2px;
  }
}
/* Blog Cards */
.row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
.blog-card {
  background: linear-gradient(135deg, colors.$blog-card-hover-gradient-start, colors.$blog-card-hover-gradient-end);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 20px colors.$box-shadow-color;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.blog-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 30px colors.$box-shadow-color;
}
/* Blog Image */
.blog-image-wrapper {
  overflow: hidden;
  position: relative;
  margin-top: 20px;
}
.blog-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.4s ease, filter 0.4s ease;
  border-radius: 15px;
}
.blog-card:hover .blog-image {
  transform: scale(1.1);
  border-radius: 15px;
}
/* Blog Content */
.blog-content {
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.blog-title {
  font-size: 20px;
  font-weight: bold;
  color: colors.$primary-color;
  margin-bottom: 10px;
  text-transform: capitalize;
  letter-spacing: 0.5px;
}
.blog-excerpt {
  font-size: 16px;
  color: colors.$blogs-page-text;
  margin-bottom: 20px;
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
/* Read More Button */
.read-more {
  font-size: 16px;
  color: colors.$primary-color;
  text-decoration: none;
  font-weight: bold;
  border: 2px solid colors.$primary-color;
  padding: 8px 20px;
  border-radius: 25px;
  transition: all 0.3s ease;
  align-self: center;
  margin-top: 20px;
}
.read-more:hover {
  background: colors.$primary-color;
  color: colors.$text-color-dark;
  box-shadow: 0 4px 10px colors.$box-shadow-color;
  transform: scale(1.05);
}
/* View More Blogs Button */
.view-more-wrapper {
  margin-top: 40px;
  text-align: center;
}
.btn {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}
/* Responsive Layout */
@media (max-width: 768px) {
  .section-title {
    font-size: 32px;
  }
  .blog-image {
    height: 180px;
  }
}
</style>
