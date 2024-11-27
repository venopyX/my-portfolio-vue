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
          @mouseleave="handleMouseLeave"
        >
          <div class="card-front">
            <img :src="project.image" :alt="project.title" class="portfolio-card-img" />
            <div class="portfolio-card-body">
              <h5 class="portfolio-card-title">{{ project.title }}</h5>
              <p class="portfolio-card-description">{{ project.description }}</p>
              <button @click="goToProject(project.link)" class="btn-primary">
                View Project
              </button>
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
      window.open(link, "_blank");
    },
    handleMouseMove(event) {
      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const xPercentage = (x / rect.width) * 2 - 1;
      const yPercentage = (y / rect.height) * 2 - 1;

      card.style.transform = `perspective(1200px) rotateX(${yPercentage * 8}deg) rotateY(${
        xPercentage * -8
      }deg)`;
    },
    handleMouseLeave(event) {
      const card = event.currentTarget;
      card.style.transform = "perspective(1200px) rotateX(0) rotateY(0)";
    },
  },
};
</script>

<style scoped lang="scss">
.portfolio-section {
  padding: 80px 20px;
  background: linear-gradient(135deg, #1a1a2e55, #16213e55);
  overflow: hidden;

  .section-title {
    text-align: center;
    font-size: 3rem;
    font-weight: 700;
    color: #00eaff;
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
      background: #00eaff;
      box-shadow: 0 0 8px #00eaff, 0 0 15px #00eaff;
      border-radius: 2px;
    }
  }

  .portfolio-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
  }

  .portfolio-card {
    position: relative;
    width: 100%;
    max-width: 300px;
    background: #131324;
    border-radius: 15px;
    overflow: hidden;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
    transform-style: preserve-3d;
    border: 2px solid #00eaff;
    background-clip: padding-box;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);

    &:hover {
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5), 0 0 15px #00eaff;
    }

    &:hover .portfolio-card-title {
      color: #00eaff;
      text-shadow: 0 0 8px #00eaff, 0 0 16px #00eaff;
    }

    &:hover .portfolio-card-img {
      transform: scale(1.15);
      filter: brightness(1.2);
    }

    &:hover .btn-primary {
      background: #00eaff;
      color: #131324; 
      box-shadow: 0 0 10px #00eaff, 0 0 20px #00eaff;
    }

    .card-front {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .portfolio-card-img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      transition: transform 0.4s ease, filter 0.4s ease;
    }

    .portfolio-card-body {
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 220px;
    }

    .portfolio-card-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #fff;
      margin-bottom: 10px;
      text-transform: capitalize;
      transition: color 0.3s ease, text-shadow 0.3s ease;
    }

    .portfolio-card-description {
      font-size: 1rem;
      color: #ddd;
      line-height: 1.6;
      margin-bottom: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3; /* Limit description to 3 lines */
      -webkit-box-orient: vertical;
    }

    .btn-primary {
      padding: 10px 20px;
      font-size: 1rem;
      font-weight: 600;
      text-transform: uppercase;
      border: 2px solid #00eaff;
      background: #00eaff;
      color: #131324; /* Ensure visibility */
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.4s ease;
      margin-top: 10px; /* Ensure space between description and button */
      align-self: center;

      &:hover {
        background: #00eaff; /* Keep the same color as normal */
        color: #131324;
        box-shadow: 0 0 10px #00eaff, 0 0 20px #00eaff;
      }
    }
  }

  @media (max-width: 991px) {
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
