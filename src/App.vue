<template>
  <div>
    <div id="fireflies-container"></div>
    <div id="cursor"></div>
    <NavBar />
    <section id="home" class="content-section">
      <HeroSection />
    </section>
    <section id="about" class="content-section">
      <AboutMe :socialMedia="socialMedia" />
    </section>
    <section id="portfolio" class="content-section">
      <PortfolioCards :projects="projects" />
    </section>
    <section id="services" class="content-section">
      <ServicesSection :services="services" />
    </section>
    <section id="testimonials" class="content-section">
      <TestimonialsSection :testimonials="testimonials" />
    </section>
    <section id="blog" class="content-section">
      <BlogSection :blogPosts="blogPosts" />
    </section>
    <section id="resume" class="content-section">
      <ResumeSection :resumeLink="resumeLink" :highlights="highlights" />
    </section>
    <section id="contact" class="content-section">
      <ContactForm />
    </section>
  </div>
</template>

<script>
/* eslint-disable */
import { nextTick } from 'vue';
import NavBar from "./components/NavBar.vue";
import HeroSection from "./components/HeroSection.vue";
import AboutMe from "./components/AboutMe.vue";
import PortfolioCards from "./components/PortfolioCards.vue";
import ServicesSection from "./components/ServicesSection.vue";
import TestimonialsSection from "./components/TestimonialsSection.vue";
import BlogSection from "./components/BlogSection.vue";
import ResumeSection from "./components/ResumeSection.vue";
import ContactForm from "./components/ContactForm.vue";

export default {
  name: "App",
  components: {
    NavBar,
    HeroSection,
    AboutMe,
    PortfolioCards,
    ServicesSection,
    TestimonialsSection,
    BlogSection,
    ResumeSection,
    ContactForm,
  },
  data() {
    return {
      projects: [],
      services: [],
      testimonials: [],
      blogPosts: [],
      socialMedia: [],
      resumeLink: "https://raw.githubusercontent.com/venopyX/my-portfolio-raw-datas/refs/heads/main/resume.pdf", // Replace with the actual resume link
      highlights: [],
    };
  },
  methods: {
    async fetchData(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Failed to fetch data:', error);
        return [];
      }
    },
    async loadData() {
      this.projects = await this.fetchData('https://raw.githubusercontent.com/venopyX/my-portfolio-raw-datas/refs/heads/main/projects.json');
      this.services = await this.fetchData('https://raw.githubusercontent.com/venopyX/my-portfolio-raw-datas/refs/heads/main/services.json');
      this.testimonials = await this.fetchData('https://raw.githubusercontent.com/venopyX/my-portfolio-raw-datas/refs/heads/main/testimonials.json');
      this.blogPosts = await this.fetchData('https://raw.githubusercontent.com/venopyX/my-portfolio-raw-datas/refs/heads/main/blogPosts.json');
      this.socialMedia = await this.fetchData('https://raw.githubusercontent.com/venopyX/my-portfolio-raw-datas/refs/heads/main/socialMedia.json');
      this.highlights = await this.fetchData('https://raw.githubusercontent.com/venopyX/my-portfolio-raw-datas/refs/heads/main/highlights.json');
    },
  },
  mounted() {
    nextTick(() => {
      // Cursor Movement
      const cursor = document.getElementById('cursor');
      if (cursor) {
        document.addEventListener('mousemove', (e) => {
          const cursorSize = 400; // Set the size of the cursor
          cursor.style.top = e.pageY - cursorSize / 2 + 'px'; // Center the cursor vertically
          cursor.style.left = e.pageX - cursorSize / 2 + 'px'; // Center the cursor horizontally
        });
      }

      // Fireflies Animation
      function createFireflies(numFireflies) {
        const container = document.getElementById('fireflies-container');
        if (container) {
          for (let i = 0; i < numFireflies; i++) {
            const firefly = document.createElement('div');
            firefly.classList.add('firefly');
            firefly.style.top = `${Math.random() * 100}vh`;
            firefly.style.left = `${Math.random() * 100}vw`;
            container.appendChild(firefly);

            // Set a random timeout for the firefly to disappear
            const disappearTimeout = Math.random() * 5000 + 2000; // between 2 to 7 seconds
            setTimeout(() => {
              container.removeChild(firefly);
            }, disappearTimeout);
          }
        }
      }

      function spawnFireflies(num) {
        // Spawn the first set of fireflies together
        createFireflies(num);

        // Set a random interval for spawning individual fireflies
        const spawnInterval = Math.random() * 1000 + 2000; // between 2 to 7 seconds
        setTimeout(() => {
          createFireflies(1); // Spawn one firefly
          spawnFireflies(30); // Call itself after the interval
        }, spawnInterval);
      }

      // Initial firefly spawning
      spawnFireflies(50);

      // Cards Parallax Movement
      const card = document.querySelector(".card:nth-child(2)");
      const wrapper = document.querySelector(".wrapper");
      if (card && wrapper) {
        function rotateCard(card, x, y) {
          const coords = card.getBoundingClientRect();
          const cardX = coords.left + card.offsetWidth / 2;
          const cardY = coords.top + card.offsetHeight / 2;
          const angleX = (cardY - y) / 20;
          const angleY = (cardX - x) / -20;
          wrapper.style.setProperty("--rotateX", angleX + "deg");
          wrapper.style.setProperty("--rotateY", angleY + "deg");
        }

        wrapper.addEventListener("mousemove", function (e) {
          const rect = wrapper.getBoundingClientRect();
          const top = rect.top, left = rect.left;
          const x = e.x, y = e.y, clientX = e.clientX, clientY = e.clientY;
          const gradientX = clientX - left;
          const gradientY = clientY - top;
          rotateCard(card, x, y);
          wrapper.style.setProperty("--x", gradientX + "px");
          wrapper.style.setProperty("--y", gradientY + "px");
        });

        wrapper.addEventListener("mouseenter", function () {
          wrapper.style.setProperty("--scale", "1");
        });

        wrapper.addEventListener("mouseleave", function () {
          wrapper.style.setProperty("--scale", "0");
        });
      }
    });

    // Load data from external JSON files
    this.loadData();
  },
};
</script>

<style scoped>
/* Add any styles scoped to App.vue here */
</style>

<style>
/* Ensure Sections Fill the Screen */
.content-section {
  min-height: 100vh;
  padding: 20px; /* Adjust padding as needed */
  box-sizing: border-box; /* Ensure padding is included in the height */
}

/* Cursor Styles */
#cursor {
  position: absolute;
  width: 400px;
  height: 400px;
  background: rgba(0, 0, 0, 0.1); /* Change to a darker color */
  border-radius: 50%;
  pointer-events: none;
  transition: transform 0.1s ease-out;
}

/* Fireflies Styles */
#fireflies-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1; /* Ensure it's behind the content */
  pointer-events: none; /* Ensure it doesn't interfere with user interactions */
}

.firefly {
  position: absolute;
  width: 5px;
  height: 5px;
  background: rgba(0, 0, 0, 0.8); /* Change to a darker color */
  border-radius: 50%;
  animation: flicker 1.5s infinite alternate;
}

@keyframes flicker {
  0% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.2;
  }
}

/* Typing Effect Styles */
.typed-text {
  font-size: 2em;
  font-weight: bold;
  color: #000; /* Change to a darker color */
}

/* Active Navigation Link Style */
#navbarSupportedContent ul li a.active {
  color: #5161ce; /* Change to your desired active color */
  background-color: transparent;
  transition: all 0.7s;
}
</style>
