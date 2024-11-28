<template>
  <nav class="navbar navbar-expand-custom navbar-mainbg">
    <a class="navbar-brand navbar-logo" href="#home">Gemechis</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-bars text-white"></i>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <div class="hori-selector"><div class="left"></div><div class="right"></div></div>
        <li
          class="nav-item"
          v-for="(item, index) in menuItems"
          :key="index"
          :class="{ active: isActive(item.href) }"
        >
          <a class="nav-link" :href="`#${item.href}`" @click="handleNavClick(item.href)">
            <i :class="item.icon"></i>{{ item.name }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import $ from "jquery";

export default {
  name: "NavBar",
  data() {
    return {
      menuItems: [
        { name: "Home", href: "home", icon: "fas fa-home" },
        { name: "About", href: "about", icon: "fas fa-user" },
        { name: "Portfolio", href: "portfolio", icon: "fas fa-briefcase" },
        { name: "Services", href: "services", icon: "fas fa-cogs" },
        { name: "Testimonials", href: "testimonials", icon: "fas fa-comments" },
        { name: "Blog", href: "blog", icon: "fas fa-blog" },
        { name: "Resume", href: "resume", icon: "fas fa-file" },
        { name: "Contact", href: "contact", icon: "fas fa-envelope" },
      ],
      activeSection: null,
    };
  },
  mounted() {
    this.setupNavbar();
    this.setupIntersectionObserver();
  },
  methods: {
    setupNavbar() {
      const updateSelector = () => {
        const tabsNewAnim = $("#navbarSupportedContent");
        const activeItemNewAnim = tabsNewAnim.find(".active");

        if (activeItemNewAnim.length) {
          const activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
          const activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
          const itemPosNewAnimTop = activeItemNewAnim.position();
          const itemPosNewAnimLeft = activeItemNewAnim.position();

          $(".hori-selector").css({
            top: `${itemPosNewAnimTop.top}px`,
            left: `${itemPosNewAnimLeft.left}px`,
            height: `${activeWidthNewAnimHeight}px`,
            width: `${activeWidthNewAnimWidth}px`,
          });
        }
      };

      $(document).ready(() => {
        setTimeout(updateSelector);
      });

      $(window).on("resize", () => {
        setTimeout(updateSelector, 500);
      });

      $(".navbar-toggler").click(() => {
        $(".navbar-collapse").slideToggle(300);
        setTimeout(updateSelector);
      });
    },
    isActive(href) {
      return this.activeSection === href;
    },
    handleNavClick(href) {
      this.activeSection = href;
      this.updateSelector();
    },
    setupIntersectionObserver() {
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
              this.activeSection = entry.target.id;
              navItems.forEach((item) => item.classList.remove('active'));
              navItem.classList.add('active');
              this.updateSelector();
            }
          }
        });
      };

      const observer = new IntersectionObserver(observerCallback, observerOptions);

      sections.forEach((section) => {
        observer.observe(section);
      });
    },
    updateSelector() {
      const tabsNewAnim = $("#navbarSupportedContent");
      const activeItemNewAnim = tabsNewAnim.find(".active");

      if (activeItemNewAnim.length) {
        const activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
        const activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
        const itemPosNewAnimTop = activeItemNewAnim.position();
        const itemPosNewAnimLeft = activeItemNewAnim.position();

        $(".hori-selector").css({
          top: `${itemPosNewAnimTop.top}px`,
          left: `${itemPosNewAnimLeft.left}px`,
          height: `${activeWidthNewAnimHeight}px`,
          width: `${activeWidthNewAnimWidth}px`,
        });
      }
    },
  },
};
</script>

<style scoped>
.navbar-logo {
    padding: 15px;
    color: #fff;
}
</style>
