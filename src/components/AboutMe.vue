<template>
  <section class="about-section">
    <div class="container">
      <h2 class="section-title scroll-animate" style="animation-delay: 0s">
        About Me
      </h2>
      
      <div class="about-content">
        <div class="about-image-wrapper">
          <div class="image-ring">
            <div class="image-glow"></div>
            <img 
              v-lazy="profileData.image" 
              alt="Profile Picture" 
              class="profile-picture"
              @error="handleImageError"
            />
            <div class="image-shine"></div>
          </div>
        </div>
        
        <div class="about-text-wrapper">
          <p class="about-intro scroll-animate" style="animation-delay: 0.2s" v-if="profileData.description">
            Hi, I'm <strong class="highlight">Gemechis Chala</strong>, aka <strong class="highlight">@venopyX</strong>. 
            {{ profileData.description }}
          </p>
          
          <div class="stats-container scroll-animate" style="animation-delay: 0.4s">
            <div class="stat-item">
              <div class="stat-value">{{ projectsCount }}</div>
              <div class="stat-label">Projects</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ yearsExperienced }}</div>
              <div class="stat-label">Years Exp.</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">{{ clientsCount }}</div>
              <div class="stat-label">Clients</div>
            </div>
          </div>
          
          <div class="social-icons-container scroll-animate" style="animation-delay: 0.6s">
            <a
              v-for="(platform, index) in socialMedia"
              :key="index"
              :href="platform.link"
              target="_blank"
              rel="noopener noreferrer"
              :class="['social-icon', platform.class, `fade-in`]"
              :style="{
                background: `linear-gradient(135deg, ${platform.colorCode} 0%, ${lightenColor(platform.colorCode, 30)} 100%)`,
                animationDelay: `${index * 0.1}s`
              }"
              :aria-label="platform.name"
            >
              <i :class="platform.icon"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useDataStore } from '@/stores';
import { onMounted, ref, reactive } from 'vue';

export default {
  name: "AboutMe",
  setup() {
    const dataStore = useDataStore();
    const profileData = ref({});
    const socialMedia = ref([]);
    const error = ref(null);
    
    // Fake stats
    const projectsCount = ref(85);
    const yearsExperienced = ref(5);
    const clientsCount = ref(40);

    const lightenColor = (color, percent) => {
      let usePound = false;
      if (color[0] === "#") {
        color = color.slice(1);
        usePound = true;
      }
      let num = parseInt(color, 16);
      let amt = Math.round(2.55 * percent);
      let R = (num >> 16) + amt;
      let G = (num >> 8 & 0x00FF) + amt;
      let B = (num & 0x0000FF) + amt;
      return (usePound ? "#" : "") + (0x1000000 + 
        (R < 255 ? R : 255) * 0x10000 + 
        (G < 255 ? G : 255) * 0x100 + 
        (B < 255 ? B : 255)
      ).toString(16).slice(1);
    };

    const handleImageError = () => {
      error.value = 'Failed to load profile image';
    };

    const fetchData = async () => {
      try {
        profileData.value = await dataStore.fetchDocument('profile', 'main');
        const socialMediaData = await dataStore.fetchCollection('socialMedia', {
          orderBy: { field: 'order', direction: 'asc' }
        });

        socialMedia.value = socialMediaData.map(platform => {
          let colorCode = platform.class.match(/#\w+/);
          return {
            ...platform,
            colorCode: colorCode ? colorCode[0] : '#ffffff'
          };
        });
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    onMounted(fetchData);

    return {
      profileData,
      socialMedia,
      lightenColor,
      projectsCount,
      yearsExperienced,
      clientsCount,
      handleImageError,
      error
    };
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/colors.scss";

.about-section {
  min-height: 100vh;
  padding: 100px 20px;
  background: var(--bg-section-gradient);
  color: var(--text-light);
  text-align: center;
  
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

.about-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  
  @media (max-width: 991px) {
    flex-direction: column;
  }
}

.about-image-wrapper {
  position: relative;
  flex-shrink: 0;
  
  @media (max-width: 991px) {
    flex-shrink: 0;
    margin-bottom: 40px;
  }
}

.image-ring {
  position: relative;
  width: 360px;
  height: 360px;
  
  @media (max-width: 576px) {
    width: 280px;
    height: 280px;
  }
  
  .profile-picture {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    position: relative;
    z-index: 2;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    animation: float 6s ease-in-out infinite;
    box-shadow: 
      0 0 0 8px rgba(255, 255, 255, 0.05),
      0 0 60px rgba(255, 123, 137, 0.2);
  }
  
  &:hover .profile-picture {
    transform: scale(1.05);
    box-shadow: 
      0 0 0 8px rgba(255, 123, 137, 0.15),
      0 0 80px rgba(255, 123, 137, 0.4);
  }
  
  .image-glow {
    position: absolute;
    inset: -30px;
    background: var(--gradient-primary);
    border-radius: 50%;
    filter: blur(50px);
    opacity: 0.5;
    z-index: 1;
    animation: pulse-glow 4s ease-in-out infinite;
  }
  
  .image-shine {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      125deg,
      transparent 30%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 70%
    );
    border-radius: 50%;
    z-index: 3;
    animation: shine 4s ease-in-out infinite;
  }
}

.about-text-wrapper {
  flex: 1;
  text-align: center;
  
  @media (max-width: 991px) {
    text-align: center;
  }
}

.about-intro {
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 40px;
  max-width: 600px;
  
  .highlight {
    color: var(--primary-color);
    font-weight: 800;
    
    &::before {
      content: '';
      position: relative;
      display: inline-block;
      z-index: 1;
    }
  }
}

.stats-container {
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 30px;
    align-items: center;
  }
  
  .stat-item {
    text-align: center;
    
    .stat-value {
      font-size: 3rem;
      font-weight: 800;
      color: var(--primary-color);
      line-height: 1;
      margin-bottom: 10px;
      position: relative;
      display: inline-block;
      
      &::before {
        content: attr(data-prefix);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 0.5em;
        color: var(--primary-color);
        opacity: 0;
        transition: all 0.4s ease;
      }
      
      &:hover::before {
        opacity: 0.2;
        top: 70%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    
    .stat-label {
      font-size: 1rem;
      color: var(--text-secondary);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }
}

.social-icons-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  
  @media (max-width: 576px) {
    gap: 15px;
  }
  
  .social-icon {
    position: relative;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    color: var(--white);
    font-size: 1.5rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    
    &::before {
      content: '';
      position: absolute;
      inset: -3px;
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      border-radius: 22px;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.4s ease;
    }
    
    &:hover {
      transform: translateY(-5px) scale(1.1);
      filter: brightness(1.2);
      
      &::before {
        opacity: 1;
      }
      
      i {
        transform: scale(1.2);
      }
    }
    
    &.fade-in {
      animation: slideUpFade 0.5s ease forwards;
    }
  }
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}

@keyframes shine {
  0% { left: -100%; }
  100% { left: 200%; }
}

@keyframes slideUpFade {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 991px) {
  .about-content {
    flex-direction: column;
    gap: 40px;
  }
  
  .image-ring {
    width: 300px;
    height: 300px;
  }
  
  .stats-container {
    gap: 40px;
  }
}

@media (max-width: 576px) {
  .section-title {
    font-size: 1.8rem;
  }
  
  .about-intro {
    font-size: 1.1rem;
    padding: 0 20px;
  }
  
  .stats-container {
    gap: 30px;
    flex-direction: column;
    align-items: center;
  }
  
  .stat-value {
    font-size: 2.5rem !important;
  }
  
  .stats-container .stat-label {
    font-size: 0.9rem;
  }
  
  .social-icons-container .social-icon {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
  }
  
  .about-image-wrapper {
    width: 280px;
    height: 280px;
  }
}
</style>
