<template>
  <section class="hero" :class="{ 'loading': isLoading }">
    <div class="hero-container">
      <div class="hero-image" v-if="heroData">
        <img
          v-if="heroData.image"
          :src="heroData.image"
          :alt="heroData.imageAlt"
          :width="350"
          :height="350"
          loading="eager"
          @error="handleImageError"
        />
      </div>
      <div class="hero-content" v-if="heroData">
        <div class="hero-text">
          <p v-if="heroData.title">{{ heroData.title }}</p>
          <h1 v-if="heroData.subtitle">{{ heroData.subtitle }}</h1>
          <h2><span ref="typedTextRef" class="typed-text"></span></h2>
        </div>
        <div class="hero-btn" v-if="heroData.exploreLink || heroData.contactLink">
          <button
            v-if="heroData.exploreLink"
            class="btn-more btn"
            @click="navigateTo(heroData.exploreLink)"
            :aria-label="heroData.exploreText"
          >
            {{ heroData.exploreText }}
          </button>
          <button
            v-if="heroData.contactLink"
            class="btn-primary"
            @click="navigateTo(heroData.contactLink)"
            :aria-label="heroData.contactText"
          >
            {{ heroData.contactText }}
          </button>
        </div>
      </div>
      <div v-if="error" role="alert" class="error-message">
        {{ error }}
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted, reactive, watch } from 'vue';
import { useDataStore } from '@/stores';
import Typed from 'typed.js';

export default defineComponent({
  name: "HeroSection",

  setup() {
    const typedTextRef = ref(null);
    const typedInstance = ref(null);
    const dataStore = useDataStore();
    const heroData = reactive({});

    const isLoading = ref(false);
    const error = ref(null);

    // Watch for store loading and error states
    const operation = 'fetch_hero_main';
    watch(
      () => dataStore.isLoading(operation),
      (loading) => { isLoading.value = loading; }
    );
    watch(
      () => dataStore.getError(operation),
      (err) => { error.value = err; }
    );

    const fetchHeroData = async () => {
      try {
        await dataStore.initialize();
        const data = await dataStore.fetchDocument('hero', 'main');
        console.log('Fetched hero data:', data);
        if (data) {
          Object.assign(heroData, data);
        } else {
          error.value = 'Hero data not found';
        }
      } catch (err) {
        error.value = err.message || 'Failed to load hero content';
        console.error('Error fetching hero data:', err);
      }
    };

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
        onReset: (self) => {
          self.el.setAttribute('aria-label', `Current text: ${self.strings[self.arrayPos]}`);
        }
      });
    };

    const navigateTo = (id) => {
      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    const handleImageError = () => {
      error.value = 'Failed to load hero image';
    };

    onMounted(async () => {
      await fetchHeroData();
      watch(() => heroData.typedStrings, initTypedText, { immediate: true });
    });

    onUnmounted(() => {
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
      handleImageError
    };
  }
});
</script>

<style scoped lang="scss">
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 20px;
  color: colors.$text-color-light;

  .hero-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;

    .hero-image {
      flex: 1;
      display: flex;
      justify-content: center;
      padding: 10px;

      img {
        width: 80%;
        max-width: 350px;
        object-fit: cover;
        border-radius: 12px;
        box-shadow: 0 4px 10px colors.$box-shadow-color;
      }
    }

    .hero-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 10px;

      .hero-text {
        margin-bottom: 20px;

        p {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        h1 {
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 10px;
          color: colors.$primary-color;
        }

        h2 {
          font-size: 28px;
          color: colors.$text-color-light;
        }
      }

      .hero-btn {
        display: flex;
        gap: 20px;

        button {
          padding: 10px 20px;
          font-size: 16px;
          font-weight: bold;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
      }
    }
  }
}

button {
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
}

button.btn-primary {
    background: colors.$primary-color;
    color: #130042;
    border: none;
}

button.btn-primary:hover {
    background: transparent;
    color: colors.$primary-color;
    border: 2px solid colors.$primary-color;
}

button.btn-secondary {
    background: transparent;
    color: #ffffff;
    border: 2px solid #ffffff;
}

button.btn-secondary:hover {
    background: #ffffff;
    color: #130042;
}

/* Media Queries */
@media (max-width: 991px) {
  .hero-container {
    flex-direction: column;
    text-align: center;

    .hero-image {
      padding-bottom: 20px;
    }

    .hero-content {
      align-items: center;

      .hero-btn {
        justify-content: center;
      }
    }
  }
}

@media (max-width: 575px) {
  .hero-content .hero-text h1 {
    font-size: 36px;
  }
  .hero-content .hero-text h2 {
    font-size: 24px;
  }
}

.error-message {
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: #ff5555;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  z-index: 10;
}


.typed-text {
  font-family: 'Roboto', sans-serif;
  color: #ffe5d8;
  font-size: 24px;
}
</style>
