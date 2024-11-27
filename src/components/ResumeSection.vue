<template>
  <section class="resume-section">
    <div class="container">
      <h2 class="section-title">Resume</h2>
      <p class="resume-intro">
        Want to know more about my background and skills? Download my complete resume or view the highlights below.
      </p>
      <div class="resume-actions">
        <a :href="resumeLink" download target="_blank" class="btn btn-primary">Download Resume</a>
      </div>
      <div class="resume-highlights">
        <h3 class="highlights-title">Highlights</h3>
        <ul>
          <li v-for="(highlight, index) in highlights" :key="index">{{ highlight }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ResumeSection",
  props: {
    resumeLink: {
      type: String,
      required: true,
      default: "https://raw.githubusercontent.com/venopyX/my-portfolio-raw-datas/refs/heads/main/resume.pdf",
    },
    highlights: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.resume-section {
  padding: 60px 0;
  background-color: #330042b0;

  .section-title {
    text-align: center;
    font-size: 38px;
    font-weight: 800;
    margin-bottom: 50px;
    color: #00eaff;
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
      background: #00eaff;
      border-radius: 2px;
    }
  }


  .resume-intro {
    text-align: center;
    font-size: 16px;
    color: #fff;
    margin-bottom: 30px;
  }

  .resume-actions {
    text-align: center;
    margin-bottom: 40px;

    .btn {
      background-color: #5161ce;
      color: #fff;
      padding: 10px 20px;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 600;
      text-decoration: none;

      &:hover {
        background-color: #3949ab;
        text-decoration: none;
      }
    }
  }

  .resume-highlights {
    max-width: 700px;
    margin: 0 auto;
    text-align: left;

    .highlights-title {
      font-size: 24px;
      font-weight: 700;
      color: aqua;
      margin-bottom: 15px;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        font-size: 16px;
        line-height: 1.8;
        color: #fff;
        margin-bottom: 10px;
        position: relative;
        padding-left: 25px;

        &:before {
          content: "•";
          color: #5161ce;
          position: absolute;
          left: 0;
          top: 5px;
        }
      }
    }
  }
}
</style>
