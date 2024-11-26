<template>
  <section class="about-section">
    <div class="container">
      <h2 class="section-title">About Me</h2>
      <div class="about-content">
        <img src="https://placehold.co/400x400" alt="Profile Picture" class="profile-picture" />
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

<style scoped lang="scss">
.about-section {
  padding: 60px 0;
  background-color: #0f1a5fb2;

  .section-title {
    text-align: center;
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 40px;
    color: aqua;
  }

  .about-content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .profile-picture {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 20px;
      object-fit: cover;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .about-text {
      flex: 1;
      font-size: 16px;
      line-height: 1.8;
      color: #555;

      a {
        color: white-blue;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }

      strong {
        font-weight: 700;
        color: aqua;
      }
    }
  }
}
</style>
