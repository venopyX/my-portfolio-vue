<template>
  <section class="portfolio-section">
    <div class="container">
      <h2 class="section-title scroll-animate" style="animation-delay: 0s">
        My Projects
      </h2>
      
      <div class="portfolio-filters scroll-animate" style="animation-delay: 0.1s">
        <button 
          v-for="filter in filters" 
          :key="filter"
          class="filter-btn active"
          :class="{ 'active': currentFilter === filter }"
          @click="setFilter(filter)"
        >
          {{ filter }}
        </button>
      </div>
      
      <div class="portfolio-cards">
        <div
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          class="portfolio-card scroll-animate"
          :style="{ 'animation-delay': `${index * 0.1}s` }"
          @mousemove="handleMouseMove"
          @mouseenter="handleCardEnter"
          @mouseleave="handleCardLeave"
        >
          <div class="card-wrapper">
            <div class="card-front">
              <div class="card-badge">
                <i class="fas fa-star"></i>
              </div>
              
              <img 
                :src="project.image" 
                :alt="project.title" 
                class="portfolio-card-img"
                loading="lazy"
              />
              
              <div class="card-overlay">
                <div class="overlay-icon">
                  <i class="fas fa-magic"></i>
                </div>
              </div>
              
              <div class="card-glow"></div>
              
              <div class="card-body">
                <h5 class="portfolio-card-title">{{ project.title }}</h5>
                <p class="portfolio-card-description">
                  {{ project.description }}
                </p>
                
                <div class="card-tags">
                  <span 
                    v-for="(tag, idx) in project.tags" 
                    :key="idx"
                    class="card-tag"
                  >
                    {{ tag }}
                  </span>
                </div>
                
                <div class="card-actions">
                  <a 
                    :href="project.link" 
                    target="_blank" 
                    class="github-link"
                    :title="'View project on GitHub'"
                    rel="noopener noreferrer"
                  >
                    <i class="fab fa-github"></i>
                    <span class="tooltip">View on GitHub</span>
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
                    <span class="tooltip">View Code</span>
                  </a>
                </div>
              </div>
            </div>
            
            <div class="card-back">
              <div class="back-content">
                <h4 class="back-title">Project Details</h4>
                <p class="back-description">
                  {{ project.details || 'Explore this project to learn more about its features and technologies.' }}
                </p>
                <div class="back-stats">
                  <div class="stat">
                    <i class="fas fa-users"></i>
                    <span>{{ project.viewers || '0' }}+ viewers</span>
                  </div>
                  <div class="stat">
                    <i class="fas fa-folder"></i>
                    <span>{{ project.files || '0' }} files</span>
                  </div>
                </div>
                <a 
                  :href="project.link" 
                  class="back-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i class="fas fa-external-link-alt"></i>
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="view-more-wrapper scroll-animate" style="animation-delay: 2s">
        <router-link to="/projects" class="btn btn-more">
          <i class="fas fa-arrow-right"></i>
          <span>View More Projects</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { useDataStore } from '@/stores';
import { onMounted, computed, ref } from 'vue';

export default {
  name: "PortfolioCards",
  setup() {
    const dataStore = useDataStore();
    const filters = ref(['All', 'Web Dev', 'Mobile', 'AI/ML', 'Blockchain']);
    const currentFilter = ref('All');

    const projects = computed(() => dataStore.getCachedData('projects') || []);

    const fetchProjects = async () => {
      if (!dataStore.isCacheValid('projects')) {
        await dataStore.fetchCollection('projects');
      }
    };

    onMounted(fetchProjects);

    const filteredProjects = computed(() => {
      if (currentFilter.value === 'All') {
        return projects.value.slice(0, 6);
      }
      return projects.value
        .filter(p => p.category === currentFilter.value)
        .slice(0, 3);
    });

    // 3D Card Effects
    let currentCards = [];
    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
      
      cancelAnimationFrame(animationFrameId);
      animateCard(card);
    };

    const handleCardEnter = (event) => {
      const card = event.currentTarget;
      card.classList.add('hovering');
      
      if (!currentCards.length) {
        document.addEventListener('mousemove', handleMouseMove);
      }
      
      currentCards.push(card);
      
      if (currentCards.length === 1) {
        animateCards();
      }
    };

    const handleCardLeave = (event) => {
      const card = event.currentTarget;
      card.classList.remove('hovering');
      card.style.transform = '';
      card.style.zIndex = '';

      currentCards = currentCards.filter(c => c !== card);
      
      if (currentCards.length === 0) {
        document.removeEventListener('mousemove', handleMouseMove);
      }
    };

    const animateCard = (card) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = mouseX - centerX;
      const deltaY = mouseY - centerY;
      
      const rotateX = -deltaY * 0.05;
      const rotateY = deltaX * 0.05;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.zIndex = '10';
    };

    const animateCards = () => {
      currentCards.forEach(card => animateCard(card));
      animationFrameId = requestAnimationFrame(animateCards);
    };

    const setFilter = (filter) => {
      currentFilter.value = filter;
      
      currentCards.forEach(card => {
        card.classList.remove('hovering');
        card.style.transform = '';
        card.style.zIndex = '';
      });
      currentCards = [];
    };

    return {
      filteredProjects,
      filters,
      currentFilter,
      setFilter,
      handleMouseMove,
      handleCardEnter,
      handleCardLeave
    };
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/colors.scss";

.portfolio-section {
  min-height: 100vh;
  padding: 100px 20px;
  background: var(--bg-section-gradient);
  
  @media (max-width: 991px) {
    padding: 80px 20px;
  }
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 2rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: var(--primary-color);
    box-shadow: 0 0 15px var(--primary-color);
    border-radius: 2px;
  }
}

.portfolio-filters {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 40px;
  
  .filter-btn {
    padding: 10px 25px;
    font-size: 0.95rem;
    font-weight: 600;
    color: var(--text-light);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50px;
    cursor: pointer;
    transition: var(--transition-base);
    
    &:hover {
      background: rgba(255, 123, 137, 0.1);
      border-color: var(--primary-color);
      color: var(--primary-color);
    }
    
    &.active {
      background: var(--primary-color);
      border-color: var(--primary-color);
      color: var(--dark-overlay);
      box-shadow: 0 5px 20px rgba(255, 123, 137, 0.3);
    }
  }
}

.portfolio-filters .filter-btn.active span {
  font-weight: 800;
}

.portfolio-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  perspective: 1000px;
}

.portfolio-card {
  position: relative;
  width: 100%;
  max-width: 360px;
  height: 480px;
  perspective: 1000px;
  
  .card-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);

    &.hovering {
      box-shadow:
        0 25px 60px rgba(0, 0, 0, 0.4),
        0 0 30px rgba(255, 123, 137, 0.3);
    }
  }
  
  .card-front {
    position: absolute;
    inset: 0;
    border-radius: 20px;
    overflow: hidden;
    background: var(--card-bg-gradient);
    border: 2px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.4s ease;
    
    &:hover {
      box-shadow: 
        0 25px 60px rgba(0, 0, 0, 0.4),
        0 0 30px rgba(255, 123, 137, 0.3);
          
      .portfolio-card-title {
        color: var(--primary-color);
      }
      
      .portfolio-card-img {
        transform: scale(1.08);
        filter: brightness(1.1);
      }
      
      .card-actions a {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .card-badge {
      position: absolute;
      top: 20px;
      left: 20px;
      width: 40px;
      height: 40px;
      background: var(--primary-color);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 5px 15px rgba(255, 123, 137, 0.4);
      z-index: 10;
    }
    
    .portfolio-card-img {
      width: 100%;
      height: 55%;
      object-fit: cover;
      transition: transform 0.5s ease, filter 0.5s ease;
      margin-bottom: 0;
    }
    
    .card-overlay {
      position: absolute;
      inset: 0;
      background: rgba(15, 15, 26, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .overlay-icon {
      font-size: 3rem;
      color: var(--primary-color);
      transform: scale(0.5);
      transition: transform 0.3s ease;
    }
    
    .card-body {
      padding: 20px;
      height: 45%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: linear-gradient(to top, rgba(15, 15, 26, 0.95), transparent);
    }
    
    .portfolio-card-title {
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--text-light);
      margin-bottom: 10px;
      transition: color 0.3s ease;
    }
    
    .portfolio-card-description {
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.5;
      margin-bottom: 15px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .card-glow {
      position: absolute;
      bottom: -50px;
      left: 50%;
      transform: translateX(-50%);
      width: 300px;
      height: 150px;
      background: radial-gradient(ellipse at center, var(--primary-color) 0%, transparent 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
    
    &:hover .card-glow {
      opacity: 0.5;
    }
    
    .card-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 15px;
      
      .card-tag {
        padding: 4px 12px;
        font-size: 0.75rem;
        color: var(--primary-color);
        background: rgba(255, 123, 137, 0.15);
        border-radius: 15px;
        border: 1px solid rgba(255, 123, 137, 0.2);
      }
    }
    
    .card-actions {
      display: flex;
      gap: 10px;
      
      a {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: var(--primary-color);
        font-size: 1.1rem;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
        
        &:hover {
          color: #fff;
        }
      }
    }
  }
  
  .card-back {
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background: linear-gradient(145deg, var(--card-bg-hover-gradient),
    #ffffff 5%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    transform: rotateY(180deg);
    backface-visibility: hidden;
    text-align: center;
    border: 2px solid var(--primary-color);
    box-shadow: var(--box-shadow-lg);
  }
  
  .back-content {
    transform: translateY(20px);
    transition: transform 0.4s ease;
    
    .back-title {
      color: var(--primary-color);
      font-size: 1.4rem;
      margin-bottom: 15px;
    }
    
    .back-description {
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin-bottom: 20px;
    }
    
    .back-stats {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 20px;
      
      .stat {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--text-light);
        
        i {
          color: var(--primary-color);
        }
      }
    }
    
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 25px;
      background: var(--primary-color);
      color: var(--dark-overlay);
      border-radius: 25px;
      font-weight: 600;
      transition: all 0.3s ease;
      
      &:hover {
        background: var(--button-hover-bg);
        color: var(--text-light);
        transform: translateX(5px);
      }
    }
  }
  
  &:hover .back-content {
    transform: translateY(0);
  }
}

.view-more-wrapper {
  text-align: center;
  margin-top: 60px;
  
  .btn {
    padding: 14px 40px;
    font-size: 1.05rem;
    font-weight: 700;
    border-radius: 50px;
    background: var(--primary-color);
    color: var(--dark-overlay);
    display: inline-flex;
    align-items: center;
    gap: 12px;
    transition: all 0.3s ease;
    
    i {
      transition: transform 0.3s ease;
    }
    
    &:hover {
      background: var(--button-hover-bg);
      color: var(--text-light);
      box-shadow: 0 8px 30px rgba(255, 123, 137, 0.4);
      transform: translateY(-3px);
      
      i {
        transform: translateX(5px);
      }
    }
  }
}

/* Responsive */
@media (max-width: 991px) {
  .portfolio-card {
    max-width: 100%;
    height: 440px;
  }
}

@media (max-width: 576px) {
  .section-title {
    font-size: 1.8rem;
  }
  
  .portfolio-filters {
    gap: 10px;
    
    .filter-btn {
      padding: 8px 18px;
      font-size: 0.85rem;
    }
  }
}
</style>
