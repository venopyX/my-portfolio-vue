<template>
  <div class="blogs-page">
    <header class="page-header">
      <h1 class="page-title">Explore Blogs</h1>
      <p class="page-description">Dive into the latest trends, tutorials, and insights.</p>
    </header>
    <div class="filters">
      <div class="search-bar">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for blogs..."
          class="search-input"
        />
      </div>
      <div class="category-filter">
        <select v-model="selectedCategory" class="filter-select">
          <option value="">All Categories</option>
          <option value="tech">Tech</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="business">Business</option>
          <option value="tutorial">Tutorial</option>
        </select>
      </div>
      <div class="sort-filter">
        <select v-model="sortBy" class="filter-select">
          <option value="date">Sort by Date</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>
    </div>
    <div class="blogs-list">
      <div v-for="(post, index) in filteredAndSortedBlogs" :key="index" class="blog-card">
        <div class="blog-image-wrapper">
          <img :src="post.image" :alt="'Blog Image ' + (index + 1)" class="blog-image" />
        </div>
        <div class="blog-content">
          <h5 class="blog-title">{{ post.title }}</h5>
          <p class="blog-excerpt">{{ post.excerpt }}</p>
          <p class="blog-meta">
            <span class="blog-date">{{ formatDate(post.date) }}</span>
            <span class="blog-category">{{ post.category }}</span>
          </p>
          <a :href="`/blog/${post.slug}`" class="read-more">Read More</a>
        </div>
      </div>
    </div>
    <div class="pagination">
      <button @click="loadMore" class="btn-load-more">Load More</button>
    </div>
  </div>
</template>

<script>
import { useDataStore } from '@/stores';
import { onMounted, ref, computed } from 'vue';

export default {
  name: "BlogsPage",
  setup() {
    const dataStore = useDataStore();
    const searchQuery = ref("");
    const selectedCategory = ref("");
    const sortBy = ref("date");
    const blogPosts = ref([]);

    const fetchBlogPosts = async () => {
      try {
        blogPosts.value = await dataStore.fetchCollection('blogPosts', { orderBy: { field: 'createdAt', direction: 'desc' } });
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      }
    };

    onMounted(fetchBlogPosts);

    const filteredAndSortedBlogs = computed(() => {
      let filteredBlogs = blogPosts.value.filter((post) => {
        return (
          post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
          (selectedCategory.value ? post.category === selectedCategory.value : true)
        );
      });
      if (sortBy.value === "date") {
        filteredBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (sortBy.value === "title") {
        filteredBlogs.sort((a, b) => a.title.localeCompare(b.title));
      }
      return filteredBlogs;
    });

    const formatDate = (date) => {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(date).toLocaleDateString("en-US", options);
    };

    const loadMore = () => {
      console.log("Loading more blogs...");
    };

    return {
      searchQuery,
      selectedCategory,
      sortBy,
      filteredAndSortedBlogs,
      formatDate,
      loadMore,
    };
  },
};
</script>

<style scoped>
.blogs-page {
  padding: 40px 20px;
  font-family: "Poppins", sans-serif;
  background: linear-gradient(135deg, #12121288, #1c1c1c88);
  color: #e4e4e4;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 48px;
  font-weight: 700;
  color: #ff6f61;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-shadow: 0 4px 8px rgba(255, 111, 97, 0.4);
}

.page-description {
  font-size: 20px;
  color: #b0b0b0;
  margin-top: 12px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.filters {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.search-bar input,
.filter-select {
  width: 220px;
  padding: 12px 16px;
  border-radius: 25px;
  border: none;
  background-color: #2b2b2b;
  color: #fff;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
}

.search-bar input::placeholder {
  color: #aaa;
}

.search-bar input:hover,
.filter-select:hover {
  background-color: #ff6f61;
  color: #fff;
  box-shadow: 0 6px 14px rgba(255, 111, 97, 0.5);
}

.search-bar input:focus,
.filter-select:focus {
  outline: none;
  border: 1px solid #ff6f61;
}

.blogs-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.blog-card {
  background: linear-gradient(135deg, #232323, #2e2e2e);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.blog-card:hover {
  transform: scale(1.03);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
}

.blog-image-wrapper {
  overflow: hidden;
}

.blog-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.blog-image-wrapper:hover .blog-image {
  transform: scale(1.1);
}

.blog-content {
  padding: 20px;
  color: #e4e4e4;
}

.blog-title {
  font-size: 24px;
  font-weight: 700;
  color: #ff6f61;
  text-transform: capitalize;
  margin-bottom: 10px;
}

.blog-excerpt {
  font-size: 16px;
  color: #b0b0b0;
  margin: 10px 0;
}

.blog-meta {
  font-size: 14px;
  color: #999;
  margin-bottom: 20px;
}

.read-more {
  display: inline-block;
  font-size: 14px;
  color: #ff6f61;
  border: 2px solid #ff6f61;
  padding: 10px 20px;
  border-radius: 25px;
  text-transform: uppercase;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
}

.read-more:hover {
  background-color: #ff6f61;
  color: #000000;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.btn-load-more {
  padding: 12px 28px;
  font-size: 16px;
  color: #000000;
  background: #ff6f61;
  border: none;
  border-radius: 25px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-load-more:hover {
  background: #e5584b;
  box-shadow: 0 6px 12px rgba(255, 111, 97, 0.4);
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .page-title {
    font-size: 36px;
  }

  .blog-content {
    padding: 15px;
  }

  .read-more {
    padding: 8px 16px;
  }
}
</style>
