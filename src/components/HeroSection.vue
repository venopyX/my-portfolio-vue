<template>
  <section class="hero">
    <div class="container-fluid">
      <div class="row">
        <!-- Hero Image -->
        <div class="col-md-6 hero-image">
          <img src="https://placehold.co/300x350" alt="Hero Image" />
        </div>
        <!-- Hero Content -->
        <div class="col-md-6 hero-content">
          <div class="hero-text">
            <p>Welcome to My Portfolio</p>
            <h1>Gemechis Chala</h1>
            <h2><span id="typed-text"></span></h2>
          </div>
          <div class="hero-btn">
            <button class="btn btn-primary" onclick="window.location.href='#services'">Explore</button>
            <button class="btn btn-secondary" onclick="window.location.href='#contact'">Contact</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted } from 'vue';
import Typed from 'typed.js';

export default {
  name: "HeroSection",
  setup() {
    onMounted(() => {
      new Typed('#typed-text', {
        strings: ['Web Designer', 'Web Developer', 'FrontEnd Developer', 'Apps Designer', 'Apps Developer'],
        typeSpeed: 50,
        backSpeed: 50,
        loop: true
      });
    });
  }
};
</script>

<style scoped lang="scss">
.hero {
  position: relative;
  width: 100%;
  margin-bottom: 45px;
  padding: 120px 0 0;
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .container-fluid {
    padding: 0;
  }

  .hero-image {
    position: relative;
    text-align: right;
    padding-right: 75px;

    img {
      max-width: 80%;
      max-height: 80%;
    }
  }

  .hero-content {
    position: relative;
    padding-left: 75px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;

    .hero-text {
      p {
        color: #ffffff;
        font-size: 25px;
        font-weight: 600;
        margin-bottom: 15px;
      }

      h1 {
        color: aqua;
        font-size: 60px;
        font-weight: 700;
        letter-spacing: 3px;
        margin-bottom: 15px;
      }

      h2 {
        color: #ffffff;
        font-size: 35px;
        font-weight: 600;
      }
    }

    .hero-btn {
      margin-left: 10rem;

      .btn {
        margin-top: 35px;
        color: #3723ef;
        font-weight: bold;
        background: #ffffff;
        box-shadow: inset 0 0 0 50px #ffffff;
        width: 160px;

        &:hover {
          color: #ffffff;
          background: transparent;
          box-shadow: inset 0 0 0 0 #ffffff;
          border-color: #ffffff;
        }
      }

      .btn:first-child {
        margin-right: 10px;
      }
    }
  }
}

@media (max-width: 991.98px) {
  .hero {
    padding-top: 60px;

    .hero-content {
      padding: 0 15px;
    }

    .hero-text {
      p {
        font-size: 20px;
      }
      h1 {
        font-size: 45px;
      }
      h2 {
        font-size: 25px;
      }
    }

    .hero-btn .btn {
      padding: 12px 30px;
      letter-spacing: 1px;
    }

    .hero-btn {
      margin-left: 5px;
    }
  }
}

@media (max-width: 767.98px) {
  .hero {
    padding-top: 60px;
    padding-bottom: 60px;

    .hero-btn {
      margin-left: 3px;
    }

    .hero,
    .hero-text,
    .hero-btn {
      width: 100%;
      text-align: center;
    }

    .hero-text {
      p {
        font-size: 18px;
      }
      h1 {
        font-size: 35px;
      }
      h2 {
        font-size: 22px;
      }
    }

    .hero-btn .btn {
      padding: 10px 15px;
      letter-spacing: 1px;
    }
  }
}

@media (max-width: 575.98px) {
  .hero-image {
    display: none;
  }
}
</style>
