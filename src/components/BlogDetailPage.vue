<template>
  <div class="blog-detail-page">
    <div class="navigation-buttons">
      <router-link to="/" class="nav-button">
        <i class="fas fa-arrow-left"></i>
        <span>Home</span>
      </router-link>
      <router-link to="/blogs" class="nav-button">
        <i class="fas fa-list"></i>
        <span>All Blogs</span>
      </router-link>
    </div>
    
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
    </div>
    
    <div v-else-if="blog" class="article-content">
      <article>
        <header class="article-header">
          <h1 class="blog-title">{{ blog.title }}</h1>
          <p class="blog-meta">
            <span v-if="blog.date" class="date">
              <i class="far fa-calendar"></i>
              {{ formatDate(blog.date) }}
            </span>
            <span v-if="blog.author" class="author">
              <i class="far fa-user"></i>
              {{ blog.author }}
            </span>
            <span v-if="blog.category" class="category">
              <i class="far fa-folder"></i>
              {{ blog.category }}
            </span>
          </p>
        </header>
        
        <img :src="blog.image" :alt="blog.title" class="blog-image" loading="lazy" />
        
        <div ref="blogContent" v-html="markdownContent" class="blog-content"></div>
      </article>
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
    const blogContent = ref(null);

    const fetchBlog = async () => {
      try {
        blogPosts.value = await dataStore.fetchCollection("blogPosts");
        const foundBlog = blogPosts.value.find((post) => post.slug === props.slug);
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

    const blogPosts = ref([]);
    onMounted(() => {
      fetchBlog();
    });

    watch(markdownContent, () => {
      if (blogContent.value) {
        highlightCodeBlocks();
      }
    });

    const highlightCodeBlocks = () => {
      const blocks = blogContent.value.querySelectorAll("pre code");
      blocks.forEach((block) => {
        hljs.highlightElement(block);
      });
    };

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
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/colors.scss";

.blog-detail-page {
  min-height: 100vh;
  padding: 80px 20px;
  background: var(--bg-dark);
  color: var(--text-light);
  
  @media (max-width: 991px) {
    padding: 60px 20px;
  }
}

.navigation-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.nav-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--primary-color);
  text-decoration: none;
  border-radius: 50px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 0.95rem;
  
  i {
    font-size: 1.1rem;
  }
  
  &:hover {
    background: rgba(255, 123, 137, 0.15);
    border-color: var(--primary-color);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(255, 123, 137, 0.3);
  }
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  
  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 3px solid var(--primary-color);
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

.article-content {
  max-width: 800px;
  margin: 0 auto;
}

.article-header {
  text-align: center;
  margin-bottom: 40px;
  
  .blog-title {
    font-size: 2.8rem;
    font-weight: 800;
    color: var(--primary-color);
    margin-bottom: 20px;
    line-height: 1.3;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .blog-meta {
    display: flex;
    justify-content: center;
    gap: 25px;
    flex-wrap: wrap;
    color: var(--text-secondary);
    font-size: 0.95rem;
    
    span {
      display: flex;
      align-items: center;
      gap: 8px;
      
      i {
        color: var(--primary-color);
      }
    }
  }
}

.blog-image {
  width: 100%;
  max-width: 700px;
  height: auto;
  border-radius: 20px;
  margin: 0 auto 40px;
  display: block;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.blog-content {
  font-family: 'Georgia', serif;
  font-size: 1.15rem;
  line-height: 1.9;
  color: var(--text-secondary);
  
  h1, h2, h3, h4, h5, h6 {
    color: var(--primary-color);
    font-weight: 700;
    margin: 2em 0 1em;
    line-height: 1.4;
    
    &:first-of-type {
      margin-top: 0;
    }
  }
  
  h1 { font-size: 2.2rem; }
  h2 { font-size: 1.8rem; }
  h3 { font-size: 1.5rem; }
  h4 { font-size: 1.3rem; }
  
  p {
    margin-bottom: 1.5em;
    line-height: 1.9;
  }
  
  a {
    color: var(--primary-color);
    text-decoration: none;
    border-bottom: 2px solid rgba(255, 123, 137, 0.3);
    transition: all 0.3s ease;
    
    &:hover {
      color: var(--button-hover-bg);
      border-bottom-color: var(--button-hover-bg);
      transform: translateX(3px);
    }
  }
  
  strong {
    color: var(--primary-color);
    font-weight: 700;
  }
  
  blockquote {
    border-left: 5px solid var(--primary-color);
    background: rgba(255, 123, 137, 0.1);
    margin: 2em 0;
    padding: 1.5em 2em;
    border-radius: 0 12px 12px 0;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    font-style: italic;
    position: relative;
    
    &::before {
      content: '"';
      position: absolute;
      top: -10px;
      left: 10px;
      font-size: 5em;
      color: rgba(255, 123, 137, 0.1);
      font-family: Georgia, serif;
      line-height: 1;
    }
    
    p {
      margin: 0;
      padding-left: 1em;
    }
  }
  
  img {
    max-width: 100%;
    border-radius: 12px;
    margin: 30px auto;
    display: block;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
  
  hr {
    border: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
    margin: 3em 0;
  }
  
  pre {
    background: rgba(0, 0, 0, 0.8);
    border-radius: 12px;
    border: 3px solid rgba(255, 123, 137, 0.3);
    padding: 20px;
    margin: 2em 0;
    overflow-x: auto;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    
    code {
      font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
      font-size: 0.95rem;
      color: #e0e0e0;
      line-height: 1.7;
      
      &.hljs {
        background: transparent !important;
        padding: 0 !important;
      }
    }
  }
  
  ul, ol {
    padding-left: 2em;
    margin: 1.5em 0;
    
    li {
      margin: 0.8em 0;
      line-height: 1.7;
    }
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 2em 0;
    background: rgba(30, 30, 50, 0.8);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    
    th, td {
      padding: 16px 20px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    th {
      background: rgba(255, 123, 137, 0.15);
      color: var(--primary-color);
      font-weight: 700;
      text-align: left;
    }
    
    tr:nth-child(even) {
      background: rgba(255, 255, 255, 0.05);
    }
    
    tr:hover {
      background: rgba(255, 123, 137, 0.1);
    }
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .article-header {
    .blog-title {
      font-size: 2rem !important;
    }
    
    .blog-meta {
      flex-direction: column;
      gap: 12px;
      
      span {
        justify-content: center;
      }
    }
  }
  
  .blog-image {
    max-width: 100%;
  }
  
  .blog-content {
    font-size: 1rem;
    
    h1 { font-size: 1.8rem; }
    h2 { font-size: 1.5rem; }
    h3 { font-size: 1.3rem; }
    h4 { font-size: 1.1rem; }
    
    blockquote {
      padding: 1.2em 1.5em;
      
      &::before {
        font-size: 4em;
        top: -5px;
      }
    }
  }
  
  .navigation-buttons {
    flex-direction: column;
  }
}
</style>
