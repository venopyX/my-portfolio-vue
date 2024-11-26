<template>
  <div>
    <div id="fireflies-container"></div>
    <div id="cursor"></div>
    <NavBar />
    <section id="home" class="content-section">
      <HeroSection />
    </section>
    <section id="about" class="content-section">
      <AboutMe />
    </section>
    <section id="portfolio" class="content-section">
      <PortfolioCards />
    </section>
    <section id="services" class="content-section">
      <ServicesSection />
    </section>
    <section id="testimonials" class="content-section">
      <TestimonialsSection />
    </section>
    <section id="blog" class="content-section">
      <BlogSection />
    </section>
    <section id="social-media" class="content-section">
      <SocialMediaSection />
    </section>
    <section id="resume" class="content-section">
      <ResumeSection />
    </section>
    <section id="contact" class="content-section">
      <ContactForm />
    </section>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import HeroSection from "./components/HeroSection.vue";
import AboutMe from "./components/AboutMe.vue";
import PortfolioCards from "./components/PortfolioCards.vue";
import ServicesSection from "./components/ServicesSection.vue";
import TestimonialsSection from "./components/TestimonialsSection.vue";
import BlogSection from "./components/BlogSection.vue";
import SocialMediaSection from "./components/SocialMediaSection.vue";
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
    SocialMediaSection,
    ResumeSection,
    ContactForm,
  },
  mounted() {
    // Cursor Movement
    document.addEventListener('mousemove', (e) => {
      const cursor = document.getElementById('cursor');
      const cursorSize = 400; // Set the size of the cursor
      cursor.style.top = e.pageY - cursorSize / 2 + 'px'; // Center the cursor vertically
      cursor.style.left = e.pageX - cursorSize / 2 + 'px'; // Center the cursor horizontally
    });

    // Fireflies Animation
    function createFireflies(numFireflies) {
      const container = document.getElementById('fireflies-container');

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
    var card = document.querySelector(".card:nth-child(2)");
    var wrapper = document.querySelector(".wrapper");

    function rotateCard(card, x, y) {
      var coords = card.getBoundingClientRect();

      var cardX = coords.left + card.offsetWidth / 2;
      var cardY = coords.top + card.offsetHeight / 2;

      var angleX = (cardY - y) / 20;
      var angleY = (cardX - x) / -20;

      wrapper.style.setProperty("--rotateX", angleX + "deg");
      wrapper.style.setProperty("--rotateY", angleY + "deg");
    }

    wrapper.addEventListener("mousemove", function (e) {
      var rect = wrapper.getBoundingClientRect();
      var top = rect.top, left = rect.left;
      var x = e.x, y = e.y, clientX = e.clientX, clientY = e.clientY;

      var gradientX = clientX - left;
      var gradientY = clientY - top;

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

    // Typing Effect
    const element = document.querySelector('.typed-text');
    const words = ['Web Designer', 'Web Developer', 'FrontEnd Developer', 'Apps Designer', 'Apps Developer'];
    let i = 0;
    let j = 0;
    let currentWord = '';
    let isDeleting = false;

    function type() {
      if (i < words.length) {
        currentWord = words[i];
        if (!isDeleting && j <= currentWord.length) {
          element.textContent = currentWord.substring(0, j);
          j++;
        } else if (isDeleting && j >= 0) {
          element.textContent = currentWord.substring(0, j);
          j--;
        }

        if (j === currentWord.length + 1) {
          isDeleting = true;
          setTimeout(type, 500); // Delay before deleting
        } else if (isDeleting && j === 0) {
          isDeleting = false;
          i++;
          setTimeout(type, 300); // Delay before typing the next word
        } else {
          setTimeout(type, 100); // Typing speed
        }
      } else {
        // Reset variables to start the loop again
        i = 0;
        j = 0;
        isDeleting = false;
        setTimeout(type, 200); // Delay before starting the loop again
      }
    }

    // Start the typing effect
    type();
  },
};
</script>

<style scoped>
/* Add any styles scoped to App.vue here */
</style>

<style>
.content-section {
  height: 100%;
}
/* Cursor Styles */
#cursor {
  position: absolute;
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.1);
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
  background: rgba(255, 255, 255, 0.8);
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
  color: #fff;
}
</style>
