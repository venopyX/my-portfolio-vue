<template>
  <nav class="navbar navbar-expand-custom navbar-mainbg">
    <a class="navbar-brand navbar-logo" href="#">Gemechis</a>
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
          <a class="nav-link" :href="`#${item.href}`">
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
        { name: "Social Media", href: "social-media", icon: "fas fa-share-alt" },
        { name: "Resume", href: "resume", icon: "fas fa-file" },
        { name: "Contact", href: "contact", icon: "fas fa-envelope" },
      ],
    };
  },
  mounted() {
    this.setupNavbar();
  },
  methods: {
    setupNavbar() {
      const updateSelector = () => {
        const tabsNewAnim = $("#navbarSupportedContent");
        const activeItemNewAnim = tabsNewAnim.find(".active");
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
      return window.location.hash === `#${href}`;
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
