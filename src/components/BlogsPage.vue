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
          <a :href="post.link" target="_blank" class="read-more">Read More</a>
        </div>
      </div>
    </div>

    <div class="pagination">
      <button @click="loadMore" class="btn-load-more">Load More</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogsPage',
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      sortBy: 'date',
      blogPosts: [
        { title: 'Tech Blog 1', excerpt: 'This is an excerpt of a tech blog post.', image: 'https://placehold.co/300x200', link: '#', category: 'tech', date: '2024-11-10' },
        { title: 'Business Insights', excerpt: 'Business-related content goes here...', image: 'https://placehold.co/300x200', link: '#', category: 'business', date: '2024-11-05' },
        { title: 'Lifestyle Tips', excerpt: 'Lifestyle article content goes here...', image: 'https://placehold.co/300x200', link: '#', category: 'lifestyle', date: '2024-11-08' },
        { title: 'Tutorial on Vue.js', excerpt: 'Learn Vue.js with this in-depth tutorial.', image: 'https://placehold.co/300x200', link: '#', category: 'tutorial', date: '2024-11-12' },
      ],
    };
  },
  computed: {
    filteredAndSortedBlogs() {
      let filteredBlogs = this.blogPosts.filter(post => {
        return (
          post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
          (this.selectedCategory ? post.category === this.selectedCategory : true)
        );
      });

      if (this.sortBy === 'date') {
        filteredBlogs.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (this.sortBy === 'title') {
        filteredBlogs.sort((a, b) => a.title.localeCompare(b.title));
      }

      return filteredBlogs;
    },
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(date).toLocaleDateString('en-US', options);
    },
    loadMore() {
      console.log('Loading more blogs...');
    },
  },
};
</script>

<style scoped>
.blogs-page {
  padding: 40px 20px;
  color: #f0f0f0;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #0c1b3d, #121820);
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-title {
  font-size: 42px;
  font-weight: bold;
  color: #00ffcc;
  text-transform: uppercase;
  letter-spacing: 2px;
}

.page-description {
  font-size: 18px;
  color: #aaa;
  margin-top: 10px;
}

.filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.search-bar input,
.filter-select {
  padding: 12px;
  border-radius: 50px;
  border: 2px solid #00ffcc;
  font-size: 16px;
  color: #f0f0f0;
  background-color: #1f2a37;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.search-bar input:focus,
.filter-select:focus {
  border-color: #ff7b89;
  color: #000;
  outline: none;
}

.search-bar input:hover,
.filter-select:hover {
  border-color: #ff7b89;
  background-color: #2a3c4c;
  color: #000;
}

.search-bar input::placeholder {
  color: #000;
}

.filter-select {
  color: #aaa;
}

.filter-select {
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.filter-select:hover,
.search-bar input:hover {
  background-color: #ff7b89;
  border-color: #ffffff;
  color: #000;
}

.blogs-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.blog-card {
  background: linear-gradient(135deg, #2c3e50, #34495e);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.blog-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 16px 35px rgba(0, 0, 0, 0.4);
}

.blog-image-wrapper {
  overflow: hidden;
}

.blog-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px;
  transition: transform 0.5s ease;
}

.blog-image-wrapper:hover .blog-image {
  transform: scale(1.1);
}

.blog-content {
  padding: 20px;
  background-color: #522157; /* Updated color */
  border-radius: 10px;
}

.blog-title {
  font-size: 22px;
  font-weight: bold;
  color: #ffffff;
  text-transform: uppercase;
}

.blog-excerpt {
  font-size: 16px;
  color: #f0f0f0; /* Updated color */
  margin: 12px 0;
}

.blog-meta {
  font-size: 14px;
  color: #bbb;
}

.blog-date {
  margin-right: 12px;
}

.blog-category {
  font-weight: bold;
  color: #ff7b89; /* Updated color */
}

.read-more {
  font-size: 16px;
  color: #ff7b89;
  text-decoration: none;
  font-weight: bold;
  border: 2px solid #ff7b89;
  padding: 10px 25px;
  border-radius: 50px;
  transition: all 0.3s ease;
  align-self: center;
  margin-top: 20px;
}

.read-more:hover {
  background: #ff7b89;
  color: #1e1738;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.3);
}

.pagination {
  text-align: center;
  margin-top: 40px;
}

.btn-load-more {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  background-color: #1f2a37;
  color: #ff7b89; /* Updated color */
  border: 2px solid #ff7b89;
  transition: all 0.3s ease;
}

.btn-load-more:hover {
  background-color: #ff7b89;
  color: #1e1738;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
}

/* Responsive Layout */
@media (max-width: 768px) {
  .page-title {
    font-size: 30px;
  }
}
</style>
