<template>
  <section class="about-section">
    <meta name="description" content="Learn more about Gemechis Chala, a software developer with a mission to empower developers in Africa and beyond. Discover his journey, expertise, and contributions to the tech community.">
    <div class="container">
      <h2 class="section-title">About Me</h2>
      <div class="about-content">
        <div class="profile-picture-wrapper">
          <img v-lazy="profileData.image" alt="Profile Picture" class="profile-picture" />
        </div>
        <div class="about-text">
          <p>
            Hi, I’m <strong>Gemechis Chala</strong>, aka <strong>@venopyX</strong>, {{ profileData.description }}
          </p>
        </div>
      </div>
      <div class="social-media-icons">
        <a
          v-for="(platform, index) in socialMedia"
          :key="index"
          :href="platform.link"
          target="_blank"
          rel="noopener noreferrer"
          :class="['social-icon', platform.class]"
          :style="{ background: `linear-gradient(135deg, ${platform.colorCode} 0%, ${lightenColor(platform.colorCode, 20)} 100%)` }"
        >
          <i :class="platform.icon"></i>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import { useDataStore } from '@/stores';
import { onMounted, ref } from 'vue';

export default {
  name: "AboutMe",
  setup() {
    const dataStore = useDataStore();
    const profileData = ref({});
    const socialMedia = ref([]);

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
      return (usePound ? "#" : "") + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    };

    onMounted(async () => {
      try {
        profileData.value = await dataStore.fetchDocument('profile', 'main');
        const socialMediaData = await dataStore.fetchCollection('socialMedia', { orderBy: { field: 'order', direction: 'asc' } });

        socialMedia.value = socialMediaData.map(platform => {
          let colorCode = platform.class.match(/#\w+/);
          if (colorCode) {
            colorCode = colorCode[0];
          } else {
            colorCode = '#ffffff'; // Default color if no match is found
          }
          return {
            ...platform,
            colorCode
          };
        });
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    });

    return {
      profileData,
      socialMedia,
      lightenColor,
    };
  },
};
</script>

<style scoped lang="scss">
.about-section {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(50, 0, 0, 0.4));
  padding: 4rem 1rem;
  color: colors.$text-color-light;
  font-family: 'Arial', sans-serif;
  text-align: center;

  .section-title {
    text-align: center;
    font-size: 3rem;
    font-weight: 700;
    color: colors.$primary-color;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 50px;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 4px;
      background: colors.$primary-color;
      box-shadow: 0 0 8px colors.$primary-color, 0 0 15px colors.$primary-color;
      border-radius: 2px;
    }
  }

  .about-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    animation: fade-in 1s ease-in-out;

    .profile-picture-wrapper {
      width: 180px;
      height: 180px;
      background: linear-gradient(135deg, colors.$button-hover-bg, colors.$primary-dark);
      border-radius: 50%;
      padding: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 8px 20px colors.$box-shadow-color;

      .profile-picture {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
        box-shadow: 0 4px 15px colors.$box-shadow-color;
      }
    }

    .about-text {
      max-width: 600px;
      font-size: 18px;
      line-height: 1.8;
      color: colors.$blogs-page-text;

      a {
        color: colors.$button-hover-bg;
        text-decoration: none;
        font-weight: bold;

        &:hover {
          text-decoration: underline;
          color: colors.$white;
        }
      }

      strong {
        font-weight: bold;
        color: colors.$button-hover-bg;
      }
    }
  }

  .social-media-icons {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;

    .social-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      color: colors.$white;
      font-size: 24px;
      transition: all 0.3s ease;
      text-decoration: none;

      &:hover {
        filter: brightness(1.2);
      }
    }
  }
}

/* Animations */
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
