<template>
  <section class="hero">
    <div class="hero-container">
      <div class="hero-image">
      <!-- <img src="https://placehold.co/300x350" alt="Hero Image" /> -->
        <img :src="require('@/assets/me-hero.png')" alt="Hero Image" />
      </div>
      <div class="hero-content">
        <div class="hero-text">
          <p>Welcome to My Portfolio</p>
          <h1>Gemechis Chala</h1>
          <h2><span id="typed-text"></span></h2>
        </div>
        <div class="hero-btn">
          <button class="btn-more btn" @click="navigateTo('#services')">Explore</button>
          <button class="btn-primary" @click="navigateTo('#contact')">Contact</button>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { onMounted } from 'vue';
import Typed from 'typed.js';

export default {
  name: "HeroSection",
  props: {
    typedStrings: {
      type: Array,
      default: () => [
        'Web Designer',
        'Web Developer',
        'Front-End Developer',
        'App Designer',
        'App Developer',
      ],
    },
  },
  setup(props) {
    const navigateTo = (id) => {
      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    onMounted(() => {
      new Typed('#typed-text', {
        strings: props.typedStrings,
        typeSpeed: 60,
        backSpeed: 40,
        loop: true,
      });
    });

    return { navigateTo };
  },
};
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
    background: #00e7ff;
    color: #130042;
    border: none;
}

button.btn-primary:hover {
    background: transparent;
    color: #00e7ff;
    border: 2px solid #00e7ff;
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
</style>
