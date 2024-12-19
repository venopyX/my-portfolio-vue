<template>
  <div>
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
  <SpeedInsights />
</template>

<script>
/* eslint-disable */
import { nextTick } from 'vue';
import NavBar from "@/components/NavBar.vue";
import HeroSection from "@/components/HeroSection.vue";
import AboutMe from "@/components/AboutMe.vue";
import PortfolioCards from "@/components/PortfolioCards.vue";
import ServicesSection from "@/components/ServicesSection.vue";
import TestimonialsSection from "@/components/TestimonialsSection.vue";
import BlogSection from "@/components/BlogSection.vue";
import ResumeSection from "@/components/ResumeSection.vue";
import ContactForm from "@/components/ContactForm.vue";

import { SpeedInsights } from "@vercel/speed-insights/vue"

export default {
  name: "HomePage",
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
  mounted() {
    nextTick(() => {
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
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.projects = to.meta.data.projects;
      vm.services = to.meta.data.services;
      vm.testimonials = to.meta.data.testimonials;
      vm.blogPosts = to.meta.data.blogPosts;
      vm.socialMedia = to.meta.data.socialMedia;
      vm.highlights = to.meta.data.highlights;
    });
  },
};
</script>

<style scoped>
/* Add any styles scoped to HomePage.vue here */
</style>

<style>
/* Typing Effect Styles */
.typed-text {
  font-size: 2em;
  font-weight: bold;
  color: #000;
}

/* Active Navigation Link Style */
#navbarSupportedContent ul li a.active {
  color: #5161ce;
  background-color: transparent;
  transition: all 0.7s;
}
</style>
