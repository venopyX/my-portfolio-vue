<template>
  <section class="about-section">
    <div class="container">
      <h2 class="section-title">About Me</h2>
      <div class="about-content">
        <div class="profile-picture-wrapper">
          <img :src="require('@/assets/me-transparent.png')" alt="Profile Picture" class="profile-picture" />
        </div>
        <div class="about-text">
          <p>
            Hi, I’m <strong>Gemechis Chala</strong>, a passionate software developer specializing in Python, AI, and blockchain technologies. With a mission to empower developers in Africa and beyond, I create impactful solutions and share knowledge through
            <a href="https://t.me/CodeTactics" target="_blank">@CodeTactics</a>.
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
        >
          <i :class="platform.icon"></i>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AboutMe",
  props: {
    socialMedia: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.about-section {
  padding: 80px 20px;
  background: linear-gradient(135deg, #0f1a5faa, #232e75aa);
  color: #fff;
  font-family: 'Arial', sans-serif;
  text-align: center;

  .section-title {
    font-size: 38px;
    font-weight: 800;
    margin-bottom: 30px;
    color: #00eaff;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: #00eaff;
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
      background: linear-gradient(135deg, #00fff6, #0f1a5f);
      border-radius: 50%;
      padding: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);

      .profile-picture {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      }
    }

    .about-text {
      max-width: 600px;
      font-size: 18px;
      line-height: 1.8;
      color: #e0e0e0;

      a {
        color: #00fff6;
        text-decoration: none;
        font-weight: bold;

        &:hover {
          text-decoration: underline;
          color: #f9f9f9;
        }
      }

      strong {
        font-weight: bold;
        color: #00fff6;
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
      color: #fff;
      font-size: 20px;
      transition: all 0.3s ease;
      text-decoration: none;

      &.linkedin {
        background-color: #0077b5;

        &:hover {
          background-color: #005983;
        }
      }

      &.github {
        background-color: #333;

        &:hover {
          background-color: #222;
        }
      }

      &.telegram {
        background-color: #0088cc;

        &:hover {
          background-color: #005f8c;
        }
      }

      &.twitter {
        background-color: #1da1f2;

        &:hover {
          background-color: #0d8de3;
        }
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
