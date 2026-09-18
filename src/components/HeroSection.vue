<template>
  <section class="hero" :class="{ 'loading': isLoading, 'scrolled': isScrolled }">
    <div class="hero-container">
      <div class="hero-image" v-if="heroData">
        <div class="image-glow"></div>
        <img
          v-if="heroData.image"
          :src="heroData.image"
          :alt="heroData.imageAlt"
          :width="350"
          :height="350"
          loading="eager"
          @error="handleImageError"
          class="profile-image"
        />
        <div class="image-shine"></div>
      </div>
      
      <div class="hero-content" v-if="heroData">
        <div class="hero-text fade-in-up">
          <p v-if="heroData.title" class="subtitle fade-in-up" style="animation-delay: 0.1s">
            {{ heroData.title }}
          </p>
          <h1 v-if="heroData.subtitle" class="title fade-in-up" style="animation-delay: 0.2s">
            {{ heroData.subtitle }}
          </h1>
          <h2>
            <span ref="typedTextRef" class="typed-text" aria-live="polite"></span>
          </h2>
        </div>
        
        <div class="hero-btn fade-in-up" style="animation-delay: 0.4s" v-if="heroData.exploreLink || heroData.contactLink">
          <button
            v-if="heroData.exploreLink"
            class="btn btn-explore"
            @click="navigateTo(heroData.exploreLink)"
            :aria-label="heroData.exploreText"
            aria-label="Explore my work"
          >
            <i class="fas fa-arrow-right"></i>
            <span class="btn-text">{{ heroData.exploreText }}</span>
          </button>
          <button
            v-if="heroData.contactLink"
            class="btn btn-primary"
            @click="navigateTo(heroData.contactLink)"
            :aria-label="heroData.contactText"
            aria-label="Contact me"
          >
            <i class="fas fa-paper-plane"></i>
            <span class="btn-text">{{ heroData.contactText }}</span>
            <span class="btn-pulse"></span>
          </button>
        </div>
      </div>
      
      <div v-if="error" role="alert" class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        {{ error }}
      </div>
    </div>
    
    <!-- Scroll indicator -->
    <div class="scroll-indicator">
      <div class="scroll-line">
        <div class="scroll-dot"></div>
      </div>
      <span class="scroll-text">Scroll to explore</span>
    </div>
  </section>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted, reactive, watch } from "vue";
import { useDataStore } from "@/stores";
import Typed from "typed.js";

export default defineComponent({
  name: "HeroSection",

  setup() {
    const typedTextRef = ref(null);
    const typedInstance = ref(null);
    const dataStore = useDataStore();
    const heroData = reactive({});
    const isLoading = ref(false);
    const error = ref(null);
    const isScrolled = ref(false);

    const updateScrollState = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        isScrolled.value = window.scrollY > 100;
      }
    };

    window.addEventListener('scroll', updateScrollState);

    const initTypedText = () => {
      if (!heroData.typedStrings?.length || !typedTextRef.value) return;

      if (typedInstance.value) {
        typedInstance.value.destroy();
      }

      typedInstance.value = new Typed(typedTextRef.value, {
        strings: heroData.typedStrings,
        typeSpeed: 60,
        backSpeed: 40,
        loop: true,
        cursorChar: '|',
        autoInsertCss: true,
        backDelay: 2000,
        onReset: (self) => {
          self.el.setAttribute('aria-label', `Current text: ${self.strings[self.arrayPos]}`);
        }
      });
    };

    const navigateTo = (id) => {
      const element = document.querySelector(id);
      if (element) {
        const offset = isScrolled.value ? 100 : 120;
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

    const handleImageError = () => {
      error.value = 'Failed to load hero image';
    };

    const initAnimations = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
    };

    const fetchHeroData = async () => {
      try {
        isLoading.value = true;
        await dataStore.initialize();
        const data = await dataStore.fetchDocument('hero', 'main');
        
        if (data) {
          Object.assign(heroData, data);
        } else {
          error.value = 'Hero data not found';
        }
      } catch (err) {
        error.value = err.message || 'Failed to load hero content';
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(async () => {
      await fetchHeroData();
      initAnimations();
      watch(() => heroData.typedStrings, initTypedText, { immediate: true });
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', updateScrollState);
      if (typedInstance.value) {
        typedInstance.value.destroy();
      }
    });

    return {
      typedTextRef,
      heroData,
      isLoading,
      error,
      navigateTo,
      handleImageError,
      isScrolled
    };
  }
});
</script>

<style scoped lang="scss">
@import "@/assets/colors.scss";

.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 150px 20px 100px;
  color: var(--text-light);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, var(--gradient-primary) 0%, transparent 50%);
    opacity: 0.1;
    animation: pulse-glow 8s ease-in-out infinite;
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(to top, rgba(15, 15, 26, 0.9), transparent);
    z-index: 0;
  }
  
  &.scrolled {
    padding: 100px 20px 80px;
  }
  
  &.loading {
    min-height: 100vh;
  }
}

.hero-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  opacity: 0;
  animation: fadeIn 1s ease forwards;
  animation-delay: 0.3s;
}

.hero-image {
  position: relative;
  width: 400px;
  height: 400px;
  
  @media (max-width: 991px) {
    width: 300px;
    height: 300px;
    order: 2;
  }
  
  .profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    position: relative;
    box-shadow: 
      0 0 0 8px rgba(255, 255, 255, 0.05),
      0 0 60px rgba(255, 123, 137, 0.3);
    animation: float 6s ease-in-out infinite;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &.fade-in {
      animation: scaleIn 0.8s ease forwards;
      animation-delay: 0.5s;
    }
  }
  
  .image-glow {
    position: absolute;
    inset: -20px;
    background: var(--gradient-primary);
    border-radius: 50%;
    filter: blur(40px);
    opacity: 0.4;
    animation: glow-pulse 4s ease-in-out infinite;
    z-index: -1;
  }
  
  .image-shine {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      125deg,
      transparent 30%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 70%
    );
    border-radius: 50%;
    animation: shine 3s ease-in-out infinite;
    z-index: 1;
    pointer-events: none;
  }
}

.hero-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.hero-text {
  margin-bottom: 40px;
  
  .subtitle {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--primary-color);
    margin-bottom: 15px;
    opacity: 0;
    transform: translateY(20px);
  }
  
  .title {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 20px;
    background: linear-gradient(135deg, #fff 0%, var(--text-light) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0;
    transform: translateY(20px);
    
    @media (max-width: 991px) {
      font-size: 2.5rem;
    }
  }
  
  .typed-text {
    font-family: 'Segoe UI', monospace;
    color: var(--secondary-color);
    font-size: 1.5rem;
    font-weight: 500;
    min-height: 1.5em;
    opacity: 0;
    transform: translateY(20px);
  }
}

.fade-in-up {
  opacity: 0;
  
  &.visible {
    animation: slideUpFade 0.8s ease forwards;
  }
}

.hero-btn {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  
  button {
    padding: 14px 32px;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border: none;
    position: relative;
    overflow: hidden;
    
    &.btn-primary {
      background: var(--primary-color);
      color: var(--dark-overlay);
      
      .btn-text {
        position: relative;
        z-index: 1;
      }
      
      .btn-pulse {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transition: width 0.6s ease, height 0.6s ease;
        z-index: 0;
      }
      
      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 30px rgba(255, 123, 137, 0.4);
        
        .btn-pulse {
          width: 300px;
          height: 300px;
        }
      }
    }
    
    &.btn-explore {
      background: transparent;
      color: var(--primary-color);
      border: 2px solid var(--primary-color);
      
      i {
        transition: transform 0.3s ease;
      }
      
      .btn-text {
        position: relative;
        z-index: 1;
      }
      
      &:hover {
        background: var(--primary-color);
        color: var(--dark-overlay);
        transform: translateY(-3px);
        box-shadow: 0 15px 30px rgba(255, 123, 137, 0.3);
        
        i {
          transform: translateX(5px);
        }
      }
    }
  }
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes glow-pulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.05); }
}

@keyframes shine {
  0% { left: -100%; }
  100% { left: 200%; }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.1; transform: scale(1); }
  50% { opacity: 0.15; transform: scale(1.1); }
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0;
  animation: fadeInRound 1s ease forwards;
  animation-delay: 1s;
  z-index: 1;
  
  .scroll-line {
    width: 60px;
    height: 60px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 2px solid var(--primary-color);
      animation: ripple 2s ease-out infinite;
    }
    
    .scroll-dot {
      width: 8px;
      height: 8px;
      background: var(--primary-color);
      border-radius: 50%;
      animation: scroll-bounce 2s ease-in-out infinite;
    }
  }
  
  .scroll-text {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
    text-transform: uppercase;
    letter-spacing: 2px;
  }
}

@keyframes ripple {
  0% {
    width: 100%;
    height: 1px;
    opacity: 1;
  }
  100% {
    width: 100%;
    height: 1px;
    opacity: 0;
  }
}

@keyframes scroll-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(10px); }
}

@keyframes fadeInRound {
  from { opacity: 0; transform: translateX(-50%) translateY(20px); }
  to { opacity: 1; transform: translateX(-50%) translateY(0); }
}

/* Error Message */
.error-message {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(239, 68, 68, 0.1);
  color: var(--danger-color);
  border: 1px solid rgba(239, 68, 68, 0.2);
  backdrop-filter: blur(10px);
  padding: 16px 24px;
  border-radius: 12px;
  font-size: 0.95rem;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Responsive */
@media (max-width: 991px) {
  .hero {
    padding-top: 100px;
  }
  
  .hero-container {
    flex-direction: column;
    text-align: center;
    gap: 40px;
  }
  
  .hero-image {
    width: 280px;
    height: 280px;
  }
  
  .hero-text {
    align-items: center;
    text-align: center;
  }
  
  .hero-btn {
    justify-content: center;
  }
  
  .scroll-indicator {
    bottom: 40px;
  }
}

@media (max-width: 576px) {
  .title {
    font-size: 2rem !important;
  }
  
  .subtitle {
    font-size: 1.1rem !important;
  }
  
  .typed-text {
    font-size: 1.2rem !important;
  }
  
  .hero-container {
    gap: 30px;
  }
}
</style>
