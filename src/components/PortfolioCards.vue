<template>
  <section class="portfolio-section">
    <div class="container">
      <h2 class="section-title">My Projects</h2>
      <div class="portfolio-cards">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="portfolio-card"
          @mousemove="handleMouseMove"
          @mouseleave="handleMouseLeave">
          <div class="card-front">
            <img :src="project.image" :alt="project.title" class="portfolio-card-img" />
            <div class="portfolio-card-body">
              <h5 class="portfolio-card-title">{{ project.title }}</h5>
              <p class="portfolio-card-description">{{ project.description }}</p>
              <button @click="goToProject(project.link)" class="btn-primary">View Project</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ProjectsSection",
  props: {
    projects: {
      type: Array,
      required: true,
    },
  },
  methods: {
    goToProject(link) {
      window.open(link, '_blank');
    },
    handleMouseMove(event) {
      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Normalize mouse position to the range [-1, 1]
      const xPercentage = (x / rect.width) * 2 - 1;
      const yPercentage = (y / rect.height) * 2 - 1;

      // Apply transform based on mouse position
      card.style.transform = `perspective(1000px) rotateX(${yPercentage * 10}deg) rotateY(${xPercentage * -10}deg)`;
    },
    handleMouseLeave(event) {
      const card = event.currentTarget;
      // Reset transform when mouse leaves the card
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    }
  }
};
</script>

<style scoped lang="scss">
.portfolio-section {
  padding: 80px 20px;
  background-color: #130042b0;

  .section-title {
    text-align: center;
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 40px;
    color: aqua;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .portfolio-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  .portfolio-card {
    position: relative;
    width: 100%;
    max-width: 320px;
    border: 2px solid #fff;
    border-radius: 8px;
    overflow: hidden;
    background-color: #1e1738;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
    transform-style: preserve-3d;
    transform: perspective(1000px);

    /* Ensuring the card doesn't flip */
    .card-front {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }

    .portfolio-card-img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .portfolio-card-body {
      padding: 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 160px;
      position: relative;
    }

    .portfolio-card-title {
      font-size: 20px;
      font-weight: 600;
      color: #fff;
      margin-bottom: 10px;
      text-transform: capitalize;
      transition: color 0.3s ease, text-shadow 0.3s ease;
    }

    .portfolio-card-description {
      font-size: 14px;
      color: #ddd;
      flex-grow: 1;
      margin-bottom: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: color 0.3s ease;
    }

    .btn-primary {
      background-color: transparent;
      color: #5161ce;
      padding: 10px 20px;
      font-weight: bold;
      border: 2px solid #5161ce;
      border-radius: 5px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      letter-spacing: 1px;
      margin-top: auto;

      &:hover {
        color: #fff;
        background-color: #5161ce;
        border-color: #3949ab;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      }
    }
  }

  /* Neon Glow Effect */
  .portfolio-card:hover .portfolio-card-title {
    color: #00eaff;
    text-shadow: 0 0 6px #00eaff, 0 0 15px #00eaff;
  }

  /* Hover Shadow Effect */
  .portfolio-card:hover {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  }

  /* Image Zoom on Hover */
  .portfolio-card:hover .portfolio-card-img {
    transform: scale(1.1);
  }

  /* Responsive Design */
  @media (max-width: 991px) {
    .portfolio-cards {
      justify-content: center;
    }

    .portfolio-card {
      max-width: 45%;
    }
  }

  @media (max-width: 767px) {
    .portfolio-card {
      max-width: 100%;
    }
  }
}
</style>
