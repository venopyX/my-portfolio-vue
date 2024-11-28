<template>
  <section class="blog-section">
    <div class="container">
      <h2 class="section-title">Latest Blog Posts</h2>
      <div class="row">
        <div v-for="(post, index) in blogPosts" :key="index" class="blog-card">
          <div class="blog-image-wrapper">
            <img :src="post.image" :alt="'Blog Image ' + (index + 1)" class="blog-image" />
          </div>
          <div class="blog-content">
            <h5 class="blog-title">{{ post.title }}</h5>
            <p class="blog-excerpt">{{ post.excerpt }}</p>
            <a :href="post.link" target="_blank" class="read-more">Read More</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "BlogSection",
  props: {
    blogPosts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Blog Section Styling */
.blog-section {
  padding: 80px 20px;
  background: linear-gradient(135deg, #13004255, #2b0f6255);
  color: #fff;
  overflow: hidden;
}

/* Section Title */
.section-title {
  text-align: center;
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 50px;
  color: #00e7ff;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  position: relative;
}
.section-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background: #00e7ff;
  margin: 10px auto 0;
  border-radius: 50px;
}

/* Blog Cards */
.row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
.blog-card {
  background: linear-gradient(135deg, #f0439335, #240e8b55);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.blog-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
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
  color: #00e7ff;
  margin-bottom: 10px;
  text-transform: capitalize;
  letter-spacing: 0.5px;
}
.blog-excerpt {
  font-size: 16px;
  color: #d4d4d4;
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
  color: #00e7ff;
  text-decoration: none;
  font-weight: bold;
  border: 2px solid #00e7ff;
  padding: 8px 20px;
  border-radius: 25px;
  transition: all 0.3s ease;
  align-self: center;
  margin-top: 20px;
}
.read-more:hover {
  background: #00e7ff;
  color: #1e1738;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transform: scale(1.05);
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
