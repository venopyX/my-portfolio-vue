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
import { useDataStore } from "@/stores";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/devibeans.css";

marked.setOptions({
  highlight: (code, lang) => {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
});

export default {
  name: "BlogDetailPage",
  props: ["slug"],
  setup(props) {
    const dataStore = useDataStore();
    const router = useRouter();
    const blog = ref(null);
    const markdownContent = ref("");
    const loading = ref(true);

    const fetchBlog = async () => {
      try {
        const blogPosts = await dataStore.fetchCollection("blogPosts");
        const foundBlog = blogPosts.find((post) => post.slug === props.slug);
        if (foundBlog) {
          blog.value = foundBlog;
          markdownContent.value = marked(foundBlog.content);
        } else {
          router.push("/404");
        }
      } catch (error) {
        router.push("/404");
      } finally {
        loading.value = false;
      }
    };

    const highlightCodeBlocks = () => {
      const blocks = document.querySelectorAll("pre code");
      blocks.forEach((block) => {
        hljs.highlightElement(block);
      });
    };

    onMounted(() => {
      fetchBlog().then(() => {
        highlightCodeBlocks();
      });
    });

    watch(markdownContent, highlightCodeBlocks);

    const formatDate = (date) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    };

    return {
      blog,
      markdownContent,
      loading,
      formatDate,
    };
  },
};
</script>

<style scoped lang="scss">
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

  &:hover {
    transform: translateY(-5px);
  }
}

.blog-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: colors.$primary-color;
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
  margin: 0 auto 2rem;
  display: block;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
}

.blog-content {
  text-align: left;
  line-height: 1.8;
  font-size: 1.1rem;
  color: #e0e0e0;

  a {
    color: colors.$primary-color;
    text-decoration: none;
    border-bottom: 2px solid rgba(128, 216, 255, 0.3);
    transition: all 0.3s ease;

    &:hover {
      color: #40c4ff;
      border-bottom: 2px solid #40c4ff;
    }
  }

  img {
    max-width: 80%;
    border-radius: 8px;
    margin: 20px auto;
    display: block;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }
}

:deep(.blog-content) {
  h1, h2, h3, h4, h5, h6 {
    color: colors.$primary-color;
    font-weight: bold;
    margin: 1.5em 0 0.8em;
  }

  blockquote {
    border-left: 4px solid colors.$primary-color !important;
    background: rgba(30, 39, 46, 0.6) !important;
    margin: 1.5em 0 !important;
    padding: 1.5em !important;
    border-radius: 0 12px 12px 0 !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2) !important;
    font-style: italic !important;
    color: #e0e0e0 !important;
    position: relative !important;

    &::before {
      content: '"' !important;
      position: absolute !important;
      left: 10px !important;
      top: 0 !important;
      font-size: 4em !important;
      color: rgba(128, 216, 255, 0.1) !important;
      font-family: Georgia, serif !important;
      line-height: 1 !important;
    }

    p {
      margin: 0 !important;
      padding-left: 2em !important;
      line-height: 1.6 !important;
      font-size: 1.1em !important;
    }

    cite {
      display: block !important;
      margin-top: 1em !important;
      font-size: 0.9em !important;
      color: #b0bec5 !important;
      font-style: normal !important;
      padding-left: 2em !important;
    }
  }

  pre {
    background: #000 !important;
    border-radius: 12px !important;
    border: 2px solid #121212 !important;
    padding: 15px !important;
    margin: 20px 0 !important;
    overflow-x: auto !important;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5) !important;
  }

  pre code.hljs {
    background: transparent !important;
    border-radius: 10px !important;
    padding: 0 !important;
    font-family: 'Source Code Pro', monospace !important;
    font-size: 0.95em !important;
  }

  pre code {
    background: transparent !important;
    color: #f8f8f2 !important;
    padding: 0 !important;
    border-radius: 10px !important;
  }

  :not(pre) > code {
    background: rgba(18, 56, 105, 0.4) !important;
    color: colors.$primary-color !important;
    padding: 2px 6px !important;
    border-radius: 4px !important;
    font-family: 'Source Code Pro', monospace !important;
    font-size: 0.9em !important;
  }

  ul, ol {
    padding-left: 1.5em;
    margin: 1em 0;
  }

  li {
    margin: 0.5em 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
    background: rgba(30, 39, 46, 0.5);
    border-radius: 8px;
    overflow: hidden;
  }

  th, td {
    padding: 12px;
    border: 1px solid #2c3e50;
    text-align: left;
  }

  th {
    background: rgba(128, 216, 255, 0.1);
    color: colors.$primary-color;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background: rgba(30, 39, 46, 0.3);
  }
}

.loading {
  text-align: center;
  padding: 50px;
  font-size: 1.5rem;
  color: colors.$primary-color;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}

@media (max-width: 768px) {
  .blog-detail-page {
    margin: 15px;
    padding: 15px;
  }

  .blog-title {
    font-size: 2rem;
  }

  .blog-image {
    width: 100%;
  }

  .blog-content {
    font-size: 1rem;

    img {
      max-width: 100%;
    }
  }

  :deep(.blog-content) {
    blockquote {
      padding: 1em !important;
      margin: 1em 0 !important;

      p {
        padding-left: 1em !important;
      }
    }
  }
}
</style>
