<template>
  <section class="about-section">
  <meta name="description" content="Learn more about Gemechis Chala, a software developer with a mission to empower developers in Africa and beyond. Discover his journey, expertise, and contributions to the tech community.">
    <div class="container">
      <h2 class="section-title">About Me</h2>
      <div class="about-content">
        <div class="profile-picture-wrapper">
          <img v-lazy="require('@/assets/me-transparent.webp')" alt="Profile Picture" class="profile-picture" />
        </div>
        <div class="about-text">
          <p>
            Hi, I’m <strong>Gemechis Chala</strong>, aka <strong>@venopyX</strong>, a passionate software developer specializing in Python, AI, and blockchain technologies. With a mission to empower developers in Africa and beyond, I create impactful solutions and share knowledge through
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
  background: linear-gradient(135deg, colors.$hero-bg-gradient-overlay, colors.$hero-bg-gradient-end-overlay);
  color: colors.$text-color-light;
  font-family: 'Arial', sans-serif;
  text-align: center;

  .section-title {
    font-size: 38px;
    font-weight: 800;
    margin-bottom: 30px;
    color: colors.$primary-color;
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
      background: colors.$primary-color;
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
      font-size: 20px;
      transition: all 0.3s ease;
      text-decoration: none;

      &.linkedin {
        background-color: colors.$linkedin-color;

        &:hover {
          background-color: colors.$linkedin-color-hover;
        }
      }

      &.github {
        background-color: colors.$github-color;

        &:hover {
          background-color: colors.$github-color-hover;
        }
      }

      &.telegram {
        background-color: colors.$telegram-color;

        &:hover {
          background-color: colors.$telegram-color-hover;
        }
      }

      &.twitter {
        background-color: colors.$twitter-color;

        &:hover {
          background-color: colors.$twitter-color-hover;
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
