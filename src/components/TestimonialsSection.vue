<template>
  <section class="testimonials-section">
    <div class="container">
      <h2 class="section-title scroll-animate" style="animation-delay: 0s">
        Client Testimonials
      </h2>
      
      <div class="testimonials-grid">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="testimonial-card scroll-animate"
          :style="{ 'animation-delay': `${index * 0.15}s` }"
          @mouseenter="handleCardHover($event, testimonial)"
          @mouseleave="handleCardLeave($event, testimonial)"
        >
          <div class="card-glow"></div>
          
          <!-- Quote Icon -->
          <div class="quote-icon">
            <i class="fas fa-quote-left"></i>
          </div>
          
          <!-- Testimonial Content -->
          <div class="testimonial-content">
            <p class="testimonial-text">
              "{{ testimonial.text }}"
            </p>
            
            <div class="testimonial-author">
              <div class="author-image-wrapper">
                <img 
                  v-if="testimonial.image" 
                  :src="testimonial.image" 
                  :alt="testimonial.name"
                  loading="lazy"
                />
              </div>
              
              <div class="author-info">
                <h5 class="author-name">{{ testimonial.name }}</h5>
                <p class="author-title">{{ testimonial.title }}</p>
              </div>
            </div>
          </div>
          
          <!-- Rating -->
          <div class="rating">
            <i 
              v-for="n in 5" 
              :key="n"
              class="star"
              :class='{ "filled": n <= testimonial.rating, "empty": n > testimonial.rating }'
            ></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useDataStore } from '@/stores';
import { onMounted, ref } from 'vue';

export default {
  name: "TestimonialsSection",
  setup() {
    const dataStore = useDataStore();
    const testimonials = ref([]);

    const fetchTestimonials = async () => {
      try {
        testimonials.value = await dataStore.fetchCollection('testimonials');
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      }
    };

    // AI Card Effects
    const handleCardHover = (event, testimonial) => {
      const card = event.currentTarget;
      card.classList.add('hovering');
      
      const icon = card.querySelector('.quote-icon');
      if (icon) {
        icon.style.transform = 'scale(1.1) rotate(10deg)';
        icon.style.color = 'var(--primary-color)';
      }
    };

    const handleCardLeave = (event) => {
      const card = event.currentTarget;
      card.classList.remove('hovering');
      
      const icon = card.querySelector('.quote-icon');
      if (icon) {
        icon.style.transform = '';
        icon.style.color = '';
      }
    };

    onMounted(fetchTestimonials);

    return {
      testimonials,
      handleCardHover,
      handleCardLeave
    };
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/colors.scss";

.testimonials-section {
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
  margin-bottom: 3rem;
  position: relative;
  text-align: center;
  
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

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.testimonial-card {
  position: relative;
  height: 320px;
  background: var(--card-bg-gradient);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 35px 30px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  &.hovering {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.3),
      0 0 40px rgba(255, 123, 137, 0.2);
    
    .card-glow {
      opacity: 0.5;
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 24px;
    padding: 2px;
    background: linear-gradient(145deg, 
      rgba(255, 123, 137, 0.15), 
      rgba(74, 144, 226, 0.1));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  .quote-icon {
    font-size: 2rem;
    color: rgba(255, 255, 255, 0.1);
    margin-bottom: 15px;
    transition: all 0.3s ease;
  }
  
  .testimonial-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    position: relative;
    z-index: 1;
    
    .testimonial-text {
      font-size: 1.05rem;
      line-height: 1.7;
      color: var(--text-secondary);
      font-style: italic;
      margin-bottom: 25px;
      position: relative;
      padding: 0 15px;
      
      &::before,
      &::after {
        content: '"';
        position: absolute;
        font-size: 3rem;
        color: rgba(255, 123, 137, 0.1);
        font-family: 'Georgia', serif;
        line-height: 1;
      }
      
      &::before {
        top: -30px;
        left: 0;
      }
      
      &::after {
        bottom: -40px;
        right: 0;
      }
    }
    
    .testimonial-author {
      display: flex;
      align-items: center;
      gap: 20px;
      
      .author-image-wrapper {
        width: 70px;
        height: 70px;
        flex-shrink: 0;
        
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          border: 3px solid var(--primary-color);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
      }
      
      .author-info {
        text-align: left;
        
        .author-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-light);
          text-transform: capitalize;
          margin-bottom: 5px;
        }
        
        .author-title {
          font-size: 0.9rem;
          color: var(--primary-color);
          font-weight: 500;
        }
      }
    }
  }
  
  .rating {
    display: flex;
    gap: 5px;
    margin-top: 20px;
    
    .star {
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.3);
      transition: all 0.3s ease;
      
      &.filled {
        color: var(--warning-color);
        animation: star-rating 0.5s ease forwards;
      }
      
      &.empty {
        color: rgba(255, 255, 255, 0.1);
      }
    }
  }
  
  .card-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 200px;
    background: radial-gradient(ellipse at center, 
      rgba(255, 123, 137, 0.4) 0%, 
      rgba(74, 144, 226, 0.2) 40%, 
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }
}

/* Animations */
@keyframes star-rating {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); opacity: 1; }
}

/* Responsive */
@media (max-width: 768px) {
  .section-title {
    font-size: 2rem;
  }
  
  .testimonials-grid {
    grid-template-columns: 1fr;
    max-width: 100%;
  }
  
  .testimonial-card {
    height: 380px;
    max-width: 100%;
    
    .testimonial-text {
      &::before {
        top: -20px;
      }
      
      &::after {
        bottom: -30px;
      }
    }
  }
}

@media (max-width: 576px) {
  .testimonial-card {
    padding: 30px 20px;
    
    .testimonial-content {
      .testimonial-text {
        &::before {
          top: -15px;
        }
        
        &::after {
          bottom: -25px;
        }
      }
      
      .testimonial-author {
        gap: 15px;
        
        .author-image-wrapper {
          width: 55px;
          height: 55px;
        }
        
        .author-info {
          .author-name {
            font-size: 1rem;
          }
          
          .author-title {
            font-size: 0.85rem;
          }
        }
      }
    }
    
    .rating .star {
      font-size: 0.9rem;
    }
  }
}
</style>
