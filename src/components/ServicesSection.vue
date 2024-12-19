<template>
  <section class="services-section">
    <meta name="description" content="Discover the range of services offered by Gemechis Chala. Explore innovative web development, AI integration, blockchain solutions, and more to empower your projects.">
    <div class="container">
      <h2 class="section-title">My Services</h2>
      <div class="services-grid">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="service-card"
          :aria-label="`Service card: ${service.title}`"
        >
          <div class="service-icon">
            <i :class="service.icon" aria-hidden="true"></i>
          </div>
          <h5 class="service-title">{{ service.title }}</h5>
          <p class="service-description">{{ service.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ServicesSection",
  props: {
    services: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
$primary-color: #ff7b89;

.services-section {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(50, 0, 0, 0.4));
  padding: 4rem 1rem;

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


  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }

  .service-card {
    background: linear-gradient(145deg, rgba(70, 51, 51, 0.6), rgba(78, 68, 68, 0.4));
    border-radius: 15px;
    padding: 2rem;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-align: center;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
    }

    .service-icon {
      font-size: 3rem;
      color: #cccccc;
      margin-bottom: 1.5rem;
      transition: color 0.3s ease;

      &:hover {
        color: $primary-color;
      }
    }

    .service-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 1rem;
      text-transform: capitalize;

      &:hover {
        color: $primary-color;
      }
    }

    .service-description {
      font-size: 1rem;
      color: #aaaaaa;
      line-height: 1.6;
    }
  }
}
</style>
