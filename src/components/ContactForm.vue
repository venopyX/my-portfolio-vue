<template>
  <section class="contact-section">
    <div class="container">
      <h2 class="section-title">Contact Me</h2>
      <form @submit.prevent="handleSubmit" class="contact-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            class="form-control"
            placeholder="Enter your name"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            class="form-control"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea
            id="message"
            v-model="formData.message"
            class="form-control"
            rows="5"
            placeholder="Your message"
            required
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Send Message</button>
      </form>
    </div>
  </section>
</template>

<script>
import emailjs from 'emailjs-com';

export default {
  name: "ContactForm",
  data() {
    return {
      formData: {
        name: "",
        email: "",
        message: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      if (this.validateForm()) {
        const templateParams = {
          from_name: this.formData.name,
          email: this.formData.email,
          message: this.formData.message,
          date: new Date().toLocaleString()
        };

        emailjs.send('service_8pwhtg8', 'template_8xqxhek', templateParams, 'rbVHw88fdxyR_mx4D')
          // eslint-disable-next-line
          .then((response) => {
            alert(`Thank you, ${this.formData.name}. Your message has been sent!`);
            this.resetForm();
          // eslint-disable-next-line
          }, (error) => {
            alert('Failed to send the message. Please try again.');
          });
      }
    },
    validateForm() {
      const { name, email, message } = this.formData;
      if (!name || !email || !message) {
        alert("Please fill in all the fields.");
        return false;
      }
      return true;
    },
    resetForm() {
      this.formData = {
        name: "",
        email: "",
        message: "",
      };
    },
  },
};
</script>

<style scoped lang="scss">
label {
  color: #fff;
}
.contact-section {
  padding: 60px 0;
  background-color: #130042b0;

  .section-title {
    text-align: center;
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 40px;
    color: aqua;
  }

  .contact-form {
    max-width: 600px;
    margin: 0 auto;

    .form-group {
      margin-bottom: 20px;

      label {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 5px;
        display: block;
      }

      .form-control {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;

        &:focus {
          border-color: #5161ce;
          outline: none;
        }
      }
    }

    .btn {
      display: block;
      width: 100%;
      padding: 10px;
      background-color: #5161ce;
      color: #fff;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      text-align: center;

      &:hover {
        background-color: #3949ab;
      }
    }
  }
}
</style>
