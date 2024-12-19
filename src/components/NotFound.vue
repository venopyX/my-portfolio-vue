<template>
  <div class="not-found">
    <div class="content">
      <h1>Oops! 404</h1>
      <p>I can’t seem to find the page you’re looking for.</p>
      <p>Let’s get you back on track:</p>
      <router-link to="/" class="home-link">Go Back Home</router-link>
    </div>
    <div class="animation">
      <img src="@/assets/notfound-404.png" alt="Lost Illustration" />
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #130042b0 0%, #06081fe0 100%);
  font-family: 'Arial', sans-serif;
  color: #333;
}

.content {
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  color: #ff6f61;
}

p {
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

.home-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background: #ff6f61;
  border-radius: 25px;
  text-decoration: none;
  transition: background 0.3s ease;
}

.home-link:hover {
  background: #e65b50;
}

.animation {
  margin-top: 20px;
}

.animation img {
  width: 80%;
  max-width: 100%;
  opacity: 0.9;
}
</style>
