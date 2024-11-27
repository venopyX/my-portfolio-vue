<template>
  <section class="blog-section">
    <div class="container">
      <h2 class="section-title">Latest Blog Posts</h2>
      <div class="row">
        <div v-for="(post, index) in blogPosts" :key="index" class="col-md-4">
          <div class="blog-card">
            <img :src="post.image" alt="Blog Image" class="blog-image" />
            <div class="blog-content">
              <h5 class="blog-title">{{ post.title }}</h5>
              <p class="blog-excerpt">{{ post.excerpt }}</p>
              <a :href="post.link" target="_blank" class="read-more">Read More</a>
            </div>
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

<style scoped lang="scss">
.blog-section {
  padding: 60px 0;
  background-color: #130042b0;

  .section-title {
    text-align: center;
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 40px;
    color: aqua;
  }

  .blog-card {
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;

    .blog-image {
      width: 100%;
      height: 180px;
      object-fit: cover;
    }

    .blog-content {
      padding: 15px;

      .blog-title {
        font-size: 18px;
        font-weight: 600;
        color: #5161ce;
        margin-bottom: 10px;
      }

      .blog-excerpt {
        font-size: 14px;
        color: #555;
        margin-bottom: 15px;
      }

      .read-more {
        font-size: 14px;
        color: #5161ce;
        text-decoration: none;
        font-weight: 600;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
