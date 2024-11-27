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
    <section id="social-media" class="content-section">
      <SocialMediaSection :socialMedia="socialMedia" />
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
  data() {
    return {
      projects: [
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
      services: [
        {
          title: "Web Development",
          description: "Building responsive and scalable web applications.",
          icon: "fas fa-code",
        },
        {
          title: "Mobile Development",
          description: "Creating engaging Android applications tailored to your needs.",
          icon: "fas fa-mobile-alt",
        },
        {
          title: "AI Solutions",
          description: "Leveraging AI to build intelligent and automated systems.",
          icon: "fas fa-brain",
        },
        {
          title: "Blockchain Development",
          description: "Designing decentralized applications on blockchain technology.",
          icon: "fas fa-link",
        },
        {
          title: "Cybersecurity",
          description: "Ensuring robust security solutions and vulnerability assessments.",
          icon: "fas fa-shield-alt",
        },
        {
          title: "Technical Mentorship",
          description: "Guiding aspiring developers through personalized mentorship programs.",
          icon: "fas fa-chalkboard-teacher",
        },
      ],
      testimonials: [
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
      blogPosts: [
        {
          title: "Understanding Vue.js Lifecycle Hooks",
          excerpt: "A deep dive into Vue.js lifecycle hooks and how to use them effectively.",
          image: "https://placehold.co/300x200",
          link: "#",
        },
        {
          title: "Building Scalable APIs with Node.js",
          excerpt: "Learn how to create robust and scalable APIs using Node.js.",
          image: "https://placehold.co/300x200",
          link: "#",
        },
        {
          title: "Top 10 Cybersecurity Practices for Developers",
          excerpt: "Ensure your applications are secure by following these top 10 practices.",
          image: "https://placehold.co/300x200",
          link: "#",
        },
      ],
      socialMedia: [
        {
          name: "LinkedIn",
          link: "https://linkedin.com/in/venopyx",
          icon: "fab fa-linkedin",
          class: "linkedin",
        },
        {
          name: "GitHub",
          link: "https://github.com/venopyX",
          icon: "fab fa-github",
          class: "github",
        },
        {
          name: "Telegram",
          link: "https://t.me/CodeTactics",
          icon: "fab fa-telegram",
          class: "telegram",
        },
        {
          name: "Twitter",
          link: "https://twitter.com/venopyX",
          icon: "fab fa-twitter",
          class: "twitter",
        },
      ],
      resumeLink: "#", // Replace with the actual resume link
      highlights: [
        "Experienced in full-stack web development with Vue.js, Python, and Node.js.",
        "Specialist in AI-based projects and machine learning applications.",
        "Proficient in Android development and creating responsive mobile applications.",
        "Blockchain enthusiast with hands-on experience in decentralized applications.",
        "Mentor and educator for aspiring developers, with a focus on scalable solutions.",
      ],
    };
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


      // Intersection Observer for Navigation Highlighting
      const sections = document.querySelectorAll('.content-section');
      const navItems = document.querySelectorAll('#navbarSupportedContent ul li a');

      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
      };

      const observerCallback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const navItem = document.querySelector(`#navbarSupportedContent ul li a[href="#${entry.target.id}"]`);
            if (navItem) {
              navItems.forEach((item) => item.classList.remove('active'));
              navItem.classList.add('active');
            }
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);

      sections.forEach((section) => {
        observer.observe(section);
      });
    });
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
