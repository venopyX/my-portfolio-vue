<template>
  <div class="projects-page">
    <header class="page-header">
      <h1 class="page-title scroll-animate" style="animation-delay: 0s">
        All Projects
      </h1>
      
      <div class="search-bar scroll-animate" style="animation-delay: 0.2s">
        <div class="search-wrapper">
          <i class="fas fa-search search-icon"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for projects..."
            class="search-input"
            aria-label="Search projects"
          />
        </div>
      </div>
    </header>
    
    <div class="projects-list">
      <div
        v-for="(project, index) in filteredProjects"
        :key="index"
        class="project-card scroll-animate"
        :style="{ 'animation-delay': `${(index % 6 + 1) * 0.1}s` }"
      >
        <div class="card-wrapper">
          <div class="card-image">
            <img 
              :src="project.image" 
              :alt="'Project Image ' + (index + 1)" 
              class="project-image" 
              loading="lazy"
            />
            <div class="image-overlay"></div>
          </div>
          
          <div class="card-content">
            <h5 class="project-title">{{ project.title }}</h5>
            <p class="project-description">{{ project.description }}</p>
            
            <div class="tags-container">
              <span
                v-for="(tag, idx) in project.tags"
                :key="idx"
                class="tag"
              >
                {{ tag }}
              </span>
            </div>
            
            <div class="card-actions">
              <a
                :href="project.link"
                target="_blank"
                class="github-link"
                title="View project on GitHub"
                rel="noopener noreferrer"
              >
                <i class="fab fa-github"></i>
                <span>Explore</span>
              </a>
              
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                class="code-link"
                title="View Source Code"
                rel="noopener noreferrer"
              >
                <i class="fas fa-code"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="filteredProjects.length === 0" class="no-results">
      <i class="fas fa-search"></i>
      <p>No projects found matching your search.</p>
    </div>
  </div>
</template>

<script>
import { useDataStore } from '@/stores';
import { onMounted, ref, computed } from 'vue';

export default {
  name: "ProjectsPage",
  setup() {
    const dataStore = useDataStore();
    const searchQuery = ref('');
    const projects = ref([]);

    const fetchProjects = async () => {
      try {
        projects.value = await dataStore.fetchCollection('projects');
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    onMounted(fetchProjects);

    const filteredProjects = computed(() => {
      if (!searchQuery.value) {
        return projects.value;
      }
      
      const query = searchQuery.value.toLowerCase();
      return projects.value.filter(project =>
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        (project.tags && project.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    });

    return {
      searchQuery,
      filteredProjects,
    };
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/colors.scss";

.projects-page {
  min-height: 100vh;
  padding: 100px 20px;
  background: var(--bg-dark);
  color: var(--text-light);
  
  @media (max-width: 991px) {
    padding: 80px 20px;
  }
}

.page-header {
  text-align: center;
  margin-bottom: 60px;
  
  .page-title {
    font-size: 3rem;
    font-weight: 800;
    color: var(--primary-color);
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 30px;
    position: relative;
    display: inline-block;
    
    &::before {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 4px;
      background: var(--primary-color);
      box-shadow: 0 0 20px var(--primary-color);
      border-radius: 2px;
      animation: grow-width 1s ease forwards;
    }
  }
}

.search-bar {
  max-width: 500px;
  margin: 0 auto;
  
  .search-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50px;
    padding: 8px 20px;
    border: 2px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    
    &:hover {
      border-color: rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.08);
    }
    
    &:focus-within {
      border-color: var(--primary-color);
      background: rgba(255, 123, 137, 0.05);
      box-shadow: 0 0 20px rgba(255, 123, 137, 0.2);
    }
    
    .search-icon {
      color: var(--text-secondary);
      transition: all 0.3s ease;
      
      .search-wrapper:hover &,
      .search-wrapper:focus-within & {
        color: var(--primary-color);
      }
    }
    
    .search-input {
      flex: 1;
      padding: 12px 0;
      background: transparent;
      border: none;
      color: var(--text-light);
      font-size: 1rem;
      outline: none;
      
      &::placeholder {
        color: rgba(255, 255, 255, 0.4);
      }
    }
  }
}

.projects-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 35px;
  max-width: 1200px;
  margin: 0 auto;
}

.project-card {
  position: relative;
  height: 420px;
  perspective: 1000px;
  
  .card-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      transform: rotateX(5deg) rotateY(5deg);
    }
  }
}

.card-image {
  position: relative;
  width: 100%;
  height: 55%;
  overflow: hidden;
  border-radius: 20px 20px 0 0;
  
  .project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(15, 15, 26, 0.9), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    .project-image {
      transform: scale(1.08);
      filter: brightness(1.1);
    }
    
    .image-overlay {
      opacity: 1;
    }
  }
}

.card-content {
  padding: 25px;
  background: linear-gradient(to top, rgba(15, 15, 26, 0.95), rgba(15, 15, 26, 0.8));
  border-radius: 0 0 20px 20px;
  height: 45%;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

.project-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 12px;
  text-transform: capitalize;
  line-height: 1.3;
}

.project-description {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 20px;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
  
  .tag {
    padding: 4px 12px;
    font-size: 0.75rem;
    color: var(--primary-color);
    background: rgba(255, 123, 137, 0.15);
    border-radius: 20px;
    border: 1px solid rgba(255, 123, 137, 0.2);
    text-transform: uppercase;
    font-weight: 600;
  }
}

.card-actions {
  display: flex;
  gap: 15px;
  
  a {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 50px;
    font-weight: 600;
    transition: all 0.3s ease;
    text-decoration: none;
    
    &:hover {
      transform: translateY(-3px);
    }
    
    .github-link {
      background: rgba(255, 255, 255, 0.1);
      color: var(--white);
      border: 2px solid rgba(255, 255, 255, 0.2);
      
      &:hover {
        background: white;
        color: var(--dark-overlay);
        border-color: white;
      }
    }
    
    .code-link {
      background: var(--primary-color);
      color: var(--dark-overlay);
      
      &:hover {
        background: var(--button-hover-bg);
      }
    }
  }
}

.no-results {
  text-align: center;
  padding: 80px 20px;
  color: var(--text-secondary);
  
  i {
    font-size: 4rem;
    margin-bottom: 20px;
    display: block;
    opacity: 0.5;
  }
  
  p {
    font-size: 1.2rem;
  }
}

/* Animations */
@keyframes grow-width {
  from { width: 0; }
  to { width: 100px; }
}

/* Responsive */
@media (max-width: 991px) {
  .projects-list {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
  
  .page-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .page-header {
    margin-bottom: 40px;
  }
}

@media (max-width: 576px) {
  .page-title {
    font-size: 2rem;
  }
  
  .project-title {
    font-size: 1.25rem;
  }
  
  .project-description {
    font-size: 0.9rem;
  }
  
  .card-actions {
    flex-direction: column;
    
    a {
      justify-content: center;
      width: 100%;
    }
  }
}
</style>
