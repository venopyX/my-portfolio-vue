<template>
  <section class="testimonials-section">
    <meta name="description" content="Read testimonials from satisfied clients and collaborators who have worked with Gemechis Chala. Their experiences highlight his professionalism, expertise, and dedication to delivering high-quality solutions.">
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
import { useDataStore } from '@/stores';
import { onMounted, ref } from 'vue';

export default {
  name: 'TestimonialsSection',
  setup() {
    const dataStore = useDataStore();
    const testimonials = ref([]);

    const fetchTestimonials = async () => {
      try {
        testimonials.value = await dataStore.fetchCollection('testimonials');
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      }
    };

    onMounted(fetchTestimonials);

    return {
      testimonials,
    };
  },
};
</script>

<style scoped lang="scss">
.testimonials-section {
  background: linear-gradient(135deg, rgba(30, 10, 10, 0.4), rgba(60, 30, 20, 0.3));
  padding: 4rem 1rem;
  color: #ffffff;

  .section-title {
    text-align: center;
    font-size: 3rem;
    font-weight: 700;
    color: #ff6f61;
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
      background: #ff6f61;
      box-shadow: 0 0 8px rgba(255, 111, 97, 0.6), 0 0 15px rgba(255, 111, 97, 0.8);
      border-radius: 2px;
    }
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
  }

  .testimonial-card {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 2rem;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    &:hover {
      transform: translateY(-5px) scale(1.03);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
    }

    .testimonial-text {
      font-size: 1rem;
      line-height: 1.6;
      font-style: italic;
      margin-bottom: 1.5rem;
      color: rgba(255, 255, 255, 0.85);
    }

    .testimonial-author {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;

      .author-image {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
        transition: transform 0.3s ease;

        &:hover {
          transform: scale(1.1);
        }
      }

      .author-info {
        text-align: left;

        .author-name {
          font-size: 1.2rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          text-transform: capitalize;
          margin-bottom: 0.2rem;
        }

        .author-title {
          font-size: 0.9rem;
          font-weight: 500;
          color: #ff6f61;
        }
      }
    }
  }
}

/* Responsive Adjustments */
@media (max-width: 991px) {
  .testimonials-section {
    padding: 3rem 1.5rem;
  }

  .testimonial-card {
    padding: 1.5rem;
  }

  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 767px) {
  .testimonial-card {
    padding: 1.2rem;
  }

  .testimonial-text {
    font-size: 0.95rem;
  }

  .section-title {
    font-size: 1.8rem;
  }
}
</style>
