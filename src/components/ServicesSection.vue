<template>
  <section class="services-section">
    <div class="container">
      <h2 class="section-title">My Services</h2>
      <div class="row">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="col-md-4"
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
  padding: 60px 0;
  background-color: #433072b0;

  .section-title {
    text-align: center;
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 40px;
    color: aqua;
  }

  .service-card {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;

    .service-icon {
      font-size: 36px;
      color: #5161ce;
      margin-bottom: 15px;
    }

    .service-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 10px;
    }

    .service-description {
      font-size: 14px;
      color: #555;
    }
  }
}
</style>
