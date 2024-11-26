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
                :src="testimonial.image"
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
      default: () => [
        {
          text: "Gemechis was fantastic to work with. His expertise in Python and AI made our project a success.",
          name: "John Doe",
          title: "Tech Lead, XYZ Corp",
          image: "https://placehold.co/100x100",
        },
        {
          text: "An exceptional developer with a keen eye for detail. Highly recommended!",
          name: "Jane Smith",
          title: "Freelance Designer",
          image: "https://placehold.co/100x100",
        },
        {
          text: "Gemechis's dedication to teaching and development is unmatched. A true innovator.",
          name: "Michael Brown",
          title: "Founder, InnovateHub",
          image: "https://placehold.co/100x100",
        },
      ],
    },
  },
};
</script>

<style scoped lang="scss">
.testimonials-section {
  padding: 60px 0;
  background-color: #130042b0;

  .section-title {
    text-align: center;
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 40px;
    color: aqua;
  }

  .testimonial-card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;

    .testimonial-text {
      font-size: 16px;
      line-height: 1.8;
      color: #555;
      margin-bottom: 20px;
      font-style: italic;
    }

    .testimonial-author {
      display: flex;
      align-items: center;
      justify-content: center;

      .author-image {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 15px;
        object-fit: cover;
      }

      .author-info {
        .author-name {
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }

        .author-title {
          font-size: 14px;
          color: #777;
        }
      }
    }
  }
}
</style>
