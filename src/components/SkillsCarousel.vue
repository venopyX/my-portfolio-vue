<template>
  <div class="carousel-container">
    <div class="carousel">
      <div v-for="(skill, index) in skills" :key="index" class="carousel-item">
        <component :is="skill.icon" class="carousel-icon" />
        <p v-if="showLabels" class="carousel-label">{{ skill.name }}</p>
      </div>
      <!-- Duplicate the items -->
      <div v-for="(skill, index) in skills" :key="`${index}-duplicate`" class="carousel-item">
        <component :is="skill.icon" class="carousel-icon" />
        <p v-if="showLabels" class="carousel-label">{{ skill.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  FaNodeJs,
  FaPython,
  FaVuejs,
  FaReact,
  FaDocker,
  FaGitAlt,
  FaJs,
  FaJava,
  FaPhp,
  FaHtml5,
  FaCss3Alt,
  FaAws,
} from "vue3-icons/fa";

export default {
  name: "SkillsCarousel",
  data() {
    return {
      skills: [
        { name: "Node.js", icon: FaNodeJs },
        { name: "Python", icon: FaPython },
        { name: "Vue.js", icon: FaVuejs },
        { name: "React", icon: FaReact },
        { name: "Docker", icon: FaDocker },
        { name: "Git", icon: FaGitAlt },
        { name: "JavaScript", icon: FaJs },
        { name: "Java", icon: FaJava },
        { name: "PHP", icon: FaPhp },
        { name: "HTML5", icon: FaHtml5 },
        { name: "CSS3", icon: FaCss3Alt },
        { name: "AWS", icon: FaAws },
      ],
      showLabels: true,
    };
  },
};
</script>

<style scoped>
.carousel-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  background: linear-gradient(45deg, #2a2a7255, #009ffd55);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.carousel {
  display: flex;
  white-space: nowrap;
  will-change: transform;
  animation: scrolling 30s linear infinite;
}

.carousel-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
  flex-shrink: 0;
  width: 100px;
}

.carousel-icon {
  display: inline-block;
  font-size: 40px;
  color: #ffdd57;
  transition: transform 0.3s ease;
}

.carousel-icon:hover {
  transform: scale(1.2);
}

.carousel-label {
  font-size: 14px;
  margin-top: 5px;
  text-align: center;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

@keyframes scrolling {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.carousel-container:hover .carousel {
  animation-play-state: paused;
}
</style>
