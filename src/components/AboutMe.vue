<template>
  <section class="about-section">
    <div class="container">
      <h2 class="section-title">About Me</h2>
      <div class="about-content">
        <div class="profile-picture-wrapper">
          <img :src="require('@/assets/me-transparent.png')" alt="Profile Picture" class="profile-picture" />
        </div>
        <div class="about-text">
          <p>
            Hello! I'm <strong>Gemechis Chala</strong>, a passionate software developer with expertise in Python, Android development, Telegram bots, AI-based projects, and blockchain technologies. I aim to empower the next generation of developers in Ethiopia, Africa, and beyond.
          </p>
          <p>
            With a focus on building impactful solutions, I bring creativity and technical skills to solve real-world problems. My dedication to learning and teaching is reflected in my Telegram channel,
            <a href="https://t.me/CodeTactics" target="_blank">@CodeTactics</a>, where I share insights and resources for budding developers.
          </p>
          <p>
            Let's collaborate and create something remarkable together!
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AboutMe",
};
</script>

<style scoped>
/* Overall Section Styling */
.about-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #0f1a5faa, #232e75aa);
  color: #fff;
  font-family: 'Arial', sans-serif;
}

  .section-title {
    text-align: center;
    font-size: 38px;
    font-weight: 800;
    margin-bottom: 50px;
    color: #00eaff;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: #00eaff;
      border-radius: 2px;
    }
  }


/* Content Layout */
.about-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 30px;
  animation: fade-in 1s ease-in-out;
}

/* Profile Picture */
.profile-picture-wrapper {
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #00fff6, #0f1a5f);
  border-radius: 50%;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
}
.profile-picture {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

/* About Text */
.about-text {
  max-width: 600px;
  text-align: left;
  font-size: 18px;
  line-height: 1.8;
  color: #e0e0e0;
  animation: slide-in 1s ease-in-out;
}
.about-text a {
  color: #00fff6;
  text-decoration: none;
  font-weight: bold;
}
.about-text a:hover {
  text-decoration: underline;
  color: #f9f9f9;
}
.about-text strong {
  font-weight: bold;
  color: #00fff6;
}

/* Animations */
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
