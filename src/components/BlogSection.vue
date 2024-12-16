<template>
  <section class="blog-section">
    <meta name="description" content="Dive into the latest trends, tutorials, and insights on technology, lifestyle, and business. Gemechis Chala shares his knowledge and experiences through engaging blog posts.">
    <div class="container">
      <h2 class="section-title">Latest Blog Posts</h2>
      <div class="row">
        <div v-for="(post, index) in blogPosts" :key="index" class="blog-card">
          <div class="blog-image-wrapper">
            <img v-lazy="post.image" :alt="'Blog Image ' + (index + 1)" class="blog-image" />
          </div>
          <div class="blog-content">
            <h5 class="blog-title">{{ post.title }}</h5>
            <p class="blog-excerpt">{{ post.excerpt }}</p>
            <a :href="post.link" target="_blank" class="read-more" :title="'Read more about ' + post.title">Read More</a>
          </div>
        </div>
      </div>
      <div class="view-more-wrapper">
        <router-link to="/blog" target="_blank" class="btn btn-more" title="View more blog posts on various topics">View More Blogs</router-link>
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

<style scoped lang="scss">
.blog-section {
  padding: 80px 20px;
  background: linear-gradient(135deg, colors.$blog-section-bg-start, colors.$blog-section-bg-end);
  color: colors.$text-color-light;
  overflow: hidden;
}

/* Section Title */
.section-title {
  text-align: center;
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 50px;
  color: colors.$primary-color;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  position: relative;
}
.section-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 4px;
  background: colors.$primary-color;
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
