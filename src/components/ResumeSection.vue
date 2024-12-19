<template>
  <section class="resume-section">
    <meta name="description" content="Download the complete resume of Gemechis Chala to learn more about his background, skills, and professional experience. Explore his journey and achievements in the tech industry.">
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
          <li v-for="(highlight, index) in highlights" :key="index">{{ highlight.text }}</li>
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
  padding: 80px 20px;
  background: linear-gradient(135deg, rgba(50, 0, 70, 0.8), rgba(30, 0, 50, 0.8));
  color: #ffffff;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }

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

  .resume-intro {
    font-size: 1.2rem;
    color: #e0e0e0;
    margin-bottom: 40px;
  }

  .resume-actions {
    .btn {
      display: inline-block;
      padding: 12px 30px;
      font-size: 1rem;
      font-weight: 600;
      color: #ffffff;
      background: #ff6f61;
      border: none;
      border-radius: 30px;
      text-transform: uppercase;
      text-decoration: none;
      box-shadow: 0 8px 20px rgba(255, 111, 97, 0.5);
      transition: background 0.3s ease, transform 0.2s ease;

      &:hover {
        background: #e5584b;
        transform: translateY(-2px);
      }

      &:focus {
        outline: 2px solid #ffffff;
      }
    }
  }

  .resume-highlights {
    margin-top: 50px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    text-align: left;

    .highlights-title {
      font-size: 1.8rem;
      font-weight: 600;
      color: #ff6f61;
      margin-bottom: 20px;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        font-size: 1.1rem;
        line-height: 1.8;
        color: #e0e0e0;
        position: relative;
        padding-left: 30px;
        margin-bottom: 15px;

        &:before {
          content: "✓";
          position: absolute;
          left: 0;
          top: 0;
          font-size: 1.2rem;
          color: #ff6f61;
        }

        &:hover {
          color: #ffffff;
          transform: translateX(5px);
          transition: transform 0.3s ease, color 0.3s ease;
        }
      }
    }
  }

  /* Responsive Design */
  @media (max-width: 991px) {
    .section-title {
      font-size: 2.2rem;
    }

    .resume-intro {
      font-size: 1rem;
    }

    .resume-highlights {
      padding: 30px;
    }

    .highlights-title {
      font-size: 1.6rem;
    }

    .btn {
      padding: 10px 20px;
      font-size: 0.9rem;
    }
  }

  @media (max-width: 767px) {
    .resume-section {
      padding: 50px 10px;
    }

    .section-title {
      font-size: 2rem;
    }

    .resume-intro {
      font-size: 0.9rem;
    }

    .resume-highlights {
      padding: 20px;
    }

    .highlights-title {
      font-size: 1.4rem;
    }
  }
}
</style>
