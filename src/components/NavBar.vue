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
.content-section {
    padding-top: 80px;
}

.navbar-logo {
    padding: 15px;
    color: #fff;
}

.navbar-mainbg {
    background-color: var(--navcolor);
    padding: 0px;
    position: sticky !important;
    top: 0;
    width: 100%;
    z-index: 1000;
}

#navbarSupportedContent {
    overflow: hidden;
    position: relative;
}

#navbarSupportedContent ul {
    padding: 0px;
    margin: 0px;
}

#navbarSupportedContent ul li a i {
    margin-right: 10px;
}

#navbarSupportedContent li {
    list-style-type: none;
    float: left;
}

#navbarSupportedContent ul li a {
    color: rgba(193, 232, 255, 0.788);
    text-decoration: none;
    font-size: 15px;
    display: block;
    padding: 20px 20px;
    transition-duration: 0.6s;
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    position: relative;
}

#navbarSupportedContent>ul>li.active>a {
    color: var(--navcolor);
    background-color: transparent;
    transition: all 0.7s;
}

#navbarSupportedContent a:not(:only-child):after {
    content: "\f105";
    position: absolute;
    right: 20px;
    top: 10px;
    font-size: 14px;
    font-family: var(--font-family);
    display: inline-block;
    padding-right: 3px;
    vertical-align: middle;
    font-weight: 900;
    transition: 0.5s;
}

#navbarSupportedContent .active>a:not(:only-child):after {
    transform: rotate(90deg);
}

.hori-selector {
    display: inline-block;
    position: absolute;
    height: 100%;
    top: 0px;
    left: 0px;
    transition-duration: 0.6s;
    transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    background-color: #fff;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    margin-top: 10px;
}

.hori-selector .right,
.hori-selector .left {
    position: absolute;
    width: 25px;
    height: 25px;
    background-color: #fff;
    bottom: 10px;
}

.hori-selector .right {
    right: -25px;
}

.hori-selector .left {
    left: -25px;
}

.hori-selector .right:before,
.hori-selector .left:before {
    content: '';
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--navcolor);
}

.hori-selector .right:before {
    bottom: 0;
    right: -25px;
}

.hori-selector .left:before {
    bottom: 0;
    left: -25px;
}


@media(min-width: 992px) {
    .navbar-expand-custom {
        -ms-flex-flow: row nowrap;
        flex-flow: row nowrap;
        -ms-flex-pack: start;
        justify-content: flex-start;
    }

    .navbar-expand-custom .navbar-nav {
        -ms-flex-direction: row;
        flex-direction: row;
    }

    .navbar-expand-custom .navbar-toggler {
        display: none;
    }

    .navbar-expand-custom .navbar-collapse {
        display: -ms-flexbox !important;
        display: flex !important;
        -ms-flex-preferred-size: auto;
        flex-basis: auto;
    }

    .navbar-toggler {
        color: white !important;
    }

}

@media (max-width: 991px) {
    #navbarSupportedContent ul li a {
        padding: 12px 30px;
    }

    .hori-selector {
        margin-top: 0px;
        margin-left: 10px;
        border-radius: 0;
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
    }

    .hori-selector .left,
    .hori-selector .right {
        right: 10px;
    }

    .hori-selector .left {
        top: -25px;
        left: auto;
    }

    .hori-selector .right {
        bottom: -25px;
    }

    .hori-selector .left:before {
        left: -25px;
        top: -25px;
    }

    .hori-selector .right:before {
        bottom: -25px;
        left: -25px;
    }

    .navbar-expand-custom .navbar-nav {
        flex-direction: column;
    }

    .navbar-expand-custom .navbar-nav .nav-link {
        display: block;
        width: 100%;
        text-align: left;
    }

    .navbar-expand-custom .navbar-toggler {
        display: block;
    }

    .navbar-expand-custom .navbar-collapse {
        display: none;
    }

    .navbar-expand-custom .navbar-collapse.show {
        display: block;
    }

    .navbar-toggler {
    color: white !important;
}

}
</style>
