<template>
  <nav 
    class="navbar navbar-expand-custom navbar-mainbg" 
    :class="{ 'scrolled': isScrolled, 'menu-open': isMenuOpen }"
    ref="navbar"
  >
    <div class="container-fluid nav-container">
      <a class="navbar-brand navbar-logo" href="#home" :class="{ 'logo-dark': isScrolled }">
        <span class="logo-text">Gemechis Chala</span>
        <span class="logo-dot">.</span>
      </a>
      
      <button
        class="navbar-toggler"
        type="button"
        :aria-label="isMenuOpen ? 'Close navigation' : 'Open navigation'"
        :class="{ 'active': isMenuOpen }"
        @click="toggleMenu"
      >
        <span class="hamburger-icon">
          <span :class="{ 'rotate-45': isMenuOpen }"></span>
          <span :class="{ 'opacity-0': isMenuOpen }"></span>
          <span :class="{ '-rotate-45': isMenuOpen }"></span>
        </span>
      </button>
      
      <div class="collapse navbar-collapse" :class="{ 'show': isMenuOpen }" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <div class="hori-selector" :class="{ 'mobile': isMobile }">
            <div class="left"></div>
            <div class="right"></div>
          </div>
          <li 
            v-for="(item, index) in menuItems" 
            :key="index"
            class="nav-item"
            :class="{ 
              'active': isActive(item.href),
              'fade-in-item': isMenuOpen && index < 3 
            }"
          >
            <a 
              class="nav-link" 
              :href="`#${item.href}`" 
              @click="handleNavClick(item.href, $event)"
            >
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
              <span class="nav-link-glow"></span>
            </a>
          </li>
        </ul>
      </div>
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
      isScrolled: false,
      isMenuOpen: false,
      isMobile: false,
    };
  },
  mounted() {
    this.setupNavbar();
    this.setupIntersectionObserver();
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    setupNavbar() {
      const updateSelector = () => {
        const tabsNewAnim = $("#navbarSupportedContent");
        const activeItemNewAnim = tabsNewAnim.find(".active");

        if (activeItemNewAnim.length) {
          const activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
          const activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
          const itemPosNewAnimTop = activeItemNewAnim.position().top;
          const itemPosNewAnimLeft = activeItemNewAnim.position().left;

          $(".hori-selector").css({
            top: `${itemPosNewAnimTop}px`,
            left: `${itemPosNewAnimLeft}px`,
            height: `${activeWidthNewAnimHeight}px`,
            width: `${activeWidthNewAnimWidth}px`,
          });
        }
      };

      $(document).ready(() => {
        setTimeout(updateSelector, 100);
      });

      $(window).on("resize", () => {
        setTimeout(updateSelector, 300);
      });

      $(window).on("scroll", () => {
        this.updateScrolledState();
        setTimeout(updateSelector, 50);
      });

      $(document).on("click", (e) => {
        if (
          !this.$refs.navbar?.contains(e.target) &&
          !document.getElementById("navbarSupportedContent")?.contains(e.target) &&
          this.isMenuOpen
        ) {
          this.toggleMenu();
        }
      });
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      const collapse = document.getElementById("navbarSupportedContent");
      if (collapse) {
        collapse.classList.toggle("show", this.isMenuOpen);
      }
      if (this.isMenuOpen) {
        this.$nextTick(() => this.updateSelector());
      }
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 991;
      if (!this.isMobile) {
        this.isMenuOpen = false;
        const collapse = document.getElementById("navbarSupportedContent");
        if (collapse) collapse.classList.remove("show");
      }
    },
    updateScrolledState() {
      const navbar = this.$refs.navbar;
      if (navbar) {
        this.isScrolled = window.scrollY > 50;
      }
    },
    isActive(href) {
      return this.activeSection === href || (typeof window !== 'undefined' && window.location.hash === `#${href}`);
    },
    handleNavClick(href, event) {
      this.activeSection = href;
      if (this.isMobile) {
        this.toggleMenu();
      }
      
      const element = document.querySelector(href);
      if (element) {
        const offset = 70;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
      
      if (!this.isMobile) {
        event.preventDefault();
        history.pushState(null, null, `#${href}`);
      }
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
              navItems.forEach((item) => item.classList.remove('active', 'visible'));
              navItem.classList.add('active');
              setTimeout(() => navItem.classList.add('visible'), 150);
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
        const itemPosNewAnimTop = activeItemNewAnim.position().top;
        const itemPosNewAnimLeft = activeItemNewAnim.position().left;

        $(".hori-selector").css({
          top: `${itemPosNewAnimTop}px`,
          left: `${itemPosNewAnimLeft}px`,
          height: `${activeWidthNewAnimHeight}px`,
          width: `${activeWidthNewAnimWidth}px`,
        });
      }
    },
    debounce(func, wait) {
      let timeout;
      return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
      };
    },
  },
};
</script>

<style scoped lang="scss">
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  padding: 15px 0;
  box-shadow: none;

  &.navbar-mainbg {
    background-color: transparent;
    
    &.scrolled {
      background: rgba(15, 15, 26, 0.9);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      padding: 10px 0;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }
    
    &.menu-open {
      background: rgba(15, 15, 26, 0.98);
    }
  }
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: var(--transition-base);

  .logo-dot {
    font-size: 2.5rem;
    line-height: 0;
    color: var(--primary-color);
  }
  
  &.logo-dark {
    color: var(--primary-color);
  }
}

/* Navigation Items */
#navbarSupportedContent {
  overflow: hidden;
  position: relative;
  
  @media(min-width: 992px) {
    width: auto;
    flex: 1;
    justify-content: flex-end;
  }
}

.navbar-nav {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
}

.nav-item {
  position: relative;
  margin: 0;
  padding: 0 20px;
  
  @media(max-width: 991px) {
    opacity: 0;
    transform: translateX(20px);
    animation: slideInMobile 0.3s ease forwards;
  }
  
  &.active {
    opacity: 1;
    
    @media(max-width: 991px) {
      animation: slideInMobile 0.3s ease forwards;
    }
  }
  
  .nav-link {
    position: relative;
    color: white;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    display: block;
    padding: 25px 0;
    transition: var(--transition-base);
    letter-spacing: 0.5px;
    overflow: visible;
    
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 3px;
      background: var(--primary-color);
      transition: var(--transition-base);
      border-radius: 2px 2px 0 0;
      box-shadow: 0 0 10px var(--primary-color);
    }
    
    i {
      margin-right: 8px;
      transition: var(--transition-base);
    }
    
    &:hover {
      color: var(--primary-color);
      transform: translateY(-2px);
    }
    
    &.active {
      color: var(--primary-color);
      
      &::after {
        width: 100%;
      }
      
      i {
        animation: pulse 1.5s infinite;
      }
    }
  }
  
  .nav-link-glow {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 10px;
    height: 10px;
    background: var(--primary-color);
    border-radius: 50%;
    opacity: 0;
    transition: var(--transition-base);
    box-shadow: 0 0 10px var(--primary-color), 0 0 20px var(--primary-color);
  }
  
  &.active .nav-link-glow {
    opacity: 1;
    animation: ripple 1.5s ease-out infinite;
  }
  
  &.fade-in-item {
    animation: fadeInUp 0.5s ease forwards;
  }
}

/* Hamburger Menu */
.navbar-toggler {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1001;
  
  @media(max-width: 991px) {
    display: flex;
  }
  
  &:focus {
    outline: none;
  }
  
  .hamburger-icon {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
  }
  
  span {
    display: block;
    width: 24px;
    height: 3px;
    background: white;
    border-radius: 2px;
    transition: var(--transition-fast);
    position: relative;
  }
  
  &.active span:first-child {
    transform: translateY(10.5px) rotate(45deg);
    background: var(--primary-color);
  }
  
  &.active span:last-child {
    transform: translateY(-10.5px) rotate(-45deg);
    background: var(--primary-color);
  }
  
  &.active span:nth-child(2) {
    opacity: 0;
  }
}

/* Mobile Menu Animation */
.collapse {
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 15, 26, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 40px 20px;
  
  @media(min-width: 992px) {
    display: none !important;
  }
  
  &.show {
    display: block !important;
    animation: fadeIn 0.3s ease;
  }
  
  ul {
    flex-direction: column;
    gap: 10px;
  }
}

.hori-selector {
  position: absolute;
  display: none;
  
  @media(min-width: 992px) {
    display: inline-block;
  }
  
  div {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
    opacity: 0;
    
    &.left {
      left: -15px;
      top: -10px;
      background: white;
      
      &::before {
        content: "";
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: var(--primary-color);
        opacity: 1;
      }
    }
    
    &.right {
      right: -15px;
      bottom: -10px;
      background: white;
      
      &::before {
        content: "";
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: var(--primary-color);
        opacity: 1;
      }
    }
  }
  
  &.mobile {
    margin: 15px 0;
    
    div {
      display: none !important;
    }
  }
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInMobile {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes ripple {
  0% {
    transform: translateX(-50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateX(-50%) scale(4);
    opacity: 0;
  }
}

@keyframes rotate-45 {
  to { transform: rotate(45deg); }
}

@keyframes -rotate-45 {
  to { transform: rotate(-45deg); }
}

/* Hover Effects */
.nav-link:hover:not(.active)::after {
  width: 80%;
}

/* Responsive */
@media (max-width: 991px) {
  collapse {
    position: fixed;
    top: 60px;
  }
}

@media (max-width: 576px) {
  .nav-brand {
    font-size: 1.2rem;
  }
  
  .nav-item {
    width: 100%;
    padding: 15px;
  }
  
  .nav-link {
    font-size: 1.1rem;
  }
  
  .hori-selector {
    display: none;
  }
}
</style>
