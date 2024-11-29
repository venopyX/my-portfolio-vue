<template>
  <section class="services-section">
    <div class="container">
      <h2 class="section-title">My Services</h2>
      <div class="row">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="col-md-6 col-lg-4 mb-4"
        >
          <div class="service-card">
            <div class="service-icon">
              <i :class="service.icon"></i>
            </div>
            <h5 class="service-title">{{ service.title }}</h5>
            <p class="service-description">{{ service.description }}</p>
          </div>
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
.services-section {
  background: linear-gradient(135deg, colors.$services-section-bg-start, colors.$services-section-bg-end);
  padding: 60px 20px;

  .section-title {
    text-align: center;
    font-size: 38px;
    font-weight: 800;
    margin-bottom: 50px;
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

  .service-card {
    background: linear-gradient(145deg, colors.$services-card-start, colors.$services-card-end);
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25), inset 0 0 20px rgba(0, 0, 0, 0.5);
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    text-align: center;
    color: #fff;
    flex: 0 1 calc(33.333% - 30px); /* Ensures 3 columns by default */
    min-width: 300px; /* Consistent size for cards */
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 15px colors.$primary-color;
    }

    .service-icon {
      font-size: 50px;
      color: colors.$primary-color;
      margin-bottom: 25px;
      transition: transform 0.4s ease, color 0.4s ease;

      &:hover {
        color: #fff;
        transform: scale(1.2);
      }
    }

    .service-title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 20px;
      color: #fff;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      transition: color 0.4s ease;

      &:hover {
        color: colors.$primary-color;
      }
    }

    .service-description {
      font-size: 16px;
      color: colors.$blogs-page-text;
      line-height: 1.8;
      transition: color 0.4s ease;

      &:hover {
        color: #fff;
      }
    }
  }
}

@media (max-width: 768px) {
  .service-card {
    padding: 15px;

    .service-icon {
      font-size: 2.5rem;
    }

    .service-title {
      font-size: 1.1rem;
    }

    .service-description {
      font-size: 0.95rem;
    }
  }

  .section-title {
    font-size: 1.75rem;
  }
}
</style>
