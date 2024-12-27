<template>
  <div class="blog-detail-page">
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="blog">
      <h1 class="blog-title">{{ blog.title }}</h1>
      <p class="blog-meta">
        Published on {{ formatDate(blog.date) }} by {{ blog.author }} in {{ blog.category }}
      </p>
      <img :src="blog.image" :alt="blog.title" class="blog-image" />
      <div ref="blogContent" v-html="markdownContent" class="blog-content"></div>
    </div>
  </div>
</template>

<script>
import { useDataStore } from '@/stores';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/tokyo-night-dark.css';

marked.setOptions({
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
});

export default {
  name: 'BlogDetailPage',
  props: ['slug'],
  setup(props) {
    const dataStore = useDataStore();
    const router = useRouter();
    const blog = ref(null);
    const markdownContent = ref('');
    const loading = ref(true);

    const fetchBlog = async () => {
      try {
        const blogPosts = await dataStore.fetchCollection('blogPosts');
        const foundBlog = blogPosts.find((post) => post.slug === props.slug);
        if (foundBlog) {
          blog.value = foundBlog;
          markdownContent.value = marked(foundBlog.content);
        } else {
          console.error('Blog not found for slug:', props.slug);
          router.push('/404');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
        router.push('/404');
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchBlog);

    watch(() => props.slug, fetchBlog);

    const formatDate = (date) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    };

    const highlightCodeBlocks = () => {
      const blocks = document.querySelectorAll('pre code');
      blocks.forEach((block) => {
        hljs.highlightBlock(block);
      });
    };

    onMounted(() => {
      highlightCodeBlocks();
    });

    return {
      blog,
      markdownContent,
      loading,
      formatDate,
      highlightCodeBlocks,
    };
  },
};
</script>

<style scoped>
body {
  background: #06081fe0;
  font-family: 'Roboto', sans-serif;
  color: #e0e0e0;
}

.blog-detail-page {
  padding: 20px;
  max-width: 1000px;
  margin: 30px auto;
  background: #06081fe0;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease;
}

.blog-detail-page:hover {
  transform: translateY(-5px);
}

.blog-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #05f5f5;
  margin-bottom: 1rem;
  text-align: center;
}

.blog-meta {
  color: #b0bec5;
  font-size: 0.9rem;
  margin-bottom: 2rem;
  text-align: center;
}

.blog-image {
  width: 70%;
  height: auto;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.blog-content {
  text-align: left;
  line-height: 1.8;
  font-size: 1.1rem;
  color: #e0e0e0;
}

.blog-content a {
  color: #80d8ff;
  text-decoration: none;
  border-bottom: 2px solid rgba(128, 216, 255, 0.3);
  transition: all 0.3s ease;
}

.blog-content a:hover {
  color: #40c4ff;
  border-bottom: 2px solid #40c4ff;
}

.blog-content blockquote {
  border-left: 4px solid #80d8ff;
  padding: 10px 20px;
  margin: 20px 0;
  background: #1e272e;
  font-style: italic;
}

.blog-content pre {
  background: #263238;
  color: #f8f8f2;
  padding: 15px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 20px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  font-family: 'Source Code Pro', monospace;
}

.blog-content code {
  background: rgba(128, 216, 255, 0.4);
  color: #80d8ff;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Source Code Pro', monospace;
}

:deep() .blog-content h1,
::v-deep(.blog-content h1),
.blog-content h2,
::v-deep(.blog-content h2),
.blog-content h3,
::v-deep(.blog-content h3),
.blog-content h4,
::v-deep(.blog-content h4),
.blog-content h5,
::v-deep(.blog-content h5),
.blog-content h6,
::v-deep(.blog-content h6) {
  font-weight: bold;
  color: #80e0ff;
}

.blog-content img {
  max-width: 80%;
  border-radius: 8px;
  margin: 10px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.loading {
  text-align: center;
  padding: 50px;
  font-size: 1.5rem;
  color: #80d8ff;
}
</style>
