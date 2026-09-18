<template>
  <section class="services-section">
    <div class="container">
      <h2 class="section-title scroll-animate" style="animation-delay: 0s">
        My Services
      </h2>
      
      <div class="services-grid">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="service-card scroll-animate"
          :style="{ 'animation-delay': `${(index * 0.1) + 0.2}s` }"
          :aria-label="`Service card: ${service.title}`"
          @mouseenter="handleCardHover($event)"
          @mouseleave="handleCardLeave($event)"
        >
          <div class="service-icon-wrap">
            <div class="service-icon-glow"></div>
            <i :class="service.icon" class="service-icon"></i>
          </div>
          
          <h5 class="service-title">{{ service.title }}</h5>
          <p class="service-description">{{ service.description }}</p>
          
          <div class="service-actions">
            <a 
              href="#contact" 
              class="service-link"
              @click="scrollToContact"
            >
              <i class="fas fa-arrow-right"></i>
              <span>Get in Touch</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useDataStore } from '@/stores';
import { onMounted, onUnmounted, ref } from 'vue';

export default {
  name: "ServicesSection",
  setup() {
    const dataStore = useDataStore();
    const services = ref([]);

    let hoverIntervals = [];

    const fetchServices = async () => {
      try {
        services.value = await dataStore.fetchCollection('services');
      } catch (error) {
        console.error('Failed to fetch services:', error);
      }
    };

    const handleCardHover = (event) => {
      const card = event.currentTarget;
      card.classList.add('hovering');
      
      // Icon animation
      const icon = card.querySelector('.service-icon');
      if (icon) {
        icon.style.transform = 'rotateY(360deg)';
        icon.style.transition = 'transform 0.5s ease';
      }
      
      // Description color transition
      const description = card.querySelector('.service-description');
      if (description) {
        description.style.color = 'var(--primary-color)';
        description.style.transition = 'color 0.3s ease, transform 0.3s ease';
        description.style.transform = 'translateY(-5px)';
      }
    };

    const handleCardLeave = (event) => {
      const card = event.currentTarget;
      card.classList.remove('hovering');
      
      // Icon reset
      const icon = card.querySelector('.service-icon');
      if (icon) {
        icon.style.transform = 'rotateY(0deg)';
      }
      
      // Description reset
      const description = card.querySelector('.service-description');
      if (description) {
        description.style.color = '';
        description.style.transform = '';
      }
    };

    const scrollToContact = () => {
      const element = document.querySelector('#contact');
      if (element) {
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    };

    // Reset all icon animations when leaving
    onUnmounted(() => {
      hoverIntervals.forEach(clearInterval);
      hoverIntervals = [];
    });

    onMounted(fetchServices);

    return {
      services,
      handleCardHover,
      handleCardLeave,
      scrollToContact
    };
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/colors.scss";

.services-section {
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

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.service-card {
  position: relative;
  height: 360px;
  background: var(--card-bg-gradient);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 40px 30px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    padding: 2px;
    background: linear-gradient(145deg, 
      rgba(255, 123, 137, 0.2), 
      rgba(74, 144, 226, 0.1));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &.hovering {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.3),
      0 0 30px rgba(255, 123, 137, 0.2);
    
    &::before {
      opacity: 1;
    }
  }
  
  &:hover {
    &::before {
      opacity: 1;
    }
  }
  
  .service-icon-wrap {
    position: relative;
    width: 100px;
    height: 100px;
    margin-bottom: 25px;
    
    .service-icon-glow {
      position: absolute;
      inset: -10px;
      background: var(--gradient-primary);
      border-radius: 50%;
      filter: blur(30px);
      opacity: 0;
      transition: opacity 0.4s ease;
    }
    
    .service-icon {
      position: relative;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3.5rem;
      color: var(--primary-color);
      background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
      border-radius: 20px;
      backdrop-filter: blur(10px);
      transition: transform 0.5s ease, box-shadow 0.3s ease;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
    
    &.hovering .service-icon-glow {
      opacity: 0.6;
    }
  }
  
  .service-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-light);
    margin-bottom: 15px;
    text-transform: capitalize;
    
    &::before {
      content: attr(data-content);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      color: transparent;
      -webkit-text-stroke: 1px var(--primary-color);
      opacity: 0;
      transition: all 0.4s ease;
      transition-delay: 0.1s;
      pointer-events: none;
    }
    
    &::after {
      content: attr(data-content);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      color: var(--primary-color);
      opacity: 0;
      transition: all 0.4s ease;
      transition-delay: 0.1s;
      pointer-events: none;
      transform: translateX(-5px);
    }
  }
  
  &.hovering .service-title::before,
  &.hovering .service-title::after {
    opacity: 0.2;
    transform: translateX(0);
  }
  
  .service-description {
    font-size: 1rem;
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 25px;
    transition: all 0.3s ease;
  }
  
  .service-actions {
    margin-top: auto;
    
    .service-link {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 12px 30px;
      background: transparent;
      color: var(--primary-color);
      border: 2px solid var(--primary-color);
      border-radius: 50px;
      font-weight: 600;
      transition: all 0.3s ease;
      
      i {
        transition: transform 0.3s ease;
      }
      
      &:hover {
        background: var(--primary-color);
        color: var(--dark-overlay);
        box-shadow: 0 5px 20px rgba(255, 123, 137, 0.3);
        transform: translateY(-3px);
        
        i {
          transform: translateX(5px);
        }
      }
    }
  }
}

/* Responsive */
@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .service-card {
    max-width: 100%;
  }
}

@media (max-width: 576px) {
  .section-title {
    font-size: 1.8rem;
  }
  
  .service-icon-wrap {
    width: 80px;
    height: 80px;
    
    .service-icon {
      font-size: 2.5rem;
    }
  }
  
  .service-title {
    font-size: 1.25rem;
  }
  
  .service-description {
    font-size: 0.9rem;
  }
  
  .service-actions .service-link {
    padding: 10px 25px;
    font-size: 0.95rem;
  }
}
</style>

