<template>
  <div class="projects-page">
    <header class="page-header">
      <h1 class="page-title">All Projects</h1>
      <div class="search-bar">
        <input v-model="searchQuery" type="text" placeholder="Search for projects..." class="search-input" />
      </div>
    </header>
    <div class="projects-list">
      <div v-for="(project, index) in filteredProjects" :key="index" class="project-card">
        <div class="project-image-wrapper">
          <img :src="project.image" :alt="'Project Image ' + (index + 1)" class="project-image" />
        </div>
        <div class="project-content">
          <h5 class="project-title">{{ project.title }}</h5>
          <p class="project-description">{{ project.description }}</p>
          <a :href="project.link" target="_blank" class="github-link" :title="'View project on GitHub'">
            <i class="fab fa-github"></i>
            <span class="tooltip">View on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useDataStore } from '@/stores';
import { onMounted, ref, computed } from 'vue';

export default {
  name: 'ProjectsPage',
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
      return projects.value.filter((project) =>
        project.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    return {
      searchQuery,
      filteredProjects,
    };
  },
};
</script>

<style scoped lang="scss">
.projects-page {
  padding: 50px 25px;
  font-family: "Poppins", sans-serif;
  background: linear-gradient(135deg, #12121288, #1e1e1e88);
  color: #e4e4e4;

  .page-header {
    text-align: center;
    margin-bottom: 50px;

    .page-title {
      font-size: 48px;
      font-weight: 700;
      color: #ff6f61;
      text-transform: uppercase;
      text-shadow: 0 4px 8px rgba(255, 111, 97, 0.4);
    }

    .search-bar {
      margin-top: 20px;

      .search-input {
        width: 100%;
        max-width: 450px;
        padding: 14px 20px;
        border-radius: 30px;
        font-size: 16px;
        background-color: #1f2a37;
        border: 2px solid #ff6f61;
        color: #fff;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);

        &::placeholder {
          color: #aaa;
        }

        &:hover {
          background-color: #2a3c4c;
        }

        &:focus {
          outline: none;
          background-color: #ff6f61;
          color: #000;
        }
      }
    }
  }

  .projects-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 25px;

    .project-card {
      background: linear-gradient(145deg, #232323, #2c2c2c);
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
      }

      .project-image-wrapper {
        overflow: hidden;

        .project-image {
          width: 100%;
          height: 220px;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        &:hover .project-image {
          transform: scale(1.1);
        }
      }

      .project-content {
        padding: 20px;
        background-color: #383838;
        border-radius: 0 0 15px 15px;

        .project-title {
          font-size: 22px;
          font-weight: bold;
          color: #ff6f61;
          margin-bottom: 10px;
        }

        .project-description {
          font-size: 16px;
          color: #ccc;
          margin: 10px 0;
        }

        .github-link {
          position: relative;
          display: inline-block;
          color: #ff7b89;
          font-size: 1.5rem;
          transition: color 0.3s ease;
          &:hover .tooltip {
            visibility: visible;
            opacity: 1;
          }
          .tooltip {
            visibility: hidden;
            opacity: 0;
            background-color: #ff7b89;
            color: #000033;
            text-align: center;
            border-radius: 5px;
            padding: 5px 10px;
            position: absolute;
            z-index: 1;
            bottom: 125%;
            left: 50%;
            transform: translateX(-50%);
            white-space: nowrap;
            transition: opacity 0.3s ease;
            &::after {
              content: "";
              position: absolute;
              top: 100%;
              left: 50%;
              margin-left: -5px;
              border-width: 5px;
              border-style: solid;
              border-color: #ff7b89 transparent transparent transparent;
            }
          }
        }
      }
    }
  }
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .projects-list {
    grid-template-columns: 1fr;
  }

  .search-bar .search-input {
    max-width: 100%;
  }

  .page-title {
    font-size: 36px;
  }
}
</style>
