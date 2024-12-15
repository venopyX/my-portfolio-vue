<template>
  <section class="testimonials-section">
    <div class="container">
      <h2 class="section-title">Testimonials</h2>
      <div class="row">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="col-md-4"
        >
          <div class="testimonial-card">
            <p class="testimonial-text">"{{ testimonial.text }}"</p>
            <div class="testimonial-author">
              <img
                v-lazy="testimonial.image"
                alt="Author Image"
                class="author-image"
              />
              <div class="author-info">
                <h5 class="author-name">{{ testimonial.name }}</h5>
                <p class="author-title">{{ testimonial.title }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TestimonialsSection",
  props: {
    testimonials: {
      type: Array,
      required: true,
    },
  },
};
</script>


<style scoped lang="scss">
.testimonials-section {
  padding: 80px 0;
  background-color: colors.$testimonial-bg;
  color: colors.$text-color-light;

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

  .testimonial-card {
    background-color: colors.$testimonial-card-bg;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 10px 30px colors.$box-shadow-color;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    text-align: center;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: colors.$text-color-light;

    &:hover {
      transform: translateY(-10px) scale(1.05);
      box-shadow: 0 15px 35px colors.$box-shadow-color;
    }

    .testimonial-text {
      font-size: 18px;
      line-height: 1.8;
      font-style: italic;
      margin-bottom: 20px;
      color: colors.$text-color-light;
    }

    .testimonial-author {
      display: flex;
      align-items: center;
      justify-content: center;

      .author-image {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin-right: 15px;
        object-fit: cover;
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.1);
        }
      }

      .author-info {
        text-align: left;

        .author-name {
          font-size: 20px;
          font-weight: 700;
          color: colors.$text-color-light;
          text-transform: capitalize;
          margin-bottom: 5px;
          transition: color 0.3s ease;
        }

        .author-title {
          font-size: 14px;
          color: colors.$button-bg;
          font-weight: 600;
        }
      }
    }
  }

  /* Adding a smooth background color change effect */
  .testimonial-card:hover {
    background: linear-gradient(90deg, colors.$testimonial-hover-gradient-start, colors.$testimonial-hover-gradient-end);
  }
}

@media (max-width: 991px) {
  .testimonials-section {
    padding: 60px 20px;
  }
}

@media (max-width: 767px) {
  .testimonial-card {
    padding: 20px;
  }
}
</style>
