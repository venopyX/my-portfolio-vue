<template>
  <section class="social-media-section">
    <div class="container">
      <h2 class="section-title">Connect with Me</h2>
      <p class="social-media-intro">
        Follow me on social media to stay updated with my latest work and insights.
      </p>
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
  name: "SocialMediaSection",
  props: {
    socialMedia: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.social-media-section {
  padding: 60px 0;
  background-color: #130042b0;

  .section-title {
    text-align: center;
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 20px;
    color: aqua;
  }

  .social-media-intro {
    text-align: center;
    font-size: 16px;
    color: #555;
    margin-bottom: 30px;
  }

  .social-media-icons {
    display: flex;
    justify-content: center;
    gap: 20px;

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
</style>
