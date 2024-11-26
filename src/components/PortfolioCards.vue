<template>
  <section class="portfolio-section">
    <div class="container">
      <h2 class="section-title">My Portfolio</h2>
      <div class="row">
        <div v-for="(project, index) in projects" :key="index" class="col-md-4">
          <div class="card portfolio-card">
            <img :src="project.image" class="card-img-top" :alt="project.title" />
            <div class="card-body">
              <h5 class="card-title">{{ project.title }}</h5>
              <p class="card-text">{{ project.description }}</p>
              <a :href="project.link" target="_blank" class="btn btn-primary">View Project</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PortfolioCards",
  props: {
    projects: {
      type: Array,
      required: true,
      default: () => [
        {
          title: "Project One",
          description: "A brief description of the project.",
          image: "https://placehold.co/300x200",
          link: "#",
        },
        {
          title: "Project Two",
          description: "A brief description of the project.",
          image: "https://placehold.co/300x200",
          link: "#",
        },
        {
          title: "Project Three",
          description: "A brief description of the project.",
          image: "https://placehold.co/300x200",
          link: "#",
        },
      ],
    },
  },
};
</script>

<style scoped lang="scss">
.portfolio-section {
  padding: 60px 0;
  background-color: #130042b0;

  .section-title {
    text-align: center;
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 40px;
    color: aqua;
  }

  .portfolio-card {
    margin-bottom: 30px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: none;

    .card-img-top {
      height: 200px;
      object-fit: cover;
    }

    .card-title {
      font-size: 20px;
      font-weight: 600;
      color: #5161ce;
    }

    .card-text {
      font-size: 14px;
      color: #555;
    }

    .btn {
      background-color: #5161ce;
      border: none;

      &:hover {
        background-color: #3949ab;
      }
    }
  }
}
</style>
